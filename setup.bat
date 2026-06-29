@echo off
cls
echo 🤖 Telegram Bot Setup
echo.
echo This will:
echo 1. Authenticate with Vercel
echo 2. Add TELEGRAM_BOT_TOKEN environment variable
echo 3. Wait for deployment
echo 4. Register Telegram webhook
echo.

REM Check if vercel is installed
where vercel >nul 2>nul
if %errorlevel% neq 0 (
    echo 📦 Installing Vercel CLI...
    call npm install -g vercel
)

echo.
echo 🔐 Logging into Vercel...
echo A browser window will open. Please login to your Vercel account.
echo.

call vercel link --yes

echo.
echo 📝 Adding TELEGRAM_BOT_TOKEN...
call vercel env add TELEGRAM_BOT_TOKEN 8639462645:AAGDSXmsFVSnnPI9JN6mqH7NWoar5-OoZ4U

echo.
echo ⏳ Waiting 30 seconds for deployment...
timeout /t 30 /nobreak

echo.
echo 🔗 Registering webhook...
powershell -Command "$response = Invoke-WebRequest -Uri 'https://sculptor-of-your-body.vercel.app/api/telegram/setup' -UseBasicParsing; if ($response.Content -match '\"success\":true') { Write-Host '✅ Success!'; Write-Host ''; Write-Host '🎉 Bot is now active!'; Write-Host ''; Write-Host 'Test: https://t.me/MK_sculptor_bot?start=product=program&lang=ru' } else { Write-Host '⚠️ Webhook response:'; Write-Host $response.Content }"

echo.
echo Done! 🚀
pause
