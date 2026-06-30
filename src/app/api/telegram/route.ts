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

interface ProductMessage {
  greeting: string;
  description: string;
  short: string;
  nextStep: string;
}

interface Messages {
  program: ProductMessage;
  nutrition: ProductMessage;
  coaching: ProductMessage;
  common: {
    costLabel: string;
    methodsLabel: string;
    cardLabel: string;
    paypalLabel: string;
    warning: string;
    instructionLabel: string;
    instruction1: string;
    instruction2: string;
    programAccess: string;
    menuPrompt: string;
    buttonText: string;
    showCardButton: string;
    hideCardButton: string;
    showPaypalButton: string;
    hidePaypalButton: string;
    helpText: string;
    helpResponse: string;
  };
}

const MESSAGES: Record<Language, Messages> = {
  ru: {
    program: {
      greeting: '🎯 Добро пожаловать в программу «Твоя лучшая версия»',
      description: '8-недельная программа тренировок с акцентом на ягодицы, тонус и форму тела.',
      short: '🎯 Твоя лучшая версия',
      nextStep: '3️⃣ После проверки я открою вам доступ к программе.',
    },
    nutrition: {
      greeting: '🥗 План питания',
      description: 'Персональный план питания на месяц — только питание, без тренировок и сопровождения.',
      short: '🥗 План питания',
      nextStep: '3️⃣ После проверки начнём составление вашего плана питания.',
    },
    coaching: {
      greeting: '👨‍🏫 Онлайн-ведение',
      description: 'В стоимость онлайн-ведения входит полное сопровождение на протяжении месяца.',
      short: '👨‍🏫 Онлайн-ведение',
      nextStep: '3️⃣ После проверки начнём работу над созданием ТВОЕЙ ЛУЧШЕЙ ВЕРСИИ.',
    },
    common: {
      costLabel: '<b>💰 СТОИМОСТЬ:</b>',
      methodsLabel: '<b>💳 СПОСОБЫ ОПЛАТЫ:</b>',
      cardLabel: '<b>🇺🇦 Украинская карта:</b>',
      paypalLabel: '<b>🌍 PayPal:</b>',
      warning: '⚠️ <i>Не передавайте платёжные данные третьим лицам.</i>',
      instructionLabel: '<b>✅ ПОСЛЕ ОПЛАТЫ:</b>',
      instruction1: '1️⃣ Сделайте скриншот квитанции об оплате',
      instruction2: '2️⃣ Отправьте скриншот мне в личные сообщения',
      programAccess: '🔒 <i>Доступ к закрытому каналу с программой откроется после подтверждения оплаты.</i>',
      menuPrompt: '<b>👋 Выберите услугу:</b>\n\nНажмите на нужный вариант, чтобы увидеть детали и способы оплаты.',
      buttonText: '💬 Написать с квитанцией',
      showCardButton: '👁️ Показать карту',
      hideCardButton: '🙈 Скрыть карту',
      showPaypalButton: '👁️ Показать PayPal',
      hidePaypalButton: '🙈 Скрыть PayPal',
      helpText: '❓ Помощь',
      helpResponse: 'Если у вас есть вопросы, напишите владельцу',
    },
  },
  en: {
    program: {
      greeting: '🎯 Welcome to the "Your Best Version" program',
      description: '8-week training program focused on glutes, tone and body shape.',
      short: '🎯 Your Best Version',
      nextStep: '3️⃣ Once confirmed, I will grant you access to the program.',
    },
    nutrition: {
      greeting: '🥗 Nutrition Plan',
      description: 'A personalized nutrition plan for a month — nutrition only, no training and support.',
      short: '🥗 Nutrition Plan',
      nextStep: '3️⃣ Once confirmed, we will start building your nutrition plan.',
    },
    coaching: {
      greeting: '👨‍🏫 Online Coaching',
      description: 'Online coaching includes full support throughout the entire month.',
      short: '👨‍🏫 Online Coaching',
      nextStep: '3️⃣ Once confirmed, we will start creating YOUR BEST VERSION.',
    },
    common: {
      costLabel: '<b>💰 COST:</b>',
      methodsLabel: '<b>💳 PAYMENT METHODS:</b>',
      cardLabel: '<b>🇺🇦 Ukrainian Card:</b>',
      paypalLabel: '<b>🌍 PayPal:</b>',
      warning: '⚠️ <i>Do not share payment details with third parties.</i>',
      instructionLabel: '<b>✅ AFTER PAYMENT:</b>',
      instruction1: '1️⃣ Take a screenshot of your payment receipt',
      instruction2: '2️⃣ Send the screenshot to my personal messages',
      programAccess: '🔒 <i>Access to the private channel with the program opens after your payment is confirmed.</i>',
      menuPrompt: '<b>👋 Choose a service:</b>\n\nTap an option to see the details and payment methods.',
      buttonText: '💬 Send Receipt',
      showCardButton: '👁️ Show Card',
      hideCardButton: '🙈 Hide Card',
      showPaypalButton: '👁️ Show PayPal',
      hidePaypalButton: '🙈 Hide PayPal',
      helpText: '❓ Help',
      helpResponse: 'If you have questions, write to the owner',
    },
  },
  uk: {
    program: {
      greeting: '🎯 Ласкаво просимо до програми «Твоя найкраща версія»',
      description: '8-тижнева програма тренувань з акцентом на сідниці, тонус та форму тіла.',
      short: '🎯 Твоя найкраща версія',
      nextStep: '3️⃣ Після перевірки я відкрию вам доступ до програми.',
    },
    nutrition: {
      greeting: '🥗 План харчування',
      description: 'Персональний план харчування на місяць — тільки харчування, без тренувань і супроводу.',
      short: '🥗 План харчування',
      nextStep: '3️⃣ Після перевірки почнемо складання вашого плану харчування.',
    },
    coaching: {
      greeting: '👨‍🏫 Онлайн-ведення',
      description: 'У вартість онлайн-ведення входить повний супровід протягом місяця.',
      short: '👨‍🏫 Онлайн-ведення',
      nextStep: '3️⃣ Після перевірки почнемо роботу над створенням ТВОЄЇ НАЙКРАЩОЇ ВЕРСІЇ.',
    },
    common: {
      costLabel: '<b>💰 ВАРТІСТЬ:</b>',
      methodsLabel: '<b>💳 СПОСОБИ ОПЛАТИ:</b>',
      cardLabel: '<b>🇺🇦 Українська карта:</b>',
      paypalLabel: '<b>🌍 PayPal:</b>',
      warning: '⚠️ <i>Не передавайте платіжні дані третім особам.</i>',
      instructionLabel: '<b>✅ ПІСЛЯ ОПЛАТИ:</b>',
      instruction1: '1️⃣ Зробіть скріншот квитанції про оплату',
      instruction2: '2️⃣ Відправте скріншот мені в особисті повідомлення',
      programAccess: '🔒 <i>Доступ до закритого каналу з програмою відкриється після підтвердження оплати.</i>',
      menuPrompt: '<b>👋 Оберіть послугу:</b>\n\nНатисніть потрібний варіант, щоб побачити деталі та способи оплати.',
      buttonText: '💬 Написати з квитанцією',
      showCardButton: '👁️ Показати карту',
      hideCardButton: '🙈 Сховати карту',
      showPaypalButton: '👁️ Показати PayPal',
      hidePaypalButton: '🙈 Сховати PayPal',
      helpText: '❓ Допомога',
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

const LANGUAGES: Language[] = ['ru', 'en', 'uk'];

/**
 * Parses the Telegram deep-link /start payload. Supports the current compact
 * format "<product>_<lang>" (e.g. "nutrition_ru") which only uses characters
 * allowed by Telegram, and stays backward-compatible with the legacy
 * "product=...&lang=..." query format.
 */
function parseStartPayload(payload: string): { product: Product | null; lang: Language } {
  let rawProduct: string | null = null;
  let rawLang: string | null = null;

  if (payload.includes('=')) {
    const params = new URLSearchParams(payload);
    rawProduct = params.get('product');
    rawLang = params.get('lang');
  } else if (payload) {
    const [p, l] = payload.split('_');
    rawProduct = p || null;
    rawLang = l || null;
  }

  const product = rawProduct && rawProduct in PRODUCTS ? (rawProduct as Product) : null;
  const lang = rawLang && LANGUAGES.includes(rawLang as Language) ? (rawLang as Language) : 'ru';

  return { product, lang };
}

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
  const accessSection = product === 'program' ? `\n\n${c.programAccess}` : '';

  // Payment methods are placed last, right above the inline keyboard, so the
  // "show card / show PayPal" buttons sit directly under the masked details
  // (Telegram inline keyboards can only attach at the bottom of a message).
  const text =
    `<b>${productInfo.greeting}</b>\n\n${productInfo.description}\n\n` +
    `━━━━━━━━━━━━━━━━━━━━\n\n${c.costLabel}\n\n${priceSection}\n\n` +
    `━━━━━━━━━━━━━━━━━━━━\n\n${c.instructionLabel}\n\n${c.instruction1}\n${c.instruction2}\n${productInfo.nextStep}${accessSection}\n\n` +
    `━━━━━━━━━━━━━━━━━━━━\n\n${c.methodsLabel}\n\n${cardSection}\n\n${paypalSection}\n\n${c.warning}`;

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

/**
 * Service-selection menu shown when /start arrives without a product, so the
 * user can pick a service and jump straight to its individual payment message.
 */
function buildMenu(lang: Language): { text: string; markup: TelegramReplyMarkup } {
  const m = MESSAGES[lang];

  return {
    text: m.common.menuPrompt,
    markup: {
      inline_keyboard: [
        [{ text: m.program.short, callback_data: `open:program:${lang}` }],
        [{ text: m.nutrition.short, callback_data: `open:nutrition:${lang}` }],
        [{ text: m.coaching.short, callback_data: `open:coaching:${lang}` }],
      ],
    },
  };
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

      const payload = text.replace('/start', '').trim();
      const { product, lang } = parseStartPayload(payload);

      if (!product || !PRODUCTS[product]) {
        const { text: menuText, markup: menuMarkup } = buildMenu(lang);
        await sendTelegramMessage(chatId, menuText, menuMarkup);
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

      if (data.startsWith('open:')) {
        const [, product, lang] = data.split(':') as [string, Product, Language];

        if (messageId && PRODUCTS[product]) {
          const exchangeRate = await getExchangeRate();
          const { text: newText, markup: newMarkup } = buildPaymentMessage(
            product,
            lang,
            false,
            false,
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
