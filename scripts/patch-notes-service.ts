import fs from "fs";
import path from "path";
import type { Browser, Page } from "puppeteer";
import puppeteer from "puppeteer";

interface PatchNote {
  version: string;
  date: string;
  url: string;
  content: string[];
  author: string;
  lastBumped?: string;
}

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
  await page.setRequestInterception(true);

  // Optimize by blocking unnecessary resources
  page.on("request", (request: any) => {
    const resourceType = request.resourceType();
    if (["image", "stylesheet", "font", "media"].includes(resourceType)) {
      request.abort();
    } else {
      request.continue();
    }
  });

  return page;
}

export async function scrapePatchNotes(): Promise<PatchNote[]> {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await setupPage(browser);
  const patchNotes: PatchNote[] = [];

  try {
    // Navigate to patch notes forum
    await retry(async () => {
      await page.goto("https://www.pathofexile.com/forum/view-forum/2212", {
        waitUntil: "networkidle0",
        timeout: 30000,
      });
    });

    // Get all patch note threads
    const threads = await page.evaluate(() => {
      const threadElements = document.querySelectorAll(".forumTable tbody tr");
      return Array.from(threadElements)
        .map((thread) => {
          const titleElement = thread.querySelector(".thread .title a");
          const dateElement = thread.querySelector(".postBy .post_date");
          const authorElement = thread.querySelector(".postBy .profile-link.staff a");

          return {
            title: titleElement?.textContent?.trim() || "",
            url: titleElement?.getAttribute("href") || "",
            date: dateElement?.textContent?.replace(",", "").trim() || "",
            author: authorElement?.textContent?.trim() || "",
          };
        })
        .filter(
          (thread) =>
            (thread.title.toLowerCase().includes("patch notes") ||
              thread.title.toLowerCase().includes("hotfix")) &&
            thread.author // Only include posts by staff
        );
    });

    // Process each thread
    for (const thread of threads) {
      if (!thread.url) continue;

      try {
        await retry(async () => {
          await page.goto(`https://www.pathofexile.com${thread.url}`, {
            waitUntil: "networkidle0",
            timeout: 30000,
          });
        });

        // Extract patch note content
        const { content, lastBumped } = await page.evaluate(() => {
          const staffPost = document.querySelector("tr.staff");
          if (!staffPost) return { content: [], lastBumped: undefined };

          const contentElement = staffPost.querySelector(".content");
          const lastBumpedElement = staffPost.querySelector(".last_bumped");

          // Get content from both ul/li and direct text content
          const listItems = Array.from(contentElement?.querySelectorAll("li") || []);
          const directContent =
            contentElement?.textContent
              ?.split("\n")
              .map((line) => line.trim())
              .filter((line) => line.length > 0) || [];

          const content =
            listItems.length > 0
              ? listItems.map((li) => li.textContent?.trim() || "")
              : directContent;

          return {
            content: content.filter((line) => line.length > 0),
            lastBumped: lastBumpedElement?.textContent?.trim() || undefined,
          };
        });

        if (content.length > 0) {
          patchNotes.push({
            version: thread.title,
            date: thread.date,
            url: `https://www.pathofexile.com${thread.url}`,
            content,
            author: thread.author,
            lastBumped,
          });
        }
      } catch (error) {
        console.error(`Error processing thread ${thread.url}:`, error);
        // Continue with next thread
        continue;
      }
    }
  } catch (error) {
    console.error("Error scraping patch notes:", error);
  } finally {
    await browser.close();
  }

  // Sort by date, newest first
  return patchNotes.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function savePatchNotes(patchNotes: PatchNote[]): Promise<void> {
  const projectRoot = path.resolve(__dirname, "..");
  const dataDir = path.join(projectRoot, "public", "data");
  const filePath = path.join(dataDir, "patch-notes.json");

  // Ensure data directory exists
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  // Write patch notes to JSON file
  await fs.promises.writeFile(filePath, JSON.stringify(patchNotes, null, 2));
}

export type { PatchNote };
