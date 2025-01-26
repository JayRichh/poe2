import fs from "fs";
import path from "path";
import type { Browser, Page } from "puppeteer";
import puppeteer from "puppeteer";

interface LadderEntry {
  rank: number;
  account: string;
  character: string;
  class: string;
  level: number;
  experience: number;
}

interface ClassDistribution {
  className: string;
  count: number;
  percentage: number;
}

interface LadderStats {
  timestamp: string;
  ladders: {
    [key: string]: {
      total: number;
      distribution: ClassDistribution[];
    };
  };
  overall: {
    total: number;
    distribution: ClassDistribution[];
  };
}

const LADDER_URLS = {
  Standard: "https://pathofexile2.com/ladder/Standard",
  Hardcore: "https://pathofexile2.com/ladder/Hardcore",
  SSF: "https://pathofexile2.com/ladder/Solo%2520Self-Found",
  "HC SSF": "https://pathofexile2.com/ladder/Hardcore%2520SSF",
};

const MAX_RETRIES = 3;
const RETRY_DELAY = 2000;

async function retry<T>(fn: () => Promise<T>, retries = MAX_RETRIES): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (retries > 0) {
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
      return retry(fn, retries - 1);
    }
    throw error;
  }
}

async function setupPage(browser: Browser): Promise<Page> {
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 800 });
  return page;
}

async function scrapeLadder(page: Page, url: string): Promise<LadderEntry[]> {
  const entries: LadderEntry[] = [];

  try {
    await retry(async () => {
      await page.goto(url, {
        waitUntil: "networkidle0",
        timeout: 30000,
      });
    });

    const rows = await page.evaluate(() => {
      const tableRows = document.querySelectorAll(".league-ladder__entry");
      return Array.from(tableRows).map((row) => {
        const cells = row.querySelectorAll("td");
        return {
          rank: parseInt(cells[0]?.textContent || "0", 10),
          account: cells[1]?.querySelector("a")?.textContent?.trim() || "",
          character: cells[2]?.textContent?.trim() || "",
          class: cells[3]?.textContent?.trim() || "",
          level: parseInt(cells[4]?.textContent || "0", 10),
          experience: parseInt(cells[5]?.textContent?.replace(/,/g, "") || "0", 10),
        };
      });
    });

    entries.push(...rows);
  } catch (error) {
    console.error(`Error scraping ladder ${url}:`, error);
  }

  return entries;
}

function calculateDistribution(entries: LadderEntry[]): ClassDistribution[] {
  const classCounts = entries.reduce((acc, entry) => {
    acc[entry.class] = (acc[entry.class] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const total = entries.length;
  const distribution = Object.entries(classCounts)
    .map(([className, count]) => ({
      className,
      count,
      percentage: Math.round(((count / total) * 100) * 10) / 10,
    }))
    .sort((a, b) => b.count - a.count);

  return distribution;
}

export async function scrapeLadderStats(): Promise<LadderStats> {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await setupPage(browser);

  try {
    const ladderData: { [key: string]: LadderEntry[] } = {};
    for (const [name, url] of Object.entries(LADDER_URLS)) {
      console.log(`Scraping ${name} ladder...`);
      ladderData[name] = await scrapeLadder(page, url);
    }

    const allEntries = Object.values(ladderData).flat();
    const stats: LadderStats = {
      timestamp: new Date().toISOString(),
      ladders: {},
      overall: {
        total: allEntries.length,
        distribution: calculateDistribution(allEntries),
      },
    };

    for (const [name, entries] of Object.entries(ladderData)) {
      stats.ladders[name] = {
        total: entries.length,
        distribution: calculateDistribution(entries),
      };
    }

    return stats;
  } finally {
    await browser.close();
  }
}

export async function saveLadderStats(stats: LadderStats): Promise<void> {
  const projectRoot = path.resolve(__dirname, "..");
  const dataDir = path.join(projectRoot, "public", "data");

  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const statsPath = path.join(dataDir, "ladder-stats.json");
  await fs.promises.writeFile(statsPath, JSON.stringify(stats, null, 2));
}

export type { LadderEntry, LadderStats, ClassDistribution };
