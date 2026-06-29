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

async function setupWebhook() {
  const token = process.env.TELEGRAM_BOT_TOKEN;

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
