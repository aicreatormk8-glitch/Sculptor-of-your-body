import { NextRequest, NextResponse } from 'next/server';

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const OWNER_TELEGRAM = '@MK_sculptor1';
const OWNER_ID = 6823641436;
const CARD_NUMBER = 'XXXXX'; // Будет заменено на реальный номер карты
const PAYPAL_EMAIL = 'aicreatormk8@gmail.com';

const PRODUCTS = {
  program: {
    name: '🎯 Программа "Твоя лучшая версия"',
    description: '8-недельная программа трансформации',
    priceUSD: 17,
  },
  nutrition: {
    name: '🥗 План питания',
    description: 'Персональный план питания на месяц',
    priceUSD: 50,
  },
  coaching: {
    name: '👨‍🏫 Онлайн-ведение',
    description: 'Полное сопровождение на месяц',
    priceUSD: 120,
  },
};

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

interface InlineButton {
  text: string;
  callback_data?: string;
  url?: string;
}

interface TelegramReplyMarkup {
  inline_keyboard?: Array<Array<InlineButton>>;
  remove_keyboard?: boolean;
}

async function getExchangeRate(): Promise<number> {
  try {
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
    const data = await response.json();
    return Math.round(data.rates?.UAH || 40);
  } catch {
    return 40; // Default fallback
  }
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
      disable_web_page_preview: true,
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

    // Handle /start command with product parameter
    if (body.message?.text?.startsWith('/start')) {
      const chatId = body.message.chat.id;
      const firstName = body.message.from.first_name;

      const params = new URLSearchParams(body.message.text.replace('/start ', ''));
      const product = params.get('product') as keyof typeof PRODUCTS | null;

      if (!product || !PRODUCTS[product]) {
        await sendTelegramMessage(
          chatId,
          '❌ Неизвестный товар. Пожалуйста, выберите товар на сайте.'
        );
        return NextResponse.json({ ok: true });
      }

      const productInfo = PRODUCTS[product];
      const exchangeRate = await getExchangeRate();
      const priceUAH = productInfo.priceUSD * exchangeRate;

      const paymentMessage = `<b>${productInfo.name}</b>\n\n${productInfo.description}\n\n━━━━━━━━━━━━━━━━━━━━\n\n<b>💰 СТОИМОСТЬ:</b>\n\n🇺🇸 <b>${productInfo.priceUSD}$ USD</b>\n🇺🇦 <b>≈ ${Math.round(priceUAH)} ₴ UAH</b>\n\n━━━━━━━━━━━━━━━━━━━━\n\n<b>💳 СПОСОБЫ ОПЛАТЫ:</b>\n\n<b>🇺🇦 Украинская карта</b>\n${CARD_NUMBER}\n\n<b>🌍 PayPal</b>\n${PAYPAL_EMAIL}\n\n━━━━━━━━━━━━━━━━━━━━\n\n<b>✅ ПОСЛЕ ОПЛАТЫ:</b>\n\n1️⃣ Сделайте скриншот квитанции об оплате\n2️⃣ Отправьте скриншот мне в личные сообщения\n3️⃣ Я проверю платеж и выдам доступ\n\n👉 <a href="https://t.me/${OWNER_TELEGRAM.replace('@', '')}">Написать мне в Telegram</a>\n\n━━━━━━━━━━━━━━━━━━━━`;

      await sendTelegramMessage(chatId, paymentMessage, {
        inline_keyboard: [
          [
            {
              text: '💬 Написать с квитанцией',
              url: `https://t.me/${OWNER_TELEGRAM.replace('@', '')}`,
            },
          ],
          [
            {
              text: '❓ Помощь',
              callback_data: 'help',
            },
          ],
        ],
      });

      return NextResponse.json({ ok: true });
    }

    // Handle callback queries
    if (body.callback_query) {
      const { id, data } = body.callback_query;

      if (data === 'help') {
        await answerCallbackQuery(id, 'Если у вас есть вопросы, напишите владельцу');
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
