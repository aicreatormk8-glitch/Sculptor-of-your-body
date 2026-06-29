import { NextRequest, NextResponse } from 'next/server';

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const API_URL = `https://api.telegram.org/bot${BOT_TOKEN}`;

interface TelegramUpdate {
  update_id: number;
  message?: {
    chat: { id: number };
    text: string;
  };
  callback_query?: {
    id: string;
    from: { id: number };
    message?: { chat: { id: number }; message_id: number };
    data: string;
  };
}

const prices = {
  program: 17,
  nutrition: 50,
  coaching: 120,
};

const translations = {
  ru: {
    greeting: 'Привет! 🏋️‍♀️',
    payment: 'Способ оплаты:',
    cardInfo: 'Карта (Украина): 4400 7511 XXXX XXXX',
    cardName: 'Имя: Mariya',
    amountUSD: 'Сумма: {amount} USD',
    amountUAH: '({amountUAH} ₴)',
    contactInfo: 'После платежа отправь мне скриншот чека в личные сообщения',
    programConfirm: 'После платежа добавлю тебя в приватный канал с программой',
    redirectMessage: 'Переходи в личные сообщения →',
    contactMe: 'Написать @MK_sculptor1',
    exchangeRate: 'Курс: 1 USD = {rate} ₴',
  },
  en: {
    greeting: 'Hello! 🏋️‍♀️',
    payment: 'Payment method:',
    cardInfo: 'Card (Ukraine): 4400 7511 XXXX XXXX',
    cardName: 'Name: Mariya',
    amountUSD: 'Amount: {amount} USD',
    amountUAH: '({amountUAH} ₴)',
    contactInfo: 'After payment, send me a screenshot of the receipt in a private message',
    programConfirm: 'After payment I will add you to the private channel with the program',
    redirectMessage: 'Go to private messages →',
    contactMe: 'Message @MK_sculptor1',
    exchangeRate: 'Rate: 1 USD = {rate} ₴',
  },
  uk: {
    greeting: 'Привіт! 🏋️‍♀️',
    payment: 'Спосіб оплати:',
    cardInfo: 'Карта (Україна): 4400 7511 XXXX XXXX',
    cardName: 'Ім\'я: Mariya',
    amountUSD: 'Сума: {amount} USD',
    amountUAH: '({amountUAH} ₴)',
    contactInfo: 'Після платежу надішли мені скриншот чека в особисті повідомлення',
    programConfirm: 'Після платежу додам тебе до приватного каналу з програмою',
    redirectMessage: 'Переходи в особисті повідомлення →',
    contactMe: 'Написати @MK_sculptor1',
    exchangeRate: 'Курс: 1 USD = {rate} ₴',
  },
};

let exchangeRate = 42;

async function getExchangeRate() {
  try {
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
    const data = await response.json();
    exchangeRate = Math.round(data.rates.UAH * 100) / 100;
  } catch (error) {
    console.error('Exchange rate fetch error:', error);
  }
}

function formatMessage(lang: string, key: string, data: Record<string, any> = {}) {
  let message = translations[lang as keyof typeof translations]?.[key as any] || '';
  Object.keys(data).forEach(k => {
    message = message.replace(`{${k}}`, data[k]);
  });
  return message;
}

function buildPaymentMessage(product: string, lang: string) {
  const priceUSD = prices[product as keyof typeof prices];
  if (!priceUSD) return null;

  const amountUAH = Math.round(priceUSD * exchangeRate);
  const isProgram = product === 'program';

  let message = `${formatMessage(lang, 'greeting')}\n\n`;
  message += `${formatMessage(lang, 'payment')}\n`;
  message += `💳 ${formatMessage(lang, 'cardInfo')}\n`;
  message += `${formatMessage(lang, 'cardName')}\n\n`;
  message += `${formatMessage(lang, 'amountUSD', { amount: priceUSD })} ${formatMessage(lang, 'amountUAH', { amountUAH })}\n`;
  message += `${formatMessage(lang, 'exchangeRate', { rate: exchangeRate })}\n\n`;
  message += isProgram
    ? `✅ ${formatMessage(lang, 'programConfirm')}\n`
    : `✅ ${formatMessage(lang, 'contactInfo')}\n`;

  return { message, isProgram };
}

async function sendMessage(chatId: number, text: string, keyboard?: any) {
  const params = new URLSearchParams();
  params.append('chat_id', chatId.toString());
  params.append('text', text);
  params.append('parse_mode', 'HTML');

  if (keyboard) {
    params.append('reply_markup', JSON.stringify(keyboard));
  }

  try {
    await fetch(`${API_URL}/sendMessage`, {
      method: 'POST',
      body: params,
    });
  } catch (error) {
    console.error('Error sending message:', error);
  }
}

async function answerCallbackQuery(queryId: string, text: string) {
  const params = new URLSearchParams();
  params.append('callback_query_id', queryId);
  params.append('text', text);

  try {
    await fetch(`${API_URL}/answerCallbackQuery`, {
      method: 'POST',
      body: params,
    });
  } catch (error) {
    console.error('Error answering callback:', error);
  }
}

async function handleMessage(message: any) {
  const chatId = message.chat.id;
  const text = message.text || '';

  if (text.startsWith('/start')) {
    const params = new URLSearchParams(text.replace('/start ', ''));
    const product = params.get('product');
    const lang = params.get('lang') || 'ru';

    if (!product || !['program', 'nutrition', 'coaching'].includes(product)) {
      const defaultMsg = `Привет! 👋\n\nЭто бот для обработки платежей.\n\nИспользуй ссылки с сайта для покупки услуг.`;
      await sendMessage(chatId, defaultMsg);
      return;
    }

    const paymentData = buildPaymentMessage(product, lang);
    if (!paymentData) {
      await sendMessage(chatId, 'Услуга не найдена');
      return;
    }

    const keyboard = paymentData.isProgram
      ? {
          inline_keyboard: [[{
            text: '✅ Платёж выполнен',
            callback_data: `confirm_payment_program_${lang}`,
          }]],
        }
      : {
          inline_keyboard: [[{
            text: 'Написать @MK_sculptor1',
            url: 'https://t.me/MK_sculptor1',
          }]],
        };

    await sendMessage(chatId, paymentData.message, keyboard);
  }
}

async function handleUpdate(update: TelegramUpdate) {
  if (update.message) {
    await handleMessage(update.message);
  }

  if (update.callback_query) {
    const query = update.callback_query;
    const data = query.data;

    if (data.startsWith('confirm_payment_program_')) {
      const lang = data.replace('confirm_payment_program_', '');
      const channelLink = 'https://t.me/+E2usDmxEgsg4OTVi';
      const message = `${formatMessage(lang, 'programConfirm')}\n\n${channelLink}`;

      await sendMessage(query.from.id, message);
      await answerCallbackQuery(query.id, '✅ Confirmed');
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as TelegramUpdate;

    if (!body.update_id) {
      return NextResponse.json({ ok: true });
    }

    // Обновить курс при каждом запросе
    await getExchangeRate();

    await handleUpdate(body);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ ok: false, error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Telegram bot webhook is running',
    status: 'active',
  });
}
