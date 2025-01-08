import fs from "fs";
import path from "path";
import puppeteer from "puppeteer";
import type { Browser, Page } from "puppeteer";

interface ItemSkill {
  name: string;
  icon: string;
  url: string;
  stats?: SkillStat[];
  description?: string;
}

interface SkillStat {
  name: string;
  value: string;
}

interface ItemBase {
  name: string;
  icon: string;
  url: string;
  category: string;
  requirements?: { level?: number };
  grantedSkill?: ItemSkill;
  modifiers?: string[];
  description?: string;
  tabSource?: string;
}

interface ModifierTier {
  name: string;
  level: number;
  stats: string[];
}

interface ItemModifier {
  family: string;
  type: "prefix" | "suffix" | "socketable";
  tags: string[];
  tiers: ModifierTier[];
}

interface ItemCategory {
  name: string;
  url: string;
  items: ItemBase[];
  modifiers?: ItemModifier[];
}

interface ItemGroup {
  name: string;
  categories: string[];
}

const BASE_URL = "https://poe2db.tw/us";
const SCRAPE_TIMEOUT = 1000 * 60 * 30; // 30 minutes
const PAGE_LOAD_TIMEOUT = 30000;
const DELAY_BETWEEN_ACTIONS = 1000;

// Define item groups structure
const ITEM_GROUPS: ItemGroup[] = [
  { name: "Gems", categories: ["Skill_Gems", "Support_Gems", "Spirit_Gems"] },
  {
    name: "One Handed Weapons",
    categories: [
      "Claws",
      "Daggers",
      "Wands",
      "One_Hand_Swords",
      "One_Hand_Axes",
      "One_Hand_Maces",
      "Sceptres",
      "Spears",
      "Flails",
    ],
  },
  {
    name: "Two Handed Weapons",
    categories: [
      "Bows",
      "Staves",
      "Two_Hand_Swords",
      "Two_Hand_Axes",
      "Two_Hand_Maces",
      "Quarterstaves",
      "Crossbows",
      "Traps",
      "Fishing_Rods",
    ],
  },
  { name: "Off-hand", categories: ["Quivers", "Shields", "Foci"] },
  { name: "Armour", categories: ["Gloves", "Boots", "Body_Armours", "Helmets"] },
  { name: "Jewellery", categories: ["Amulets", "Rings", "Belts"] },
  { name: "Flasks", categories: ["Life_Flasks", "Mana_Flasks", "Charms"] },
  {
    name: "Currency",
    categories: ["Stackable_Currency", "Distilled_Emotions", "Essence", "Splinter", "Catalyst"],
  },
  { name: "Waystones", categories: ["Waystones", "Map_Fragments", "Misc_Map_Items"] },
  { name: "Jewels", categories: ["Jewels"] },
  {
    name: "Other",
    categories: [
      "Hideout",
      "Strongbox",
      "Expedition_Logbook",
      "Hideout_Doodads",
      "Relics",
      "Inscribed_Ultimatum",
      "Socketable",
      "Tablet",
      "Omen",
      "Trial_Coins",
      "Pinnacle_Keys",
    ],
  },
];

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
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

  page.on("console", (msg) => console.log("[PAGE LOG]", msg.text()));
  page.on("pageerror", (err) => console.error("[PAGE ERROR]", err));

  return page;
}

