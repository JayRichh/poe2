import fs from "fs";
import path from "path";
import type { Browser, Page } from "puppeteer";
import puppeteer from "puppeteer";

interface NewsPost {
  id: string;
  title: string;
  date: string;
  url: string;
  content: string;
  author: string;
  lastBumped?: string;
  replies?: number;
  lastReplyBy?: string;
  lastReplyDate?: string;
  type: 'announcement' | 'patch-note';
  imageUrl?: string;
}

type PatchNote = NewsPost;

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

interface ThreadData {
  id: string;
  title: string;
  url: string;
  date: string;
  author: string;
  replies: number;
  lastReplyBy?: string;
  lastReplyDate?: string;
}

interface PostContent {
  content: string;
  imageUrl?: string;
}

async function scrapeForumThreads(page: Page, forumId: string, type: 'announcement' | 'patch-note'): Promise<NewsPost[]> {
  const posts: NewsPost[] = [];

  try {
    await retry(async () => {
      await page.goto(`https://www.pathofexile.com/forum/view-forum/${forumId}`, {
        waitUntil: "networkidle0",
        timeout: 30000,
      });
    });

    console.log(`Scraping ${type} from forum ${forumId}...`);
    const threads = await page.evaluate((postType: 'announcement' | 'patch-note') => {
      const threadElements = document.querySelectorAll(".forumTable tbody tr");
      return Array.from(threadElements)
        .map((thread) => {
          const titleElement = thread.querySelector(".thread .title a");
          const dateElement = thread.querySelector(".postBy .post_date");
          const authorElement = thread.querySelector(".postBy .profile-link.post_by_account a");
          const repliesElement = thread.querySelector(".views span");
          const lastReplyByElement = thread.querySelector(".last_post .profile-link a");
          const lastReplyDateElement = thread.querySelector(".last_post .post_date a");
          const threadId = titleElement?.getAttribute("href")?.split("/")[3] || "";

          return {
            id: threadId,
            title: titleElement?.textContent?.trim() || "",
            url: titleElement?.getAttribute("href") || "",
            date: dateElement?.textContent?.replace(",", "").trim() || "",
            author: authorElement?.textContent?.trim() || "",
            replies: parseInt(repliesElement?.textContent || "0", 10),
            lastReplyBy: lastReplyByElement?.textContent?.trim(),
            lastReplyDate: lastReplyDateElement?.textContent?.trim()
          };
        })
        .filter((thread) => {
          const isStaffPost = !!thread.author;
          if (!isStaffPost) return false;
          
          const title = thread.title.toLowerCase();
          if (postType === 'patch-note') {
            return isStaffPost && (title.includes("patch notes") || title.includes("hotfix"));
          }
          // For announcements, include all staff posts except patch notes/hotfixes
          return isStaffPost && !(title.includes("patch notes") || title.includes("hotfix"));
        });
    }, type) as ThreadData[];

    for (const thread of threads) {
      if (!thread.url) continue;

      try {
        await retry(async () => {
          await page.goto(`https://www.pathofexile.com${thread.url}`, {
            waitUntil: "networkidle0",
            timeout: 30000,
          });
        });

        const { content, imageUrl } = await page.evaluate(() => {
          const staffPost = document.querySelector("tr.newsPost") || document.querySelector("tr.staff");
          if (!staffPost) return { content: "" };

          const contentElement = staffPost.querySelector(".content");
          const imageElement = staffPost.querySelector(".content img") as HTMLImageElement;

          return {
            content: contentElement?.innerHTML || "",
            imageUrl: imageElement?.src
          };
        }) as PostContent;

        if (content) {
          posts.push({
            id: thread.id,
            title: thread.title,
            date: thread.date,
            url: `https://www.pathofexile.com${thread.url}`,
            content,
            author: thread.author,
            replies: thread.replies,
            lastReplyBy: thread.lastReplyBy,
            lastReplyDate: thread.lastReplyDate,
            type,
            imageUrl
          });
        }
      } catch (error) {
        console.error(`Error processing thread ${thread.url}:`, error);
        continue;
      }
    }
  } catch (error) {
    console.error(`Error scraping ${type}:`, error);
  }

  return posts;
}

export async function scrapePatchNotes(): Promise<NewsPost[]> {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await setupPage(browser);
  
  try {
    const announcements = await scrapeForumThreads(page, "2211", "announcement");
    const patchNotes = await scrapeForumThreads(page, "2212", "patch-note");
    
    const allPosts = [...announcements, ...patchNotes];
    
    // Sort by date, newest first
    return allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } finally {
    await browser.close();
  }
}

export async function savePatchNotes(posts: NewsPost[]): Promise<void> {
  const projectRoot = path.resolve(__dirname, "..");
  const dataDir = path.join(projectRoot, "public", "data");
  
  // Ensure data directory exists
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  // Filter and save patch notes
  const patchNotes = posts.filter(post => post.type === 'patch-note');
  const patchNotesPath = path.join(dataDir, "patch-notes.json");
  await fs.promises.writeFile(patchNotesPath, JSON.stringify(patchNotes, null, 2));
}

export async function saveAnnouncements(posts: NewsPost[]): Promise<void> {
  const projectRoot = path.resolve(__dirname, "..");
  const dataDir = path.join(projectRoot, "public", "data");
  
  // Ensure data directory exists
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  // Filter and save announcements
  const announcements = posts.filter(post => post.type === 'announcement');
  const announcementsPath = path.join(dataDir, "announcements.json");
  await fs.promises.writeFile(announcementsPath, JSON.stringify(announcements, null, 2));
}

export type { NewsPost, PatchNote };
