import { MetadataRoute } from "next";
import { NewsService } from "~/services/news-service";
import { getBuilds } from "~/app/actions/builds";
import type { Database } from "~/lib/supabase/types";

type Build = Database["public"]["Tables"]["builds"]["Row"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://poe2.dev";

  // Core static routes with prioritized importance
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/skill-tree`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/build-planner`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/dps-calc`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    }
  ];

  try {
    // Get dynamic news routes
    const newsItems = await NewsService.getLatestNews();
    const newsRoutes = newsItems.map((item) => ({
      url: `${baseUrl}/news/${item.id}`,
      lastModified: new Date(item.publishedAt),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

    // Get dynamic build routes - only public builds
    const publicBuilds = await getBuilds({ visibility: "public" });
    const buildRoutes = publicBuilds.map((build: Build) => ({
      url: `${baseUrl}/build-planner/${build.id}`,
      lastModified: new Date(build.updated_at),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));

    // Combine all routes
    return [...staticRoutes, ...newsRoutes, ...buildRoutes];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    // Return static routes if dynamic route generation fails
    return staticRoutes;
  }
}
