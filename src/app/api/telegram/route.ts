import { NextRequest, NextResponse } from 'next/server';

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8639462645:AAGDSXmsFVSnnPI9JN6mqH7NWoar5-OoZ4U';
const OWNER_TELEGRAM = 'MK_sculptor1';
const CARD_FULL = '4400 0055 4407 7511';
const CARD_MASKED = '4400 •••• •••• 7511';
const PAYPAL_EMAIL = process.env.PAYPAL_EMAIL || 'mm4446008@gmail.com';
const PAYPAL_MASKED = 'm••••••••@gmail.com';

type Language = 'ru' | 'en' | 'uk';

const PRODUCTS = {
  program: {
    priceUSD: 17,
    oldPriceUSD: 117,
  },
  nutrition: {
    priceUSD: 50,
    oldPriceUSD: 100,
  },
  coaching: {
    priceUSD: 120,
    oldPriceUSD: 180,
  },
};

function calculateDiscount(oldPrice: number, newPrice: number): number {
  return Math.round(((oldPrice - newPrice) / oldPrice) * 100);
}

interface Messages {
  program: { name: string; description: string };
  nutrition: { name: string; description: string };
  coaching: { name: string; description: string };
  common: {
    costLabel: string;
    methodsLabel: string;
    cardLabel: string;
    paypalLabel: string;
    warning: string;
    instructionLabel: string;
    instruction1: string;
    instruction2: string;
    instruction3: string;
    buttonText: string;
    showCardButton: string;
    hideCardButton: string;
    showPaypalButton: string;
    hidePaypalButton: string;
    helpText: string;
    unknownProduct: string;
    helpResponse: string;
  };
}

