# ⚡ Quick Setup (One Click)

## Option 1: GitHub Actions (Easiest)

1. Go to your GitHub repo → **Actions** tab
2. Click **"Setup Telegram Bot"** workflow on the left
3. Click **"Run workflow"** button
4. Fill in the form:
   - **vercel_token**: Get from https://vercel.com/account/tokens (create new token)
   - **project_id**: Get from https://vercel.com/dashboard → Settings
   - **team_id**: Leave empty (unless you have a team)
5. Click **"Run workflow"**
6. Wait for it to complete ✅

Bot will be active in 2-3 minutes!

---

## Option 2: Manual (If GitHub Actions doesn't work)

### Step 1: Add to Vercel Dashboard

1. Go to https://vercel.com/dashboard → **Sculptor-of-your-body** → **Settings**
2. Click **Environment Variables**
3. Add:
   - Name: `TELEGRAM_BOT_TOKEN`
   - Value: `8639462645:AAGDSXmsFVSnnPI9JN6mqH7NWoar5-OoZ4U`
4. Save (Vercel auto-deploys in 1-2 minutes)

### Step 2: Register Webhook

Open in browser:
```
https://sculptor-of-your-body.vercel.app/api/telegram/setup
```

You'll see: `{"success":true,"message":"Webhook set to..."}`

Done! ✅

---

## Verify It Works

Test: https://t.me/MK_sculptor_bot?start=product=program&lang=ru

Should show price in $17 USD + ₴ conversion
