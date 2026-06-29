#!/usr/bin/env node

const https = require('https');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion(question) {
  return new Promise(resolve => {
    rl.question(question, answer => {
      resolve(answer);
    });
  });
}

function makeRequest(url, options, data) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, options, res => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve({
            status: res.statusCode,
            body: JSON.parse(body),
          });
        } catch {
          resolve({
            status: res.statusCode,
            body: body,
          });
        }
      });
    });

    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

async function main() {
  console.log('🤖 Telegram Bot Setup for Vercel\n');

  const vercelToken = await askQuestion('Enter your Vercel API Token: ');
  const projectId = await askQuestion('Enter your Vercel Project ID (from https://vercel.com/dashboard): ');
  const teamId = await askQuestion('Enter your Vercel Team ID (or leave empty if personal): ');

  if (!vercelToken || !projectId) {
    console.error('❌ Token and Project ID are required');
    process.exit(1);
  }

  console.log('\n⏳ Setting up environment variables...\n');

  try {
    // Add environment variable
    const envUrl = `https://api.vercel.com/v9/projects/${projectId}/env${teamId ? '?teamId=' + teamId : ''}`;

    const envResponse = await makeRequest(
      envUrl,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${vercelToken}`,
          'Content-Type': 'application/json',
        },
      },
      {
        key: 'TELEGRAM_BOT_TOKEN',
        value: '8639462645:AAGDSXmsFVSnnPI9JN6mqH7NWoar5-OoZ4U',
        target: ['production'],
      }
    );

    if (envResponse.status === 201) {
      console.log('✅ Environment variable added successfully!\n');
    } else if (envResponse.status === 200) {
      console.log('✅ Environment variable updated!\n');
    } else {
      console.error('❌ Failed to add environment variable:', envResponse);
      process.exit(1);
    }

    console.log('⏳ Waiting for deployment (30 seconds)...\n');
    await new Promise(resolve => setTimeout(resolve, 30000));

    console.log('⏳ Setting up Telegram webhook...\n');

    const webhookUrl = 'https://sculptor-of-your-body.vercel.app/api/telegram/setup';
    const webhookResponse = await makeRequest(webhookUrl, {});

    if (webhookResponse.status === 200 && webhookResponse.body.success) {
      console.log('✅ Webhook registered successfully!\n');
      console.log('🎉 Setup complete! Bot is now active.\n');
      console.log('Test the bot: https://t.me/MK_sculptor_bot?start=product=program&lang=ru');
    } else {
      console.error('❌ Failed to setup webhook:', webhookResponse);
      process.exit(1);
    }

    rl.close();
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
