import fs from 'fs';
import path from 'path';
import { itemsService } from '../src/services/items-service';
import type { EquipmentSlot } from '../src/lib/supabase/types';

const IMAGES_DIR = path.join(process.cwd(), 'public/items');
const URL_MAPPING_PATH = path.join(process.cwd(), 'public/data/item-image-mapping.json');

const headers = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
  'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.9',
  'Cache-Control': 'no-cache',
  'Pragma': 'no-cache',
  'Referer': 'https://poe2db.tw/'
};

async function downloadImage(url: string, filename: string): Promise<boolean> {
  try {
    const response = await fetch(url, { headers });
    if (!response.ok) {
      console.error(`Failed to download ${url}: ${response.status} ${response.statusText}`);
      return false;
    }

    const buffer = await response.arrayBuffer();
    fs.writeFileSync(filename, Buffer.from(buffer));
    return true;
  } catch (error) {
    console.error(`Error downloading ${url}:`, error);
    return false;
  }
}

async function main() {
  if (!fs.existsSync(IMAGES_DIR)) {
    fs.mkdirSync(IMAGES_DIR, { recursive: true });
  }

  const ITEMS_DATA_PATH = path.join(process.cwd(), 'public/data/items.json');
  const uniqueUrls = new Set<string>();
  const urlMapping: Record<string, string> = {};

  // Load existing mapping if it exists
  if (fs.existsSync(URL_MAPPING_PATH)) {
    const existingMapping = JSON.parse(fs.readFileSync(URL_MAPPING_PATH, 'utf-8'));
    Object.assign(urlMapping, existingMapping);
  }

  // Read and parse items data
  const itemsData = JSON.parse(fs.readFileSync(ITEMS_DATA_PATH, 'utf-8')) as Record<string, Record<string, { items: Array<{ icon?: string }> }>>;

  // Collect all unique image URLs
  for (const categoryGroup of Object.values(itemsData)) {
    for (const category of Object.values(categoryGroup)) {
      const items = category.items || [];
      for (const item of items) {
        if (item.icon && item.icon.includes('cdn.poe2db.tw')) {
          uniqueUrls.add(item.icon);
        }
      }
    }
  }

  console.log(`Found ${uniqueUrls.size} unique image URLs to process`);

  let processed = 0;
  for (const url of uniqueUrls) {
    const urlHash = Buffer.from(url).toString('base64url');
    const ext = path.extname(url) || '.webp';
    const filename = `${urlHash}${ext}`;
    const localPath = path.join(IMAGES_DIR, filename);

    if (!fs.existsSync(localPath)) {
      const success = await downloadImage(url, localPath);
      if (success) {
        urlMapping[url] = `/items/${filename}`;
        console.log(`Downloaded ${++processed}/${uniqueUrls.size}: ${url}`);
      }
    } else {
      urlMapping[url] = `/items/${filename}`;
      console.log(`Skipped existing ${++processed}/${uniqueUrls.size}: ${url}`);
    }

    // Save mapping after each file to preserve progress
    fs.writeFileSync(URL_MAPPING_PATH, JSON.stringify(urlMapping, null, 2));
  }

  console.log('Download complete. URL mapping saved to:', URL_MAPPING_PATH);
}

main().catch(console.error);
