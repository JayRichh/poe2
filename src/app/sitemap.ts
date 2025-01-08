import type { MetadataRoute } from "next";

import { ascendanciesWithMeta } from "~/lib/ascendancies/data";
import { guides } from "~/lib/guides/data";
import { mechanics } from "~/lib/mechanics/data";
import { NewsService } from "~/services/news-service";

type SitemapEntry = {
  url: string;
  lastModified: Date;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://poe2.dev";
  const defaultDate = new Date();

  // Get all news items including patch notes
  const allNews = await NewsService.getAllNews();

  const routes: SitemapEntry[] = [
    // Core pages
    {
      url: baseUrl,
      lastModified: defaultDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
    // Tools
    {
      url: `${baseUrl}/build-planner`,
      lastModified: defaultDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/calculators`,
      lastModified: defaultDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/calculators/dps`,
      lastModified: defaultDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/calculators/speed`,
      lastModified: defaultDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/calculators/currency`,
      lastModified: defaultDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/skill-tree`,
      lastModified: defaultDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    // Content pages
    {
      url: `${baseUrl}/news`,
      lastModified: defaultDate,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/news/patch-notes`,
      lastModified: defaultDate,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/guides`,
      lastModified: defaultDate,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/mechanics`,
      lastModified: defaultDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/ascendancies`,
      lastModified: defaultDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    // Legal & Info pages
    {
      url: `${baseUrl}/privacy`,
      lastModified: defaultDate,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: defaultDate,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    // Build planner sections
    {
      url: `${baseUrl}/build-planner/equipment`,
      lastModified: defaultDate,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/build-planner/skills`,
      lastModified: defaultDate,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/build-planner/stats`,
      lastModified: defaultDate,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/build-planner/notes`,
      lastModified: defaultDate,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/build-planner/import-export`,
      lastModified: defaultDate,
      changeFrequency: "weekly",
      priority: 0.6,
    },
  ];

  // Add mechanics pages
  const mechanicsRoutes: SitemapEntry[] = Object.keys(mechanics).map((slug) => ({
    url: `${baseUrl}/mechanics/${slug}`,
    lastModified: defaultDate,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // Add guide pages
  const guideRoutes: SitemapEntry[] = Object.keys(guides).map((slug) => ({
    url: `${baseUrl}/guides?category=${slug}`,
    lastModified: defaultDate,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // Add news pages with proper routing
  const newsRoutes: SitemapEntry[] = allNews.map((news) => {
    // Safely handle date parsing
    let lastMod = defaultDate;
    try {
      lastMod = new Date(news.date);
    } catch (e) {
      console.error("Error parsing date:", e);
    }

    const path =
      news.type === "patch-note"
        ? `/news/patch-notes/${news.slug || news.id}`
        : `/news/${news.slug || news.id}`;

    return {
      url: `${baseUrl}${path}`,
      lastModified: lastMod,
      changeFrequency: news.type === "patch-note" ? "daily" : "weekly",
      priority: news.type === "patch-note" ? 0.8 : 0.7,
    };
  });

  // Add ascendancy pages
  const ascendancyRoutes: SitemapEntry[] = ascendanciesWithMeta.map((ascendancy) => ({
    url: `${baseUrl}/ascendancies/${ascendancy.id}`,
    lastModified: defaultDate,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...routes, ...mechanicsRoutes, ...guideRoutes, ...newsRoutes, ...ascendancyRoutes];
}
