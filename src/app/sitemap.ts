import type { MetadataRoute } from "next";

import { getContentLastModified } from "~/config/content-dates";
import { SITE } from "~/config/metadata";
import { ascendanciesWithMeta } from "~/lib/ascendancies/data";
import { guides } from "~/lib/guides/data";
import { mechanics } from "~/lib/mechanics/data";
import { NewsService } from "~/services/news-service";

type Entry = MetadataRoute.Sitemap[number];

/**
 * Static and index routes. Their `lastModified` comes from the real content
 * date in content-dates, never from the build clock.
 */
const STATIC_ROUTES = [
  ["/", "weekly", 1.0],

  // Tools — static client tools; content changes only when their page does.
  ["/build-planner/equipment", "monthly", 0.6],
  ["/build-planner/skills", "monthly", 0.6],
  ["/build-planner/stats", "monthly", 0.6],
  ["/build-planner/notes", "monthly", 0.6],
  ["/build-planner/import-export", "monthly", 0.6],

  ["/calculators", "monthly", 0.8],
  ["/calculators/dps", "monthly", 0.7],
  ["/calculators/speed", "monthly", 0.7],
  ["/calculators/currency", "monthly", 0.7],

  ["/builds", "weekly", 0.8],
  ["/skill-tree", "monthly", 0.8],

  // Content
  ["/news", "weekly", 0.8],
  ["/news/patch-notes", "weekly", 0.8],
  ["/guides", "monthly", 0.7],
  ["/mechanics", "monthly", 0.7],
  ["/ascendancies", "monthly", 0.7],

  // Legal / info — effectively static.
  ["/privacy", "yearly", 0.2],
  ["/terms", "yearly", 0.2],
] as const;

/** Newest valid publish date in a set of posts. */
function latestDate(posts: Array<{ date?: string }>): Date | undefined {
  const times = posts
    .map((post) => (post.date ? new Date(post.date).getTime() : Number.NaN))
    .filter((time) => !Number.isNaN(time));
  return times.length > 0 ? new Date(Math.max(...times)) : undefined;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE.url;
  const allNews = await NewsService.getAllNews();

  // News index pages change whenever a new article is published, so follow the
  // newest entry instead of a fixed date.
  const dateOverrides = new Map<string, Date | undefined>([
    ["/news", latestDate(allNews) ?? getContentLastModified("/news")],
    [
      "/news/patch-notes",
      latestDate(allNews.filter((post) => post.type === "patch-note")) ??
        getContentLastModified("/news/patch-notes"),
    ],
  ]);

  const staticRoutes: Entry[] = STATIC_ROUTES.map(([path, changeFrequency, priority]) => ({
    url: path === "/" ? baseUrl : `${baseUrl}${path}`,
    lastModified: dateOverrides.get(path) ?? getContentLastModified(path),
    changeFrequency,
    priority,
  }));

  // Mechanics detail pages.
  const mechanicsRoutes: Entry[] = Object.keys(mechanics).map((slug) => ({
    url: `${baseUrl}/mechanics/${slug}`,
    lastModified: getContentLastModified(`/mechanics/${slug}`),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // Guide categories — clean path URLs (route is /guides/[category]).
  const guideRoutes: Entry[] = Object.keys(guides).map((slug) => ({
    url: `${baseUrl}/guides/${slug}`,
    lastModified: getContentLastModified(`/guides/${slug}`),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // Ascendancy detail pages — route is /ascendancies/[class].
  const ascendancyRoutes: Entry[] = ascendanciesWithMeta.map((ascendancy) => ({
    url: `${baseUrl}/ascendancies/${ascendancy.id}`,
    lastModified: getContentLastModified(`/ascendancies/${ascendancy.id}`),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // News + patch-note articles — real publish dates.
  const newsFallback = dateOverrides.get("/news") ?? getContentLastModified("/news");
  const newsRoutes: Entry[] = allNews.map((news) => {
    const parsed = news.date ? new Date(news.date) : newsFallback;
    const lastModified = !parsed || Number.isNaN(parsed.getTime()) ? newsFallback : parsed;

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

  // Duplicate news ids would otherwise list the same URL twice.
  const all = [
    ...staticRoutes,
    ...mechanicsRoutes,
    ...guideRoutes,
    ...ascendancyRoutes,
    ...newsRoutes,
  ];
  return [
    ...new Map(
      all.map(({ lastModified, ...entry }) => [
        entry.url,
        lastModified === undefined ? entry : { ...entry, lastModified },
      ])
    ).values(),
  ];
}
