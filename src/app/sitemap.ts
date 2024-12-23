import { MetadataRoute } from "next";
import { NewsService } from "../services/news-service";
import { getBuilds } from "./actions/builds";
import { generateDynamicSitemap, generateNewsSitemapRoutes, generateBuildPlannerSitemapRoutes, DynamicRoute } from "../utils/sitemap";

// Static routes organized by section
const staticRoutes: DynamicRoute[] = [
  // Core pages
  {
    path: "/",
    changeFrequency: "daily",
    priority: 1,
  },
  
  // Build Planner section (only static pages)
  {
    path: "/build-planner",
    changeFrequency: "daily",
    priority: 0.9,
  },
  {
    path: "/build-planner/new",
    changeFrequency: "daily",
    priority: 0.8,
  },
  {
    path: "/build-planner/equipment",
    changeFrequency: "daily", 
    priority: 0.7,
  },
  {
    path: "/build-planner/skills",
    changeFrequency: "daily",
    priority: 0.7,
  },
  {
    path: "/build-planner/stats",
    changeFrequency: "daily",
    priority: 0.7,
  },
  {
    path: "/build-planner/notes",
    changeFrequency: "daily",
    priority: 0.7,
  },
  {
    path: "/build-planner/import-export",
    changeFrequency: "daily",
    priority: 0.7,
  },

  // Tools & Calculators
  {
    path: "/dps-calc",
    changeFrequency: "daily",
    priority: 0.9,
  },
  {
    path: "/skill-tree",
    changeFrequency: "daily",
    priority: 0.9,
  },

  // User section
  {
    path: "/profile",
    changeFrequency: "daily",
    priority: 0.8,
  },
  {
    path: "/auth/login",
    changeFrequency: "weekly",
    priority: 0.6,
  },
  {
    path: "/auth/signup",
    changeFrequency: "weekly",
    priority: 0.6,
  },
  {
    path: "/auth/reset-password",
    changeFrequency: "weekly",
    priority: 0.5,
  },

  // News section
  {
    path: "/news",
    changeFrequency: "daily",
    priority: 0.8,
  },

  // RSS Feed
  {
    path: "/feed.xml",
    changeFrequency: "daily",
    priority: 0.6,
  },
];

// Routes that should be excluded from sitemap
const excludedRoutes = [
  '/api/',
  '/auth/callback',
  '/build-planner/[id]/edit',
  '/_actions',
  '/fonts',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    // Fetch all news items (including both mock news and patch notes)
    const allNews = await NewsService.getAllNews();

    // Generate dynamic routes
    const newsRoutes = await generateNewsSitemapRoutes(allNews, []);

    // Combine all dynamic routes
    const dynamicRoutes = [...newsRoutes];

    // Generate final sitemap
    return generateDynamicSitemap({
      baseUrl: "https://poe2.dev",
      defaultChangeFrequency: "daily",
      defaultPriority: 0.7,
      staticRoutes,
      dynamicRoutes,
    });
  } catch (error) {
    console.error("Error generating sitemap:", error);
    // Fallback to static routes if dynamic generation fails
    return generateDynamicSitemap({
      baseUrl: "https://poe2.dev",
      staticRoutes,
    });
  }
}

// Revalidate sitemap every hour
export const revalidate = 3600;
