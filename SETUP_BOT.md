# 🤖 Telegram Bot Automatic Setup

## Quick Setup (one command)

```bash
node scripts/setup-telegram-bot.js
```

This will:
1. Add `TELEGRAM_BOT_TOKEN` to Vercel environment
2. Wait for deployment
3. Register Telegram webhook
4. Activate the bot

## What you need

### Option 1: Use the script (recommended)

The script will ask for:

1. **Vercel API Token**
   - Go to https://vercel.com/account/tokens
   - Create new token (any name, e.g., "Bot Setup")
   - Copy the token

2. **Project ID**
   - Go to https://vercel.com/dashboard
   - Select `Sculptor-of-your-body`
   - URL will be like: `vercel.com/... /sculptor-of-your-body-xxx`
   - Open project settings → find **Project ID**

3. **Team ID** (optional)
   - Only if you're using Vercel Team
   - Leave empty for personal account

### Option 2: Manual setup (if script fails)

1. Add env var to Vercel:
   - https://vercel.com/dashboard → Settings → Environment Variables
   - Add: `TELEGRAM_BOT_TOKEN` = `8639462645:AAGDSXmsFVSnnPI9JN6mqH7NWoar5-OoZ4U`

2. Wait 3 minutes for deploy

3. Open in browser:
   ```
   https://sculptor-of-your-body.vercel.app/api/telegram/setup
   ```

## ✅ How to verify it works

Send `/start` to @MK_sculptor_bot → should show correct price ($17/$50/$120 in USD and ₴)

## 🐛 Troubleshooting

**"Invalid token"** → Check token at https://vercel.com/account/tokens

**"Project not found"** → Verify Project ID in Vercel dashboard settings

**Bot shows old price** → Wait 5 minutes for Vercel deployment to complete
