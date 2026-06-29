const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

const CHANNEL_ID = '-1002089507530';
const OWNER_TELEGRAM = 'MK_sculptor1';

const prices = {
  program: 17,
  nutrition: 50,
  coaching: 120,
};

const translations = {
  ru: {
    greeting: 'Привет! 🏋️‍♀️',
    selectProduct: 'Выбери услугу:',
    program: 'Твоя лучшая версия (8 нед)',
    nutrition: 'План питания (месяц)',
    coaching: 'Онлайн-ведение (месяц)',
    payment: 'Способ оплаты:',
    cardInfo: 'Карта (Украина): 4400 7511 XXXX XXXX',
    cardName: 'Имя: Mariya',
    amountUSD: 'Сумма: {amount} USD',
    amountUAH: '({amountUAH} ₴)',
    contactInfo: 'После платежа отправь мне скриншот чека в личные сообщения',
    programConfirm: 'После платежа добавлю тебя в приватный канал с программой',
    redirectMessage: 'Переходи в личные сообщения →',
    contactMe: `Написать @${OWNER_TELEGRAM}`,
    exchangeRate: 'Курс: 1 USD = {rate} ₴',
  },
  en: {
    greeting: 'Hello! 🏋️‍♀️',
    selectProduct: 'Choose a service:',
    program: 'Your Best Version (8 weeks)',
    nutrition: 'Nutrition Plan (month)',
    coaching: 'Online Coaching (month)',
    payment: 'Payment method:',
    cardInfo: 'Card (Ukraine): 4400 7511 XXXX XXXX',
    cardName: 'Name: Mariya',
    amountUSD: 'Amount: {amount} USD',
    amountUAH: '({amountUAH} ₴)',
    contactInfo: 'After payment, send me a screenshot of the receipt in a private message',
    programConfirm: 'After payment I will add you to the private channel with the program',
    redirectMessage: 'Go to private messages →',
    contactMe: `Message @${OWNER_TELEGRAM}`,
    exchangeRate: 'Rate: 1 USD = {rate} ₴',
  },
  uk: {
    greeting: 'Привіт! 🏋️‍♀️',
    selectProduct: 'Обери послугу:',
    program: 'Твоя найкраща версія (8 тижнів)',
    nutrition: 'План харчування (місяць)',
    coaching: 'Онлайн-ведення (місяць)',
    payment: 'Спосіб оплати:',
    cardInfo: 'Карта (Україна): 4400 7511 XXXX XXXX',
    cardName: 'Ім\'я: Mariya',
    amountUSD: 'Сума: {amount} USD',
    amountUAH: '({amountUAH} ₴)',
    contactInfo: 'Після платежу надішли мені скриншот чека в особисті повідомлення',
    programConfirm: 'Після платежу додам тебе до приватного каналу з програмою',
    redirectMessage: 'Переходи в особисті повідомлення →',
    contactMe: `Написати @${OWNER_TELEGRAM}`,
    exchangeRate: 'Курс: 1 USD = {rate} ₴',
  },
};

let exchangeRate = 42; // default fallback

async function getExchangeRate() {
  try {
    const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
    exchangeRate = Math.round(response.data.rates.UAH * 100) / 100;
  } catch (error) {
    console.error('Exchange rate fetch error:', error.message);
  }
}

function formatMessage(lang, key, data = {}) {
  let message = translations[lang][key];
  Object.keys(data).forEach(k => {
    message = message.replace(`{${k}}`, data[k]);
  });
  return message;
}

function getProductInfo(product, lang) {
  const productMap = {
    program: { key: 'program', price: prices.program, type: 'program' },
    nutrition: { key: 'nutrition', price: prices.nutrition, type: 'service' },
    coaching: { key: 'coaching', price: prices.coaching, type: 'service' },
  };
  return productMap[product] || null;
}

function buildPaymentMessage(product, lang) {
  const productInfo = getProductInfo(product, lang);
  if (!productInfo) return null;

  const amountUSD = productInfo.price;
  const amountUAH = Math.round(amountUSD * exchangeRate);

  let message = `${formatMessage(lang, 'greeting')}\n\n`;
  message += `${formatMessage(lang, 'payment')}\n`;
  message += `💳 ${formatMessage(lang, 'cardInfo')}\n`;
  message += `${formatMessage(lang, 'cardName')}\n\n`;
  message += `${formatMessage(lang, 'amountUSD', { amount: amountUSD })} ${formatMessage(lang, 'amountUAH', { amountUAH })}\n`;
  message += `${formatMessage(lang, 'exchangeRate', { rate: exchangeRate })}\n\n`;

  if (productInfo.type === 'program') {
    message += `✅ ${formatMessage(lang, 'programConfirm')}\n`;
  } else {
    message += `✅ ${formatMessage(lang, 'contactInfo')}\n`;
  }

  return { message, price: amountUSD, priceUAH: amountUAH, productType: productInfo.type };
}

bot.onText(/\/start (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const startData = match[1];

  const params = new URLSearchParams(startData);
  const product = params.get('product');
  const lang = params.get('lang') || 'ru';

  if (!product || !['program', 'nutrition', 'coaching'].includes(product)) {
    bot.sendMessage(chatId, 'Invalid product');
    return;
  }

  if (!translations[lang]) {
    bot.sendMessage(chatId, 'Invalid language');
    return;
  }

  const paymentData = buildPaymentMessage(product, lang);
  if (!paymentData) {
    bot.sendMessage(chatId, 'Product not found');
    return;
  }

  const inlineKeyboard = [];

  if (paymentData.productType === 'program') {
    inlineKeyboard.push([
      {
        text: '✅ Платёж выполнен',
        callback_data: `confirm_payment_program_${lang}`,
      },
    ]);
  } else {
    inlineKeyboard.push([
      {
        text: formatMessage(lang, 'contactMe'),
        url: `https://t.me/${OWNER_TELEGRAM}`,
      },
    ]);
  }

  bot.sendMessage(chatId, paymentData.message, {
    reply_markup: { inline_keyboard: inlineKeyboard },
  });
});

bot.on('callback_query', async (query) => {
  const chatId = query.message.chat.id;
  const data = query.data;

  if (data.startsWith('confirm_payment_program_')) {
    const lang = data.replace('confirm_payment_program_', '');
    try {
      await bot.forwardMessage(CHANNEL_ID, chatId, query.message.message_id);
      bot.sendMessage(
        chatId,
        `${formatMessage(lang, 'programConfirm')}\n\nhttps://t.me/+E2usDmxEgsg4OTVi`
      );
      bot.answerCallbackQuery(query.id, { text: '✅ Confirmed', show_alert: false });
    } catch (error) {
      console.error('Error handling payment confirmation:', error);
      bot.answerCallbackQuery(query.id, { text: '❌ Error', show_alert: true });
    }
  }
});

bot.on('message', (msg) => {
  if (msg.text && msg.text.startsWith('/start')) {
    return;
  }

  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    `Hi! Use this link to start:\nhttps://t.me/MK_sculptor_bot?start=product=program&lang=ru`
  );
});

getExchangeRate();
setInterval(getExchangeRate, 3600000);

console.log('Bot started...');
