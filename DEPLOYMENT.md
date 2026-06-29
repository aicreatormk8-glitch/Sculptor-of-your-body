# Deployment Guide

## Telegram Bot Setup (Free on Vercel)

### ⚡ Quick Setup (2 steps)

#### Step 1: Add Environment Variable to Vercel

1. Go to https://vercel.com/dashboard
2. Select project `Sculptor-of-your-body`
3. Click **Settings** → **Environment Variables**
4. Click **+ Add**
5. Fill in:
   - Name: `TELEGRAM_BOT_TOKEN`
   - Value: `8639462645:AAGDSXmsFVSnnPI9JN6mqH7NWoar5-OoZ4U`
6. Select **Environments**: Check "Production"
7. Click **Save**
8. Vercel will auto-redeploy (wait 2-3 minutes)

#### Step 2: Register Webhook

After Vercel redeploys, open in browser:
```
https://sculptor-of-your-body.vercel.app/api/telegram/setup
```

You should see:
```json
{
  "success": true,
  "message": "Webhook set to https://sculptor-of-your-body.vercel.app/api/telegram"
}
```

### ✅ Done!

Bot is now live with:
- ✓ Correct prices ($17/$50/$120)
- ✓ USD/UAH conversion
- ✓ Payment processing
- ✓ Telegram channel redirect

### 🔍 Status Check

Open: https://sculptor-of-your-body.vercel.app/api/telegram

Should return: `{"message":"Telegram bot webhook is running","status":"active"}`

### 💡 How it works

1. User clicks "Buy" → Telegram bot link
2. Bot shows payment details in USD and ₴
3. User clicks "Payment confirmed"
4. Bot sends link to private channel
5. For other services → redirects to owner

### 🚀 What's included

- ✓ Telegram webhook API route
- ✓ Exchange rate auto-fetch
- ✓ Multi-language support (RU/EN/UK)
- ✓ Payment confirmation flow
- ✓ Zero hosting cost (free Vercel tier)