async function scrapeModifiersFromTab(page: Page, tabId: string): Promise<ItemModifier[]> {
  return page.evaluate((tabId) => {
    const modifiers: ItemModifier[] = [];
    const tabPane = document.querySelector(`#${tabId}.tab-pane.active.show`);
    if (!tabPane) return modifiers;

    const sections = Array.from(tabPane.querySelectorAll(".row.clearfix.mb-2 .col-lg-6"));

    function cleanModText(text: string): string {
      return text
        .replace(/\d{4}[a-z]+/g, "") // Remove ID prefixes
        .replace(/[a-z]+(?:damage|elemental|caster|critical|gem)[a-z]*/g, "") // Remove prefixes
        .replace(/^\d+\s+/, "") // Remove leading numbers
        .replace(/\s+\d+\s+/, " ") // Remove numbers between words
        .replace(/<span[^>]*>(.*?)<\/span>/g, "$1") // Extract span content
        .replace(/&ndash;/g, "–") // Fix dashes
        .replace(/\s+/g, " ") // Normalize spaces
        .trim();
    }

    function getBaseModName(text: string): string {
      const cleanText = cleanModText(text);
      const words = cleanText
        .split(" ")
        .filter(
          (word) =>
            !word.match(/^\d+$/) &&
            !word.match(/^\(.*\)$/) &&
            !word.includes("#") &&
            word !== "%" &&
            word.length > 0
        );
      return words.join(" ").trim();
    }

    function processModSection(section: Element, type: "prefix" | "suffix" | "socketable") {
      const modsByFamily = new Map<
        string,
        {
          tags: string[];
          tiers: ModifierTier[];
          baseText: string;
        }
      >();

      const modGroups = section.querySelectorAll(".mod-title.explicitMod");
      let currentFamily = "";

      modGroups.forEach((modGroup) => {
        const nameEl = modGroup.querySelector("[data-hover]");
        const levelEl = modGroup.querySelector(".badge.rounded-pill.bg-secondary");
        const tagsEls = Array.from(modGroup.querySelectorAll(".badge.bg-primary"));
        const tags = tagsEls.map((tag) => tag.textContent?.trim() || "").filter(Boolean);

        const fullText = Array.from(modGroup.childNodes)
          .map((node) => node.textContent?.trim() || "")
          .filter(Boolean)
          .join(" ");
        const cleanText = cleanModText(fullText);

        const stats: string[] = [];
        const ranges = cleanText.match(/\([^)]+\)/g) || [];
        if (ranges.length > 0) {
          stats.push(...ranges.map(cleanModText));
        }
        const lines = cleanText
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean);
        lines.forEach((line) => {
          const cleanLine = cleanModText(line);
          if (!stats.includes(cleanLine)) {
            stats.push(cleanLine);
          }
        });

        const isFamilyMember = modGroup.querySelector("hr.mod-same-family") !== null;

        if (!isFamilyMember && nameEl && levelEl) {
          const baseName = getBaseModName(cleanText);
          currentFamily = baseName;

          modsByFamily.set(currentFamily, {
            tags,
            tiers: [
              {
                name: cleanModText(nameEl.textContent?.trim() || ""),
                level: parseInt(levelEl.textContent || "0", 10),
                stats: stats.map(cleanModText),
              },
            ],
            baseText: cleanText,
          });
        } else if (currentFamily && nameEl && levelEl) {
          const family = modsByFamily.get(currentFamily);
          if (family) {
            family.tiers.push({
              name: cleanModText(nameEl.textContent?.trim() || ""),
              level: parseInt(levelEl.textContent || "0", 10),
              stats: stats.map(cleanModText),
            });
          }
        }
      });

      for (const [familyName, family] of modsByFamily) {
        modifiers.push({
          family: familyName,
          type,
          tags: family.tags,
          tiers: family.tiers.sort((a, b) => a.level - b.level),
        });
      }
    }

    // Process each section based on its header
    sections.forEach((section) => {
      const header = section.querySelector("h5, h6")?.textContent?.toLowerCase() || "";
      if (header.includes("prefix")) {
        processModSection(section, "prefix");
      } else if (header.includes("suffix")) {
        processModSection(section, "suffix");
      } else if (header.includes("socketable")) {
        processModSection(section, "socketable");
      }
    });

    return modifiers;
  }, tabId);
}

async function scrapeItemsFromTab(page: Page, tabId: string, tabName: string): Promise<ItemBase[]> {
  return page.evaluate(
    ({ tabId, categoryName }) => {
      const items: ItemBase[] = [];
      const seen = new Set<string>();
      const tabPane = document.querySelector(`#${tabId}.tab-pane.active.show`);
      if (!tabPane) return items;

      const itemElements = tabPane.querySelectorAll(".d-flex.border.rounded");

      itemElements.forEach((el) => {
        const linkEl = el.querySelector("a[data-hover]");
        const url = linkEl?.getAttribute("href") || "";
        const icon = el.querySelector("img")?.getAttribute("src") || "";
        const rawName =
          linkEl?.textContent?.trim() || url.split("/").pop()?.replace(/_/g, " ") || "";

        const reqText = el.querySelector(".requirements")?.textContent;
        let level: number | undefined;
        if (reqText) {
          const match = reqText.match(/Level (\d+)/);
          if (match) level = parseInt(match[1], 10);
        }

        // Handle potential distinct variations due to different granted skills
        const skillEl = el.querySelector(".implicitMod a");
        const skillIcon = el.querySelector(".implicitMod img");
        let grantedSkill: ItemSkill | undefined;
        let skillSuffix = "";
        if (skillEl) {
          const skillName = skillEl.textContent?.trim() || "";
          skillSuffix = ` (${skillName})`; // Use skill name in item key
          grantedSkill = {
            name: skillName,
            icon: skillIcon?.getAttribute("src") || "",
            url: skillEl.getAttribute("href") || "",
          };
        }

        // Build a unique key (name + url + skill suffix)
        const uniqueKey = `${rawName}${url}${skillSuffix}`;

        // Skip pushing if we already have the same key
        if (seen.has(uniqueKey)) return;
        seen.add(uniqueKey);

        const modifiers = Array.from(el.querySelectorAll(".explicitMod"))
          .map((mod) => mod.textContent?.trim())
          .filter((text): text is string => !!text);

        const descEl = el.querySelector(".description");
        const description = descEl?.textContent?.trim();

        items.push({
          name: rawName,
          icon,
          url,
          category: categoryName,
          requirements: level ? { level } : undefined,
          grantedSkill,
          modifiers,
          description,
          tabSource: categoryName,
        });
      });

      return items;
    },
    { tabId, categoryName: tabName }
  );
}

