import fs from "fs";
import path from "path";
import puppeteer from "puppeteer";
import type { Browser, Page } from "puppeteer";

interface ItemSkill {
  name: string;
  icon: string;
  url: string;
}

interface ItemBase {
  name: string;
  icon: string;
  url: string;
  category: string;
  requirements?: { level?: number };
  grantedSkill?: ItemSkill;
  modifiers?: string[];
  tabSource?: string;
}

interface ModifierTier {
  name: string;
  level: number;
  stats: string[];
}

interface ItemModifier {
  family: string;
  type: "prefix" | "suffix";
  tags: string[];
  tiers: ModifierTier[];
}

interface ItemCategory {
  name: string;
  url: string;
  items: ItemBase[];
  modifiers?: ItemModifier[];
}

const BASE_URL = "https://poe2db.tw/us";
const STAVES_URL = "/Staves";
const SCRAPE_TIMEOUT = 1000 * 60 * 5; // 5 minutes
const PAGE_LOAD_TIMEOUT = 30000;
const DELAY_BETWEEN_ACTIONS = 1000;

async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function createBrowser(): Promise<Browser> {
  return puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
}

async function createPage(browser: Browser): Promise<Page> {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  
  // Add console logging
  page.on("console", msg => console.log("[PAGE LOG]", msg.text()));
  page.on("pageerror", err => console.error("[PAGE ERROR]", err));
  
  return page;
}

async function scrapeModifiersFromTab(page: Page, tabId: string): Promise<ItemModifier[]> {
  return page.evaluate((tabId) => {
    const modifiers: ItemModifier[] = [];
    const tabPane = document.querySelector(`#${tabId}.tab-pane.active.show`);
    if (!tabPane) return modifiers;

    // Process prefixes and suffixes
    const prefixSection = tabPane.querySelector('.row.clearfix.mb-2 .col-lg-6:first-child');
    const suffixSection = tabPane.querySelector('.row.clearfix.mb-2 .col-lg-6:last-child');

    function cleanModText(text: string): string {
      return text
        .replace(/\d{4}[a-z]+/g, '') // Remove ID prefixes
        .replace(/[a-z]+(?:damage|elemental|caster|critical|gem)[a-z]*/g, '') // Remove prefixes
        .replace(/^\d+\s+/, '') // Remove leading numbers
        .replace(/\s+\d+\s+/, ' ') // Remove numbers between words
        .replace(/<span[^>]*>(.*?)<\/span>/g, '$1') // Extract span content
        .replace(/&ndash;/g, '–') // Fix dashes
        .replace(/\s+/g, ' ') // Normalize spaces
        .trim();
    }

    function getBaseModName(text: string): string {
      const cleanText = cleanModText(text);
      const words = cleanText.split(' ').filter(word => 
        !word.match(/^\d+$/) && 
        !word.match(/^\(.*\)$/) && 
        !word.includes('#') && 
        word !== '%' && 
        word.length > 0
      );
      return words.join(' ').trim();
    }

    function processModSection(section: Element | null, type: "prefix" | "suffix") {
      if (!section) return;
      
      const modsByFamily = new Map<string, {
        tags: string[];
        tiers: ModifierTier[];
        baseText: string;
      }>();

      const modGroups = section.querySelectorAll('.mod-title.explicitMod');
      let currentFamily = '';
      
      modGroups.forEach(modGroup => {
        const nameEl = modGroup.querySelector('[data-hover]');
        const levelEl = modGroup.querySelector('.badge.rounded-pill.bg-secondary');
        const tagsEls = Array.from(modGroup.querySelectorAll('.badge.bg-primary'));
        const tags = tagsEls.map(tag => tag.textContent?.trim() || "").filter(Boolean);
        
        // Get full mod text and clean it
        const fullText = Array.from(modGroup.childNodes)
          .map(node => node.textContent?.trim() || '')
          .filter(Boolean)
          .join(' ');
        const cleanText = cleanModText(fullText);
        
        // Extract stat ranges and values
        const stats: string[] = [];
        const ranges = cleanText.match(/\([^)]+\)/g) || [];
        if (ranges.length > 0) {
          stats.push(...ranges.map(cleanModText));
        }
        const lines = cleanText.split('\n').map(line => line.trim()).filter(Boolean);
        lines.forEach(line => {
          const cleanLine = cleanModText(line);
          if (!stats.includes(cleanLine)) {
            stats.push(cleanLine);
          }
        });

        // Check if this is part of a family
        const isFamilyMember = modGroup.querySelector('hr.mod-same-family') !== null;
        
        if (!isFamilyMember && nameEl && levelEl) {
          // Start new family
          const baseName = getBaseModName(cleanText);
          currentFamily = baseName;
          
          modsByFamily.set(currentFamily, {
            tags,
            tiers: [{
              name: cleanModText(nameEl.textContent?.trim() || ""),
              level: parseInt(levelEl.textContent || "0", 10),
              stats: stats.map(cleanModText)
            }],
            baseText: cleanText
          });
        } else if (currentFamily && nameEl && levelEl) {
          // Add to existing family
          const family = modsByFamily.get(currentFamily);
          if (family) {
            family.tiers.push({
              name: cleanModText(nameEl.textContent?.trim() || ""),
              level: parseInt(levelEl.textContent || "0", 10),
              stats: stats.map(cleanModText)
            });
          }
        }
      });

      // Add modifiers to result array
      for (const [familyName, family] of modsByFamily) {
        modifiers.push({
          family: familyName,
          type,
          tags: family.tags,
          tiers: family.tiers.sort((a, b) => a.level - b.level)
        });
      }
    }

    processModSection(prefixSection, "prefix");
    processModSection(suffixSection, "suffix");

    console.log(`Found ${modifiers.length} modifier families with their tiers and stats`);
    return modifiers;
  }, tabId);
}