const MESSAGES: Record<Language, Messages> = {
  ru: {
    program: { name: '🎯 Программа "Твоя лучшая версия"', description: '8-недельная программа трансформации' },
    nutrition: { name: '🥗 План питания', description: 'Персональный план питания на месяц' },
    coaching: { name: '👨‍🏫 Онлайн-ведение', description: 'Полное сопровождение на месяц' },
    common: {
      costLabel: '<b>💰 СТОИМОСТЬ:</b>',
      methodsLabel: '<b>💳 СПОСОБЫ ОПЛАТЫ:</b>',
      cardLabel: '<b>🇺🇦 Украинская карта:</b>',
      paypalLabel: '<b>🌍 PayPal:</b>',
      warning: '⚠️ <i>Не передавайте платёжные данные третьим лицам.</i>',
      instructionLabel: '<b>✅ ПОСЛЕ ОПЛАТЫ:</b>',
      instruction1: '1️⃣ Сделайте скриншот квитанции об оплате',
      instruction2: '2️⃣ Отправьте скриншот мне в личные сообщения',
      instruction3: '3️⃣ Я проверю платеж.',
      buttonText: '💬 Написать с квитанцией',
      showCardButton: '👁️ Показать карту',
      hideCardButton: '🙈 Скрыть карту',
      showPaypalButton: '👁️ Показать PayPal',
      hidePaypalButton: '🙈 Скрыть PayPal',
      helpText: '❓ Помощь',
      unknownProduct: '❌ Неизвестный товар. Пожалуйста, выберите товар на сайте.',
      helpResponse: 'Если у вас есть вопросы, напишите владельцу',
    },
  },
  en: {
    program: { name: '🎯 Program "Your Best Version"', description: '8-week transformation program' },
    nutrition: { name: '🥗 Nutrition Plan', description: 'Personalized nutrition plan for a month' },
    coaching: { name: '👨‍🏫 Online Coaching', description: 'Full support for a month' },
    common: {
      costLabel: '<b>💰 COST:</b>',
      methodsLabel: '<b>💳 PAYMENT METHODS:</b>',
      cardLabel: '<b>🇺🇦 Ukrainian Card:</b>',
      paypalLabel: '<b>🌍 PayPal:</b>',
      warning: '⚠️ <i>Do not share payment details with third parties.</i>',
      instructionLabel: '<b>✅ AFTER PAYMENT:</b>',
      instruction1: '1️⃣ Take a screenshot of your payment receipt',
      instruction2: '2️⃣ Send the screenshot to my personal messages',
      instruction3: '3️⃣ I will check payment.',
      buttonText: '💬 Send Receipt',
      showCardButton: '👁️ Show Card',
      hideCardButton: '🙈 Hide Card',
      showPaypalButton: '👁️ Show PayPal',
      hidePaypalButton: '🙈 Hide PayPal',
      helpText: '❓ Help',
      unknownProduct: '❌ Unknown product. Please select a product on the website.',
      helpResponse: 'If you have questions, write to the owner',
    },
  },
  uk: {
    program: { name: '🎯 Програма "Твоя найкраща версія"', description: '8-тижнева програма трансформації' },
    nutrition: { name: '🥗 План харчування', description: 'Персональний план харчування на місяць' },
    coaching: { name: '👨‍🏫 Онлайн-ведення', description: 'Повний супровід на місяць' },
    common: {
      costLabel: '<b>💰 ВАРТІСТЬ:</b>',
      methodsLabel: '<b>💳 СПОСОБИ ОПЛАТИ:</b>',
      cardLabel: '<b>🇺🇦 Українська карта:</b>',
      paypalLabel: '<b>🌍 PayPal:</b>',
      warning: '⚠️ <i>Не передавайте платіжні дані третім особам.</i>',
      instructionLabel: '<b>✅ ПІСЛЯ ОПЛАТИ:</b>',
      instruction1: '1️⃣ Зробіть скріншот квитанції про оплату',
      instruction2: '2️⃣ Відправте скріншот мені в особисті повідомлення',
      instruction3: '3️⃣ Я перевірю платіж.',
      buttonText: '💬 Написати з квитанцією',
      showCardButton: '👁️ Показати карту',
      hideCardButton: '🙈 Сховати карту',
      showPaypalButton: '👁️ Показати PayPal',
      hidePaypalButton: '🙈 Сховати PayPal',
      helpText: '❓ Допомога',
      unknownProduct: '❌ Невідомий товар. Будь ласка, виберіть товар на сайті.',
      helpResponse: 'Якщо у вас є питання, напишіть власнику',
    },
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
    message?: {
      message_id: number;
      chat: { id: number };
      text: string;
    };
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
    const response = await fetch('https://api.exchangerate.host/latest?base=USD&symbols=UAH', {
      headers: { 'Cache-Control': 'no-cache' },
    });
    const data = await response.json();
    return Math.round(data.rates?.UAH || 42);
  } catch {
    return 42;
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

type Product = keyof typeof PRODUCTS;

function getPriceSection(product: Product, lang: Language, exchangeRate: number): string {
  const priceUAH = Math.round(PRODUCTS[product].priceUSD * exchangeRate);
  const oldPriceUAH = Math.round(PRODUCTS[product].oldPriceUSD * exchangeRate);
  const discount = calculateDiscount(PRODUCTS[product].oldPriceUSD, PRODUCTS[product].priceUSD);

  return lang === 'en'
    ? `<s>$${PRODUCTS[product].oldPriceUSD} USD</s> → 🇺🇸 <b>$${PRODUCTS[product].priceUSD} USD</b> <b>(-${discount}%)</b>\n<s>≈ ${oldPriceUAH} UAH</s> → 🇺🇦 <b>≈ ${priceUAH} UAH</b>`
    : `<s>${PRODUCTS[product].oldPriceUSD}$ USD</s> → 🇺🇸 <b>${PRODUCTS[product].priceUSD}$ USD</b> <b>(-${discount}%)</b>\n<s>≈ ${oldPriceUAH} ₴</s> → 🇺🇦 <b>≈ ${priceUAH} ₴ UAH</b>`;
}

/**
 * Builds the single payment message. The card/PayPal reveal state is encoded
 * into the inline-button callback_data, so every interaction edits this one
 * message in place instead of sending a new one.
 */
function buildPaymentMessage(
  product: Product,
  lang: Language,
  cardRevealed: boolean,
  paypalRevealed: boolean,
  exchangeRate: number
): { text: string; markup: TelegramReplyMarkup } {
  const c = MESSAGES[lang].common;
  const productInfo = MESSAGES[lang][product];
  const priceSection = getPriceSection(product, lang, exchangeRate);

  const cardSection = `${c.cardLabel}\n<code>${cardRevealed ? CARD_FULL : CARD_MASKED}</code>`;
  const paypalSection = `${c.paypalLabel}\n<code>${paypalRevealed ? PAYPAL_EMAIL : PAYPAL_MASKED}</code>`;

  const text =
    `<b>${productInfo.name}</b>\n\n${productInfo.description}\n\n` +
    `━━━━━━━━━━━━━━━━━━━━\n\n${c.costLabel}\n\n${priceSection}\n\n` +
    `━━━━━━━━━━━━━━━━━━━━\n\n${c.methodsLabel}\n\n${cardSection}\n\n${paypalSection}\n\n${c.warning}\n\n` +
    `━━━━━━━━━━━━━━━━━━━━\n\n${c.instructionLabel}\n\n${c.instruction1}\n${c.instruction2}\n${c.instruction3}`;

  const cardFlag = cardRevealed ? '1' : '0';
  const paypalFlag = paypalRevealed ? '1' : '0';

  const cardButton: InlineButton = {
    text: cardRevealed ? c.hideCardButton : c.showCardButton,
    callback_data: `pay:${lang}:${product}:${cardRevealed ? '0' : '1'}:${paypalFlag}`,
  };
  const paypalButton: InlineButton = {
    text: paypalRevealed ? c.hidePaypalButton : c.showPaypalButton,
    callback_data: `pay:${lang}:${product}:${cardFlag}:${paypalRevealed ? '0' : '1'}`,
  };

  const markup: TelegramReplyMarkup = {
    inline_keyboard: [
      [cardButton, paypalButton],
      [{ text: c.buttonText, url: `https://t.me/${OWNER_TELEGRAM}` }],
      [{ text: c.helpText, callback_data: `help:${lang}` }],
    ],
  };

  return { text, markup };
}

async function editTelegramMessage(
  chatId: number,
  messageId: number,
  text: string,
  markup?: TelegramReplyMarkup
): Promise<void> {
  if (!BOT_TOKEN) return;

  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/editMessageText`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      message_id: messageId,
      text,
      parse_mode: 'HTML',
      reply_markup: markup,
      disable_web_page_preview: true,
    }),
  });
}

async function answerCallbackQuery(
  queryId: string,
  text: string,
  alert: boolean = false
): Promise<void> {
  if (!BOT_TOKEN) return;

  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/answerCallbackQuery`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      callback_query_id: queryId,
      text,
      show_alert: alert,
    }),
  });
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  if (!BOT_TOKEN) {
    return NextResponse.json({ error: 'Bot token not configured' }, { status: 500 });
  }

  try {
    const body: TelegramMessage = await request.json();

    if (body.message?.text?.startsWith('/start')) {
      const chatId = body.message.chat.id;
      const text = body.message.text;

      const params = new URLSearchParams(text.replace('/start ', ''));
      const product = params.get('product') as keyof typeof PRODUCTS | null;
      const lang = (params.get('lang') || 'ru') as Language;

      if (!product || !PRODUCTS[product]) {
        await sendTelegramMessage(chatId, MESSAGES[lang].common.unknownProduct);
        return NextResponse.json({ ok: true });
      }

      const exchangeRate = await getExchangeRate();
      const { text: paymentMessage, markup } = buildPaymentMessage(
        product,
        lang,
        false,
        false,
        exchangeRate
      );

      await sendTelegramMessage(chatId, paymentMessage, markup);

      return NextResponse.json({ ok: true });
    }

    if (body.callback_query) {
      const { id, data, message } = body.callback_query;
      const chatId = message?.chat.id || body.callback_query.from.id;
      const messageId = message?.message_id;

      if (data.startsWith('pay:')) {
        const [, lang, product, cardFlag, paypalFlag] = data.split(':') as [
          string,
          Language,
          Product,
          string,
          string
        ];

        if (messageId && PRODUCTS[product]) {
          const exchangeRate = await getExchangeRate();
          const { text: newText, markup: newMarkup } = buildPaymentMessage(
            product,
            lang,
            cardFlag === '1',
            paypalFlag === '1',
            exchangeRate
          );
          await editTelegramMessage(chatId, messageId, newText, newMarkup);
        }

        await answerCallbackQuery(id, '✅', false);
        return NextResponse.json({ ok: true });
      }

      if (data.startsWith('help:')) {
        const lang = data.split(':')[1] as Language;
        await answerCallbackQuery(id, MESSAGES[lang].common.helpResponse, false);
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
