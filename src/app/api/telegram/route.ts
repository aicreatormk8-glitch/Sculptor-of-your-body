import { NextRequest, NextResponse } from 'next/server';

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const OWNER_ID = 6823641436;

const PRODUCTS = {
  program: {
    name: '🎯 Программа "Твоя лучшая версия"',
    price: 17,
    description: '8-недельная программа трансформации',
  },
  nutrition: {
    name: '🥗 План питания',
    price: 50,
    description: 'Персональный план питания на месяц',
  },
  coaching: {
    name: '👨‍🏫 Онлайн-ведение',
    price: 120,
    description: 'Полное сопровождение на месяц',
  },
};

const PAYMENTS: Record<
  number,
  { product: string; status: 'awaiting_payment' | 'payment_received' | 'confirmed' }
> = {};

interface TelegramUser {
  id: number;
  first_name: string;
  username?: string;
}

interface TelegramMessage {
  update_id: number;
  message?: {
    message_id: number;
    from: TelegramUser;
    chat: { id: number };
    text: string;
  };
  callback_query?: {
    id: string;
    from: TelegramUser;
    data: string;
  };
}

interface TelegramReplyMarkup {
  inline_keyboard?: Array<Array<{ text: string; callback_data: string }>>;
  remove_keyboard?: boolean;
}

async function sendTelegramMessage(
  chatId: number,
  text: string,
  markup?: TelegramReplyMarkup
): Promise<void> {
  if (!BOT_TOKEN) return;

  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'HTML',
      reply_markup: markup,
    }),
  });
}

async function answerCallbackQuery(queryId: string, text: string): Promise<void> {
  if (!BOT_TOKEN) return;

  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/answerCallbackQuery`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      callback_query_id: queryId,
      text,
      show_alert: false,
    }),
  });
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  if (!BOT_TOKEN) {
    return NextResponse.json({ error: 'Bot token not configured' }, { status: 500 });
  }

  try {
    const body: TelegramMessage = await request.json();

    // Handle /start command
    if (body.message?.text?.startsWith('/start')) {
      const chatId = body.message.chat.id;
      const userId = body.message.from.id;
      const firstName = body.message.from.first_name;
      const username = body.message.from.username;

      const params = new URLSearchParams(body.message.text.replace('/start ', ''));
      const product = params.get('product') as keyof typeof PRODUCTS | null;

      if (!product || !PRODUCTS[product]) {
        await sendTelegramMessage(chatId, '❌ Неизвестный товар');
        return NextResponse.json({ ok: true });
      }

      const productInfo = PRODUCTS[product];
      PAYMENTS[userId] = { product, status: 'awaiting_payment' };

      const paymentMessage = `<b>${productInfo.name}</b>\n\n${productInfo.description}\n\n<b>Цена: $${productInfo.price} USD</b>\n\n━━━━━━━━━━━━━━━\n\n<b>Способы оплаты:</b>\n\n💳 <b>Карта</b>\n5375 41** **** 5995\n\n💳 <b>PayPal</b>\naicreatormk8@gmail.com\n\n━━━━━━━━━━━━━━━\n\n✅ После оплаты отправьте квитанцию:\n\n👉 <a href="https://t.me/MK_sculptor1">Написать владельцу</a>\n\nВладелец проверит платеж и выдаст доступ.`;

      await sendTelegramMessage(chatId, paymentMessage, {
        inline_keyboard: [
          [
            {
              text: '✅ Оплатил, отправляю квитанцию',
              callback_data: `payment_sent:${product}`,
            },
          ],
        ],
      });

      return NextResponse.json({ ok: true });
    }

    // Handle callback queries
    if (body.callback_query) {
      const { id, from, data } = body.callback_query;
      const chatId = from.id;
      const userId = from.id;
      const firstName = from.first_name;
      const username = from.username;

      if (data.startsWith('payment_sent:')) {
        const product = data.replace('payment_sent:', '');

        PAYMENTS[userId] = { product, status: 'payment_received' };

        await answerCallbackQuery(id, '✅ Спасибо! Отправляем квитанцию владельцу...');

        // Notify owner
        const userLink = username ? `@${username}` : `ID: ${userId}`;
        const ownerMessage = `<b>💰 Новый платеж</b>\n\n👤 Клиент: ${firstName} (${userLink})\n📦 Товар: ${PRODUCTS[product as keyof typeof PRODUCTS]?.name || product}\n💵 Сумма: $${PRODUCTS[product as keyof typeof PRODUCTS]?.price || '?'}\n\n⏳ Статус: Ожидает подтверждения\n\nКогда клиент отправит квитанцию - подтвердите платеж.`;

        await sendTelegramMessage(OWNER_ID, ownerMessage, {
          inline_keyboard: [
            [
              {
                text: '✅ Подтвердить платеж',
                callback_data: `confirm_payment:${userId}:${product}`,
              },
            ],
          ],
        });

        await sendTelegramMessage(
          chatId,
          '✅ <b>Спасибо!</b>\n\nВы нажали "Оплатил". Теперь:\n\n1️⃣ Перейдите в личный чат владельца\n2️⃣ Отправьте скриншот платежа\n3️⃣ Дождитесь подтверждения\n\n👉 <a href="https://t.me/MK_sculptor1">Написать владельцу</a>'
        );

        return NextResponse.json({ ok: true });
      }

      if (data.startsWith('confirm_payment:')) {
        const [, userIdStr, product] = data.split(':');
        const confirmUserId = parseInt(userIdStr);

        if (userId !== OWNER_ID) {
          await answerCallbackQuery(id, '❌ Только владелец может подтверждать платежи');
          return NextResponse.json({ ok: true });
        }

        PAYMENTS[confirmUserId] = { product, status: 'confirmed' };

        await answerCallbackQuery(id, '✅ Платеж подтвержден!');

        if (product === 'program') {
          // Send channel link
          await sendTelegramMessage(
            confirmUserId,
            `✅ <b>Платеж подтвержден!</b>\n\n📚 Вот ваша программа:\n\n👉 <a href="https://t.me/+KhFZoWiTgjphYmQy">Присоединиться к каналу</a>\n\nУдачи в трансформации! 💪`
          );
        } else {
          // Start consultation
          await sendTelegramMessage(
            confirmUserId,
            `✅ <b>Платеж подтвержден!</b>\n\n👨‍🏫 Владелец начнет с вами консультацию.\n\n<a href="https://t.me/MK_sculptor1">Открыть чат</a>`
          );
        }

        return NextResponse.json({ ok: true });
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(): Promise<NextResponse> {
  return NextResponse.json({ status: 'Telegram bot is running' });
}
