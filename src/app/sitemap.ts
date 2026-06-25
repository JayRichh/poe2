import type { MetadataRoute } from "next";

import { SITE } from "~/config/metadata";
import { ascendanciesWithMeta } from "~/lib/ascendancies/data";
import { guides } from "~/lib/guides/data";
import { mechanics } from "~/lib/mechanics/data";
import { NewsService } from "~/services/news-service";

type Entry = MetadataRoute.Sitemap[number];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE.url;
  // Build timestamp: honest "as of last deploy" for static/tool pages.
  const buildDate = new Date();

  const staticRoutes: Entry[] = [
    { url: baseUrl, lastModified: buildDate, changeFrequency: "weekly", priority: 1.0 },

    // Tools — static client tools; content changes only on patch/deploy.
    { url: `${baseUrl}/build-planner`, lastModified: buildDate, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/build-planner/equipment`, lastModified: buildDate, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/build-planner/skills`, lastModified: buildDate, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/build-planner/stats`, lastModified: buildDate, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/build-planner/notes`, lastModified: buildDate, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/build-planner/import-export`, lastModified: buildDate, changeFrequency: "monthly", priority: 0.6 },

    { url: `${baseUrl}/calculators`, lastModified: buildDate, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/calculators/dps`, lastModified: buildDate, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/calculators/speed`, lastModified: buildDate, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/calculators/currency`, lastModified: buildDate, changeFrequency: "monthly", priority: 0.7 },

    { url: `${baseUrl}/builds`, lastModified: buildDate, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/skill-tree`, lastModified: buildDate, changeFrequency: "monthly", priority: 0.8 },

    // Content
    { url: `${baseUrl}/news`, lastModified: buildDate, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/news/patch-notes`, lastModified: buildDate, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/guides`, lastModified: buildDate, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/mechanics`, lastModified: buildDate, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/ascendancies`, lastModified: buildDate, changeFrequency: "monthly", priority: 0.7 },

    // Legal / info — effectively static.
    { url: `${baseUrl}/privacy`, lastModified: buildDate, changeFrequency: "yearly", priority: 0.2 },
    { url: `${baseUrl}/terms`, lastModified: buildDate, changeFrequency: "yearly", priority: 0.2 },
  ];

  // Mechanics detail pages.
  const mechanicsRoutes: Entry[] = Object.keys(mechanics).map((slug) => ({
    url: `${baseUrl}/mechanics/${slug}`,
    lastModified: buildDate,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // Guide categories — clean path URLs (route is /guides/[category]).
  const guideRoutes: Entry[] = Object.keys(guides).map((slug) => ({
    url: `${baseUrl}/guides/${slug}`,
    lastModified: buildDate,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // Ascendancy detail pages — route is /ascendancies/[class].
  const ascendancyRoutes: Entry[] = ascendanciesWithMeta.map((ascendancy) => ({
    url: `${baseUrl}/ascendancies/${ascendancy.id}`,
    lastModified: buildDate,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // News + patch-note articles — real publish dates.
  const allNews = await NewsService.getAllNews();
  const newsRoutes: Entry[] = allNews.map((news) => {
    const parsed = news.date ? new Date(news.date) : buildDate;
    const lastModified = Number.isNaN(parsed.getTime()) ? buildDate : parsed;

    const path =
      news.type === "patch-note"
        ? `/news/patch-notes/${news.slug || news.id}`
        : `/news/${news.slug || news.id}`;

    return {
      url: `${baseUrl}${path}`,
      lastModified,
      // Published articles rarely change after release.
      changeFrequency: "yearly",
      priority: news.type === "patch-note" ? 0.6 : 0.5,
    };
  });

  return [
    ...staticRoutes,
    ...mechanicsRoutes,
    ...guideRoutes,
    ...ascendancyRoutes,
    ...newsRoutes,
  ];
}
