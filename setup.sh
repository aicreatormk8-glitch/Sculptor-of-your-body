#!/bin/bash

echo "🤖 Telegram Bot Setup"
echo ""
echo "This will:"
echo "1. Authenticate with Vercel"
echo "2. Add TELEGRAM_BOT_TOKEN environment variable"
echo "3. Wait for deployment"
echo "4. Register Telegram webhook"
echo ""

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

echo ""
echo "🔐 Logging into Vercel..."
echo "A browser window will open. Please login to your Vercel account."
echo ""

vercel link --yes

echo ""
echo "📝 Adding TELEGRAM_BOT_TOKEN..."
vercel env add TELEGRAM_BOT_TOKEN 8639462645:AAGDSXmsFVSnnPI9JN6mqH7NWoar5-OoZ4U

echo ""
echo "⏳ Waiting 30 seconds for deployment..."
sleep 30

echo ""
echo "🔗 Registering webhook..."
WEBHOOK_URL="https://sculptor-of-your-body.vercel.app/api/telegram/setup"
RESPONSE=$(curl -s "$WEBHOOK_URL")

if echo "$RESPONSE" | grep -q '"success":true'; then
    echo "✅ Success!"
    echo ""
    echo "🎉 Bot is now active!"
    echo ""
    echo "Test: https://t.me/MK_sculptor_bot?start=product=program&lang=ru"
else
    echo "⚠️ Webhook setup response:"
    echo "$RESPONSE"
fi

echo ""
echo "Done! 🚀"
