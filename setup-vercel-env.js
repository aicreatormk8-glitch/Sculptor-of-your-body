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
      resolve(answer.trim());
    });
  });
}

function makeHttpsRequest(url, method, headers, body) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, { method, headers }, res => {
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
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function main() {
  console.clear();
  console.log('╔════════════════════════════════════════╗');
  console.log('║  🤖 Telegram Bot Setup for Vercel    ║');
  console.log('╚════════════════════════════════════════╝\n');

  const token = await askQuestion('📝 Enter your Vercel API Token: ');
  const projectId = await askQuestion('🆔 Enter your Project ID: ');
  const teamId = await askQuestion('👥 Enter your Team ID (or press Enter to skip): ');

  if (!token || !projectId) {
    console.error('\n❌ Token and Project ID are required!\n');
    process.exit(1);
  }

  console.log('\n⏳ Adding environment variable...\n');

  try {
    const url = `https://api.vercel.com/v9/projects/${projectId}/env${teamId ? '?teamId=' + teamId : ''}`;

    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    const body = {
      key: 'TELEGRAM_BOT_TOKEN',
      value: '8639462645:AAGDSXmsFVSnnPI9JN6mqH7NWoar5-OoZ4U',
      target: ['production', 'preview'],
    };

    const response = await makeHttpsRequest(url, 'POST', headers, body);

    if (response.status === 201 || response.status === 200) {
      console.log('✅ Environment variable added!\n');
      console.log('⏳ Waiting 30 seconds for Vercel to deploy...\n');

      // Wait for deployment
      for (let i = 30; i > 0; i--) {
        process.stdout.write(`⏳ ${i}s remaining...\r`);
        await new Promise(r => setTimeout(r, 1000));
      }

      console.log('\n🔗 Registering Telegram webhook...\n');

      const webhookUrl = 'https://sculptor-of-your-body.vercel.app/api/telegram/setup';
      const webhookResponse = await makeHttpsRequest(webhookUrl, 'GET', {});

      if (webhookResponse.status === 200 && webhookResponse.data.success) {
        console.log('✅ Webhook registered successfully!\n');
        console.log('╔════════════════════════════════════════╗');
        console.log('║  🎉 Setup Complete!                  ║');
        console.log('╚════════════════════════════════════════╝\n');
        console.log('✨ Bot is now active with correct prices!\n');
        console.log('🧪 Test it: https://t.me/MK_sculptor_bot?start=product=program&lang=ru\n');
      } else {
        console.log('⚠️  Webhook registration response:');
        console.log(JSON.stringify(webhookResponse, null, 2));
      }
    } else {
      console.error('❌ Failed to add environment variable:');
      console.error(JSON.stringify(response, null, 2));

      if (response.data?.error?.message) {
        console.error('\n' + response.data.error.message);
      }

      process.exit(1);
    }

    rl.close();
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

main().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
