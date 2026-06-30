#!/usr/bin/env node

const https = require('https');

function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, options, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({
            status: res.statusCode,
            data: JSON.parse(data),
          });
        } catch {
          resolve({
            status: res.statusCode,
            data: data,
          });
        }
      });
    });

    req.on('error', reject);
    if (options.body) req.write(JSON.stringify(options.body));
    req.end();
  });
}

async function setBotDescription(token) {
  const description =
    'Sculptor of Your Body 💪\n\n' +
    'Персональные программы тренировок, план питания и онлайн-ведение.\n' +
    'Нажмите «Старт», чтобы открыть выбранную услугу и способы оплаты.';
  const shortDescription =
    'Программы тренировок, план питания и онлайн-ведение. Оплата через бота.';

  try {
    await makeRequest(`https://api.telegram.org/bot${token}/setMyDescription`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { description },
    });
    await makeRequest(`https://api.telegram.org/bot${token}/setMyShortDescription`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { short_description: shortDescription },
    });
    console.log('✅ Bot description updated!');
  } catch (error) {
    // Non-fatal: webhook is already set, description is cosmetic.
    console.warn('⚠️  Could not update bot description:', error.message);
  }
}

async function setupWebhook() {
  const token = process.env.TELEGRAM_BOT_TOKEN || '8639462645:AAGDSXmsFVSnnPI9JN6mqH7NWoar5-OoZ4U';

  if (!token) {
    console.log('⚠️  TELEGRAM_BOT_TOKEN not set. Skipping webhook setup.');
    process.exit(0);
  }

  console.log('🔧 Setting up Telegram webhook...');

  try {
    const webhookUrl = 'https://sculptor-of-your-body.vercel.app/api/telegram';

    const response = await makeRequest(
      `https://api.telegram.org/bot${token}/setWebhook`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: {
          url: webhookUrl,
          allowed_updates: ['message', 'callback_query'],
        },
      }
    );

    if (response.data.ok) {
      console.log('✅ Webhook setup successful!');
      console.log(`✅ Webhook URL: ${webhookUrl}`);

      // Bot description shown on the pre-Start screen ("What can this bot do?").
      // Telegram allows only ONE global description for everyone, so it is kept
      // neutral and covers all services instead of a single product.
      await setBotDescription(token);

      process.exit(0);
    } else {
      console.error('❌ Webhook setup failed:');
      console.error(response.data);
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Error setting up webhook:');
    console.error(error.message);
    process.exit(1);
  }
}

setupWebhook();
