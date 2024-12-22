import { MetadataRoute } from "next";

export type SitemapFrequency = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';

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

export async function generateDynamicSitemap(config: SitemapConfig): Promise<MetadataRoute.Sitemap> {
  const {
    baseUrl,
    defaultChangeFrequency = 'daily',
    defaultPriority = 0.7,
    staticRoutes = [],
    dynamicRoutes = [],
  } = config;

  // Process static routes
  const processedStaticRoutes = staticRoutes.map(route => ({
    url: `${baseUrl}${route.path}`,
    lastModified: route.lastModified || new Date(),
    changeFrequency: route.changeFrequency || defaultChangeFrequency,
    priority: route.priority || defaultPriority,
  }));

  // Process dynamic routes
  const processedDynamicRoutes = dynamicRoutes.map(route => ({
    url: `${baseUrl}${route.path}`,
    lastModified: route.lastModified || new Date(),
    changeFrequency: route.changeFrequency || defaultChangeFrequency,
    priority: route.priority || (defaultPriority * 0.9), // Slightly lower priority for dynamic routes
  }));

  // Combine and sort routes
  const allRoutes = [...processedStaticRoutes, ...processedDynamicRoutes]
    .sort((a, b) => b.priority - a.priority); // Sort by priority descending

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
  newsItems: Array<{ id: string; publishedAt: string }>,
): Promise<DynamicRoute[]> {
  return newsItems.map(item => ({
    path: `/news/${item.id}`,
    lastModified: item.publishedAt,
    changeFrequency: 'daily',
    priority: 0.8,
  }));
}

// Helper function to generate dynamic build planner routes
export async function generateBuildPlannerSitemapRoutes(
  builds: Array<{ id: string; updatedAt: string }>,
): Promise<DynamicRoute[]> {
  return builds.map(build => ({
    path: `/build-planner/${build.id}`,
    lastModified: build.updatedAt,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));
}
