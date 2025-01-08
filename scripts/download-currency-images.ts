import fs from "fs";
import https from "https";
import path from "path";

import currencies from "../src/lib/currencies/currencies.json";

const downloadImage = (url: string, filepath: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!url) {
      console.log(`Skipping empty URL for ${filepath}`);
      resolve();
      return;
    }

    https
      .get(url, (response) => {
        if (response.statusCode === 200) {
          const fileStream = fs.createWriteStream(filepath);
          response.pipe(fileStream);
          fileStream.on("finish", () => {
            fileStream.close();
            resolve();
          });
        } else {
          reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
        }
      })
      .on("error", reject);
  });
};

async function downloadCurrencyImages() {
  const imagesDir = path.join(process.cwd(), "public", "currencies");

  // Create directory if it doesn't exist
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }

  for (const currency of currencies) {
    if (!currency.image_url) continue;

    const filename = currency.name.toLowerCase().replace(/[^a-z0-9]/g, "_") + ".png";
    const filepath = path.join(imagesDir, filename);

    try {
      await downloadImage(currency.image_url, filepath);
      console.log(`Downloaded ${currency.name} image`);
    } catch (error) {
      console.error(`Error downloading ${currency.name} image:`, error);
    }
  }
}

downloadCurrencyImages().catch(console.error);
