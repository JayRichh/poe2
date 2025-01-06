import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';
import currencies from '../src/lib/currencies/currencies.json';

async function scrapeCurrencyImages() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 800 });
  
  const imagesDir = path.join(process.cwd(), 'public', 'currencies');
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }

  for (const currency of currencies) {
    if (!currency.currency_url) continue;

    try {
      console.log(`Processing ${currency.name}...`);
      await page.goto(currency.currency_url, { waitUntil: 'networkidle0' });

      // Find and screenshot the currency image
      const element = await page.$('.wiki-content img');
      if (!element) {
        console.log(`No image found for ${currency.name}`);
        continue;
      }

      const filename = currency.name.toLowerCase().replace(/[^a-z0-9]/g, '_') + '.png';
      const filepath = path.join(imagesDir, filename);

      // Take a screenshot of just the image element
      await element.screenshot({
        path: filepath,
        omitBackground: true
      });

      // Update the currency.json entry
      currency.image_url = `/currencies/${filename}`;
      console.log(`Captured ${currency.name} image`);

    } catch (error) {
      console.error(`Error processing ${currency.name}:`, error);
    }

    // Add a small delay between requests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  await browser.close();

  // Update currencies.json with new local image paths
  fs.writeFileSync(
    path.join(process.cwd(), 'src', 'lib', 'currencies', 'currencies.json'),
    JSON.stringify(currencies, null, 2)
  );
}

scrapeCurrencyImages().catch(console.error);