async function scrapeCategory(page: Page, categoryUrl: string): Promise<ItemCategory> {
  console.log(`Navigating to ${categoryUrl}...`);
  await page.goto(`${BASE_URL}${categoryUrl}`, {
    waitUntil: "networkidle0",
    timeout: PAGE_LOAD_TIMEOUT,
  });

  await Promise.race([
    page.waitForSelector(".nav-tabs", { timeout: PAGE_LOAD_TIMEOUT }),
    page.waitForSelector(".d-flex.border.rounded", { timeout: PAGE_LOAD_TIMEOUT }),
  ]);

  const hasTabs = await page.evaluate(() => !!document.querySelector(".nav-tabs"));
  let allItems: ItemBase[] = [];
  let modifiers: ItemModifier[] = [];

  if (hasTabs) {
    console.log("Found tabs, processing each tab...");
    const tabs = await page.evaluate(() => {
      return Array.from(document.querySelectorAll(".nav-tabs .nav-link")).map((link) => ({
        id: link.getAttribute("href")?.replace("#", "") || "",
        name: link.textContent?.trim() || "",
      }));
    });

    for (const tab of tabs) {
      if (!tab.id) continue;

      console.log(`Processing tab: ${tab.name}`);

      try {
        const tabSelector = `.nav-link[href="#${tab.id}"]`;
        await page.waitForSelector(tabSelector, { timeout: PAGE_LOAD_TIMEOUT });

        await Promise.all([
          page.click(tabSelector),
          page.waitForSelector(`#${tab.id}.tab-pane.active.show`, { timeout: PAGE_LOAD_TIMEOUT }),
        ]);

        await delay(DELAY_BETWEEN_ACTIONS);

        if (tab.name === "Modifiers Calc") {
          modifiers = await scrapeModifiersFromTab(page, tab.id);
          console.log(`Found ${modifiers.length} modifiers`);
        } else {
          // Skip tabs that don't contain actual items
          if (tab.name.match(/Drop Level|Tier Level|Gemcutting/)) {
            console.log(`Skipping tab: ${tab.name}`);
            continue;
          }

          const tabItems = await scrapeItemsFromTab(page, tab.id, tab.name);
          if (tabItems.length > 0) {
            allItems = allItems.concat(tabItems);
            console.log(`Found ${tabItems.length} items in tab ${tab.name}`);
          }
        }
      } catch (error) {
        console.error(`Error processing tab ${tab.name}:`, error);
        continue;
      }
    }
  } else {
    console.log("No tabs found, processing main content...");
    allItems = await scrapeItemsFromTab(page, "main", categoryUrl.split("/").pop() || "");
  }

  return {
    name: categoryUrl.split("/").pop()?.replace(/_/g, " ") || "",
    url: categoryUrl,
    items: allItems,
    modifiers,
  };
}

async function scrapeAllItems() {
  console.log("Starting item scraper...");
  const browser = await createBrowser();
  const page = await createPage(browser);

  const timeout = setTimeout(() => {
    console.error("Scraping timed out");
    process.exit(1);
  }, SCRAPE_TIMEOUT);

  try {
    const allData: Record<string, Record<string, ItemCategory>> = {};

    for (const group of ITEM_GROUPS) {
      console.log(`\nProcessing group: ${group.name}`);
      allData[group.name] = {};

      for (const category of group.categories) {
        try {
          console.log(`Scraping category: ${category}`);
          const categoryData = await scrapeCategory(page, `/${category}`);
          allData[group.name][category] = categoryData;

          // Add delay between categories to avoid rate limiting
          await delay(DELAY_BETWEEN_ACTIONS * 2);
        } catch (error) {
          console.error(`Error scraping category ${category}:`, error);
          continue;
        }
      }
    }

    const outDir = path.join(__dirname, "..", "public", "data");
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }

    const outPath = path.join(outDir, "items.json");
    await fs.promises.writeFile(outPath, JSON.stringify(allData, null, 2));
    console.log(`\nSaved all item data to ${outPath}`);
  } catch (error) {
    console.error("Error during scraping:", error);
    process.exit(1);
  } finally {
    clearTimeout(timeout);
    await browser.close();
  }
}

scrapeAllItems();