async function scrapeItemsFromTab(page: Page, tabId: string, tabName: string): Promise<ItemBase[]> {
  return page.evaluate(({ tabId, categoryName }) => {
    const items: ItemBase[] = [];
    const tabPane = document.querySelector(`#${tabId}.tab-pane.active.show`);
    if (!tabPane) return items;

    const itemElements = tabPane.querySelectorAll(".d-flex.border.rounded");
    
    itemElements.forEach(el => {
      // Basic item info
      const linkEl = el.querySelector("a[data-hover]");
      const url = linkEl?.getAttribute("href") || "";
      const icon = el.querySelector("img")?.getAttribute("src") || "";
      // Get name from URL by replacing underscores with spaces
      const name = url.split('/').pop()?.replace(/_/g, ' ') || "";

      // Requirements
      const reqText = el.querySelector(".requirements")?.textContent;
      let level: number | undefined;
      if (reqText) {
        const match = reqText.match(/Level (\d+)/);
        if (match) level = parseInt(match[1], 10);
      }

      // Granted skill
      const skillEl = el.querySelector(".implicitMod a");
      const skillIcon = el.querySelector(".implicitMod img");
      let grantedSkill: ItemSkill | undefined;
      if (skillEl) {
        grantedSkill = {
          name: skillEl.textContent?.trim() || "",
          icon: skillIcon?.getAttribute("src") || "",
          url: skillEl.getAttribute("href") || "",
        };
      }

      // Modifiers
      const modifiers = Array.from(el.querySelectorAll(".explicitMod"))
        .map(mod => mod.textContent?.trim())
        .filter((text): text is string => !!text);

      items.push({
        name,
        icon,
        url,
        category: categoryName,
        requirements: level ? { level } : undefined,
        grantedSkill,
        modifiers,
        tabSource: categoryName,
      });
    });

    return items;
  }, { tabId, categoryName: tabName });
}

