const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    executablePath: '/opt/pw-browsers/chromium',
    headless: true,
  });
  
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/ru', { waitUntil: 'networkidle' });
  await page.screenshot({ path: '/tmp/screenshot.png', fullPage: true });
  
  await browser.close();
  console.log('Screenshot saved');
})();
