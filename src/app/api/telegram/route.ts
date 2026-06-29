import { NextRequest, NextResponse } from 'next/server';

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHANNEL_ID = process.env.TELEGRAM_CHANNEL_ID || '-1002445879098';

interface TelegramMessage {
  update_id: number;
  message?: {
    message_id: number;
    from: { id: number; first_name: string };
    chat: { id: number };
    text: string;
  };
  callback_query?: {
    id: string;
    from: { id: number; first_name: string };
    data: string;
  };
}

async function getExchangeRate(): Promise<number> {
  try {
    const response = await fetch(
      'https://api.open-meteo.com/v1/currency?currencies=UAH&base_currency=USD'
    );
    const data = await response.json();
    return data.rates?.UAH || 40;
  } catch {
    return 40;
  }
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

  const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'HTML',
      reply_markup: markup,
    }),
  });

  if (!response.ok) {
    console.error('Failed to send message:', await response.text());
  }
}

async function addUserToChannel(userId: number, firstName: string): Promise<void> {
  if (!BOT_TOKEN) return;

  try {
    // Notify channel that user joined
    await sendTelegramMessage(
      parseInt(CHANNEL_ID),
      `✅ Новый клиент: ${firstName}\nID: ${userId}`
    );
  } catch (error) {
    console.error('Error adding user to channel:', error);
  }
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

      const params = new URLSearchParams(body.message.text.replace('/start ', ''));
      const product = params.get('product');

      const exchangeRate = await getExchangeRate();

      if (product === 'program') {
        const priceUSD = 17;
        const priceUAH = Math.round(priceUSD * exchangeRate);

        await sendTelegramMessage(
          chatId,
          `🎯 Программа трансформации\n\n💰 Цена: $${priceUSD} USD / ₴${priceUAH}\n\nПотверждаете покупку?`,
          {
            inline_keyboard: [
              [
                {
                  text: '✅ Подтвердить платеж',
                  callback_data: 'confirm_program',
                },
              ],
            ],
          }
        );
      } else if (product === 'nutrition') {
        const priceUSD = 50;
        const priceUAH = Math.round(priceUSD * exchangeRate);

        await sendTelegramMessage(
          chatId,
          `🥗 Персональный план питания\n\n💰 Цена: $${priceUSD} USD / ₴${priceUAH}\n\nПотверждаете покупку?`,
          {
            inline_keyboard: [
              [
                {
                  text: '✅ Подтвердить платеж',
                  callback_data: 'confirm_nutrition',
                },
              ],
            ],
          }
        );
      } else if (product === 'coaching') {
        const priceUSD = 120;
        const priceUAH = Math.round(priceUSD * exchangeRate);

        await sendTelegramMessage(
          chatId,
          `👨‍🏫 Персональный коучинг\n\n💰 Цена: $${priceUSD} USD / ₴${priceUAH}\n\nПотверждаете покупку?`,
          {
            inline_keyboard: [
              [
                {
                  text: '✅ Подтвердить платеж',
                  callback_data: 'confirm_coaching',
                },
              ],
            ],
          }
        );
      }

      return NextResponse.json({ ok: true });
    }

    // Handle callback queries (button clicks)
    if (body.callback_query) {
      const { id, from, data } = body.callback_query;
      const chatId = from.id;

      if (data.startsWith('confirm_')) {
        const product = data.replace('confirm_', '');

        if (product === 'program') {
          await addUserToChannel(chatId, from.first_name);
          await sendTelegramMessage(
            chatId,
            `✅ Спасибо за покупку!\n\nДобавляю вас в приватный канал с программой...`,
            { remove_keyboard: true }
          );
        } else if (product === 'nutrition' || product === 'coaching') {
          await sendTelegramMessage(
            chatId,
            `✅ Спасибо за интерес!\n\nПишите владельцу: @MK_sculptor1`,
            { remove_keyboard: true }
          );
        }

        // Answer callback to remove loading state
        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/answerCallbackQuery`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ callback_query_id: id }),
        });
      }

      return NextResponse.json({ ok: true });
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