async function scrapeStaves(page: Page): Promise<ItemCategory> {
  try {
    console.log("Navigating to staves page...");
    await page.goto(`${BASE_URL}${STAVES_URL}`, {
      waitUntil: "networkidle0",
      timeout: PAGE_LOAD_TIMEOUT,
    });

    // Wait for either tabs or direct content
    await Promise.race([
      page.waitForSelector(".nav-tabs", { timeout: PAGE_LOAD_TIMEOUT }),
      page.waitForSelector(".d-flex.border.rounded", { timeout: PAGE_LOAD_TIMEOUT }),
    ]);

    // Check if we have tabs
    const hasTabs = await page.evaluate(() => !!document.querySelector(".nav-tabs"));
    let allItems: ItemBase[] = [];
    let modifiers: ItemModifier[] = [];

    if (hasTabs) {
      console.log("Found tabs, processing each tab...");
      // Get all tab information
      const tabs = await page.evaluate(() => {
        return Array.from(document.querySelectorAll(".nav-tabs .nav-link")).map(link => ({
          id: link.getAttribute("href")?.replace("#", "") || "",
          name: link.textContent?.trim() || "",
        }));
      });

      // Process each tab
      for (const tab of tabs) {
        if (!tab.id) continue;
        
        console.log(`Processing tab: ${tab.name}`);
        
        try {
          // Find the tab element and ensure it exists
          const tabSelector = `.nav-link[href="#${tab.id}"]`;
          await page.waitForSelector(tabSelector, { timeout: PAGE_LOAD_TIMEOUT });
          
          // Click tab and wait for content
          await Promise.all([
            page.click(tabSelector),
            page.waitForSelector(`#${tab.id}.tab-pane.active.show`, { timeout: PAGE_LOAD_TIMEOUT })
          ]);
          
          await delay(DELAY_BETWEEN_ACTIONS);
          
          if (tab.name === "Modifiers Calc") {
            modifiers = await scrapeModifiersFromTab(page, tab.id);
            console.log(`Found ${modifiers.length} modifiers`);
          } else {
            const tabItems = await scrapeItemsFromTab(page, tab.id, tab.name);
            allItems = allItems.concat(tabItems);
            console.log(`Found ${tabItems.length} items in tab ${tab.name}`);
          }
        } catch (error) {
          console.error(`Error processing tab ${tab.name}:`, error);
          continue;
        }
      }
    } else {
      console.log("No tabs found, processing main content...");
      allItems = await scrapeItemsFromTab(page, "main", "Staves");
    }

    return {
      name: "Staves",
      url: STAVES_URL,
      items: allItems,
      modifiers,
    };
  } catch (error) {
    console.error("Error scraping staves:", error);
    throw error;
  }
}

async function saveItemsData(data: ItemCategory) {
  const outDir = path.join(__dirname, "..", "public", "data");
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  
  const outPath = path.join(outDir, "staves.json");
  await fs.promises.writeFile(outPath, JSON.stringify(data, null, 2));
  console.log(`Saved ${data.items.length} items and ${data.modifiers?.length || 0} modifiers to ${outPath}`);
}

async function main() {
  console.log("Starting staves scraper...");
  const browser = await createBrowser();
  const page = await createPage(browser);
  
  const timeout = setTimeout(() => {
    console.error("Scraping timed out");
    process.exit(1);
  }, SCRAPE_TIMEOUT);

  try {
    const stavesData = await scrapeStaves(page);
    
    if (stavesData.items.length === 0) {
      console.error("No items found. This might indicate an issue with the page structure or selectors.");
      process.exit(1);
    }

    console.log(`Successfully scraped ${stavesData.items.length} staves items and ${stavesData.modifiers?.length || 0} modifiers`);
    await saveItemsData(stavesData);
  } catch (error) {
    console.error("Error during scraping:", error);
    process.exit(1);
  } finally {
    clearTimeout(timeout);
    await browser.close();
  }
}

main();
