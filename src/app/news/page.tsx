import { notFound } from "next/navigation";

import { NewsContent } from "~/components/news/NewsContent";
import { NewsLayout } from "~/components/news/NewsLayout";

import { NewsService } from "~/services/news-service";
import type { NewsPost, NewsQueryParams } from "~/types/news";

export const dynamic = "force-dynamic";
export const revalidate = 3600; // Revalidate every hour

interface PageProps {
  searchParams:
    | Promise<{
        category?: string;
        source?: string;
        timeRange?: string;
        page?: string;
        itemsPerPage?: string;
      }>
    | undefined;
}

export default async function NewsPage({ searchParams }: PageProps) {
  if (!searchParams) return null;

  try {
    // Await searchParams before using
    const params = await searchParams;
    const { category, page, itemsPerPage, timeRange } = params;

    // Convert pagination params
    const queryParams: NewsQueryParams = {
      page: page ? parseInt(page) : 1,
      itemsPerPage: itemsPerPage ? parseInt(itemsPerPage) : 10,
      timeRange,
    };

    // Add type filter based on category
    if (category === "announcements") {
      queryParams.type = "announcement";
    } else if (category === "patch-notes") {
      queryParams.type = "patch-note";
    }

    // Get paginated news
    const paginatedNews = await NewsService.getLatestNews(queryParams);

    // Get featured items (latest from each category) only for main view
    let featuredNews: NewsPost[] = [];
    if (!category) {
      const [announcements, patchNotes] = await Promise.all([
        NewsService.getLatestNews({
          type: "announcement",
          itemsPerPage: 1,
          page: 1,
          timeRange,
        }),
        NewsService.getLatestNews({
          type: "patch-note",
          itemsPerPage: 1,
          page: 1,
          timeRange,
        }),
      ]);
      featuredNews = [...announcements.items, ...patchNotes.items].filter(Boolean);
    }

    // Get category counts for tabs (respect timeRange filter)
    const [announcementsCount, patchNotesCount] = await Promise.all([
      NewsService.getLatestNews({ type: "announcement", itemsPerPage: 1, timeRange }).then(
        (r) => r.metadata.totalItems
      ),
      NewsService.getLatestNews({ type: "patch-note", itemsPerPage: 1, timeRange }).then(
        (r) => r.metadata.totalItems
      ),
    ]);

    return (
      <NewsLayout
        title="Latest News"
        description="Stay updated with the latest Path of Exile 2 news and announcements"
      >
        <NewsContent
          news={paginatedNews}
          featuredNews={featuredNews}
          categoryCounts={{
            announcements: announcementsCount,
            patchNotes: patchNotesCount,
          }}
        />
      </NewsLayout>
    );
  } catch (error) {
    console.error("Error loading news:", error);
    notFound();
  }
}
