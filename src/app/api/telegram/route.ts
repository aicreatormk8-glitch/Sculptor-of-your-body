import { NextRequest, NextResponse } from 'next/server';

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8639462645:AAGDSXmsFVSnnPI9JN6mqH7NWoar5-OoZ4U';
const OWNER_TELEGRAM = 'MK_sculptor1';
const CARD_FULL = '4400 0055 4407 7511';
const CARD_MASKED = '4400 **** **** 7511';
const PAYPAL_EMAIL = 'mm4446008@gmail.com';

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
    instructionLabel: string;
    instruction1: string;
    instruction2: string;
    instruction3: string;
    buttonText: string;
    showCardButton: string;
    helpText: string;
    cardReveal: string;
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
      cardLabel: '<b>🇺🇦 Украинская карта</b>',
      paypalLabel: '<b>🌍 PayPal</b>',
      instructionLabel: '<b>✅ ПОСЛЕ ОПЛАТЫ:</b>',
      instruction1: '1️⃣ Сделайте скриншот квитанции об оплате',
      instruction2: '2️⃣ Отправьте скриншот мне в личные сообщения',
      instruction3: '3️⃣ Я проверю платеж.',
      buttonText: '💬 Написать с квитанцией',
      showCardButton: '👁️ Показать полный номер карты',
      helpText: '❓ Помощь',
      cardReveal: '<b>Полный номер карты:</b>\n<code>{card}</code>\n\n⚠️ Не делитесь этим номером с кем-либо!',
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
      cardLabel: '<b>🇺🇦 Ukrainian Card</b>',
      paypalLabel: '<b>🌍 PayPal</b>',
      instructionLabel: '<b>✅ AFTER PAYMENT:</b>',
      instruction1: '1️⃣ Take a screenshot of your payment receipt',
      instruction2: '2️⃣ Send the screenshot to my personal messages',
      instruction3: '3️⃣ I will check payment.',
      buttonText: '💬 Send Receipt',
      showCardButton: '👁️ Show Full Card Number',
      helpText: '❓ Help',
      cardReveal: '<b>Full card number:</b>\n<code>{card}</code>\n\n⚠️ Do not share this number with anyone!',
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
      cardLabel: '<b>🇺🇦 Українська карта</b>',
      paypalLabel: '<b>🌍 PayPal</b>',
      instructionLabel: '<b>✅ ПІСЛЯ ОПЛАТИ:</b>',
      instruction1: '1️⃣ Зробіть скріншот квитанції про оплату',
      instruction2: '2️⃣ Відправте скріншот мені в особисті повідомлення',
      instruction3: '3️⃣ Я перевірю платіж.',
      buttonText: '💬 Написати з квитанцією',
      showCardButton: '👁️ Показати повний номер карти',
      helpText: '❓ Допомога',
      cardReveal: '<b>Повний номер карти:</b>\n<code>{card}</code>\n\n⚠️ Не ділитеся цим номером з ніким!',
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

      const productInfo = MESSAGES[lang][product];
      const exchangeRate = await getExchangeRate();
      const priceUAH = PRODUCTS[product].priceUSD * exchangeRate;
      const oldPriceUAH = PRODUCTS[product].oldPriceUSD * exchangeRate;
      const discount = calculateDiscount(PRODUCTS[product].oldPriceUSD, PRODUCTS[product].priceUSD);

      const priceSection =
        lang === 'ru'
          ? `<s>${PRODUCTS[product].oldPriceUSD}$ USD</s> → 🇺🇸 <b>${PRODUCTS[product].priceUSD}$ USD</b> <b>(-${discount}%)</b>\n<s>≈ ${Math.round(oldPriceUAH)} ₴</s> → 🇺🇦 <b>≈ ${Math.round(priceUAH)} ₴ UAH</b>`
          : lang === 'en'
            ? `<s>$${PRODUCTS[product].oldPriceUSD} USD</s> → 🇺🇸 <b>$${PRODUCTS[product].priceUSD} USD</b> <b>(-${discount}%)</b>\n<s>≈ ${Math.round(oldPriceUAH)} UAH</s> → 🇺🇦 <b>≈ ${Math.round(priceUAH)} UAH</b>`
            : `<s>${PRODUCTS[product].oldPriceUSD}$ USD</s> → 🇺🇸 <b>${PRODUCTS[product].priceUSD}$ USD</b> <b>(-${discount}%)</b>\n<s>≈ ${Math.round(oldPriceUAH)} ₴</s> → 🇺🇦 <b>≈ ${Math.round(priceUAH)} ₴ UAH</b>`;

      const paymentMessage = `<b>${productInfo.name}</b>\n\n${productInfo.description}\n\n━━━━━━━━━━━━━━━━━━━━\n\n${MESSAGES[lang].common.costLabel}\n\n${priceSection}\n\n━━━━━━━━━━━━━━━━━━━━\n\n${MESSAGES[lang].common.methodsLabel}\n\n${MESSAGES[lang].common.cardLabel}\n<code>${CARD_MASKED}</code>\n\n${MESSAGES[lang].common.paypalLabel}\n<code>${PAYPAL_EMAIL}</code>\n\n━━━━━━━━━━━━━━━━━━━━\n\n${MESSAGES[lang].common.instructionLabel}\n\n${MESSAGES[lang].common.instruction1}\n${MESSAGES[lang].common.instruction2}\n${MESSAGES[lang].common.instruction3}`;

      await sendTelegramMessage(chatId, paymentMessage, {
        inline_keyboard: [
          [
            {
              text: MESSAGES[lang].common.showCardButton,
              callback_data: `show_card:${lang}`,
            },
          ],
          [
            {
              text: MESSAGES[lang].common.buttonText,
              url: `https://t.me/${OWNER_TELEGRAM}`,
            },
          ],
          [
            {
              text: MESSAGES[lang].common.helpText,
              callback_data: `help:${lang}`,
            },
          ],
        ],
      });

      return NextResponse.json({ ok: true });
    }

    if (body.callback_query) {
      const { id, data } = body.callback_query;

      if (data.startsWith('show_card:')) {
        const lang = data.split(':')[1] as Language;
        const cardMessage = MESSAGES[lang].common.cardReveal.replace('{card}', CARD_FULL);
        await sendTelegramMessage(body.callback_query.from.id, cardMessage);
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
