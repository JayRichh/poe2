import { MetadataRoute } from "next";

export type SitemapFrequency =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

export interface DynamicRoute {
  path: string;
  lastModified?: Date | string;
  changeFrequency?: SitemapFrequency;
  priority?: number;
}

export interface SitemapConfig {
  baseUrl: string;
  defaultChangeFrequency?: SitemapFrequency;
  defaultPriority?: number;
  staticRoutes?: DynamicRoute[];
  dynamicRoutes?: DynamicRoute[];
}

export async function generateDynamicSitemap(
  config: SitemapConfig
): Promise<MetadataRoute.Sitemap> {
  const {
    baseUrl,
    defaultChangeFrequency = "daily",
    defaultPriority = 0.7,
    staticRoutes = [],
    dynamicRoutes = [],
  } = config;

  // Process static routes
  const processedStaticRoutes = staticRoutes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: route.lastModified || new Date(),
    changeFrequency: route.changeFrequency || defaultChangeFrequency,
    priority: route.priority || defaultPriority,
  }));

  // Process dynamic routes
  const processedDynamicRoutes = dynamicRoutes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: route.lastModified || new Date(),
    changeFrequency: route.changeFrequency || defaultChangeFrequency,
    priority: route.priority || defaultPriority * 0.9, // Slightly lower priority for dynamic routes
  }));

  // Combine and sort routes
  const allRoutes = [...processedStaticRoutes, ...processedDynamicRoutes].sort(
    (a, b) => b.priority - a.priority
  ); // Sort by priority descending

  return allRoutes as MetadataRoute.Sitemap;
}

// Helper function to format date for sitemap
export function formatSitemapDate(date: Date | string): string {
  const d = new Date(date);
  return d.toISOString();
}

// Helper function to validate sitemap priority
export function validateSitemapPriority(priority: number): number {
  return Math.max(0, Math.min(1, priority));
}

// Helper function to generate dynamic news routes
export async function generateNewsSitemapRoutes(
  newsItems: Array<{ id: string; publishedAt?: string; date?: string }>,
  patchNotes: Array<{ version: string; date: string; url?: string }> = []
): Promise<DynamicRoute[]> {
  const newsRoutes = newsItems.map((item) => ({
    path: `/news/${item.id}`,
    lastModified: item.publishedAt || item.date || new Date().toISOString(),
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  const patchNoteRoutes = patchNotes.map((note) => {
    // Use URL ID if available, otherwise normalize version number
    const id =
      note.url?.split("/").pop() ||
      note.version
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
    return {
      path: `/news/${id}`,
      lastModified: note.date,
      changeFrequency: "daily" as const,
      priority: 0.8,
    };
  });

  return [...newsRoutes, ...patchNoteRoutes];
}

// Helper function to generate dynamic build planner routes
export async function generateBuildPlannerSitemapRoutes(
  builds: Array<{ id: string; updated_at: string }>
): Promise<DynamicRoute[]> {
  const buildSubpages = ["equipment", "skills", "stats", "notes", "import-export"];

  return builds.flatMap((build) => {
    // Main build page
    const mainRoute = {
      path: `/build-planner/${build.id}`,
      lastModified: build.updated_at,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    };

    // Build subpages
    const subRoutes = buildSubpages.map((subpage) => ({
      path: `/build-planner/${build.id}/${subpage}`,
      lastModified: build.updated_at,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));

    return [mainRoute, ...subRoutes];
  });
}
