import type { NewsItem, PatchNote } from "@/types/news";

import { notFound } from "next/navigation";

import { NewsCard } from "~/components/news/NewsCard";
import { NewsSidebar } from "~/components/news/NewsSidebar";
import { PatchNotes } from "~/components/news/PatchNotes";
import { Text } from "~/components/ui/Text";

import { NewsService } from "~/services/news-service";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams:
    | Promise<{
        category?: string;
        source?: string;
      }>
    | undefined;
}

export default async function NewsPage({ searchParams }: PageProps) {
  if (!searchParams) return null;

  try {
    const params = await searchParams;
    const [news, patchNotes] = await Promise.all([
      NewsService.getLatestNews(params.category),
      NewsService.getPatchNotes(),
    ]);

    const featuredNews = news.slice(0, 2);
    const recentNews = news.slice(2);

    return (
      <>
        <NewsSidebar />
        <main className="flex-1">
          <div className="space-y-8 p-6 md:p-10">
            {/* Header */}
            <div className="space-y-1.5">
              <Text variant="h1" className="flex items-center">
                Latest News
              </Text>
              <Text variant="body" color="secondary" className="max-w-2xl leading-relaxed">
                Stay updated with the latest Path of Exile 2 news and announcements
              </Text>
            </div>

            {/* Featured News */}
            <div>
              <Text variant="h3" className="mb-3">
                Featured
              </Text>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {featuredNews.map((item) => (
                  <NewsCard key={item.id} news={item} variant="featured" />
                ))}
              </div>
            </div>

            {/* Recent News */}
            <div>
              <Text variant="h3" className="mb-3">
                Recent Updates
              </Text>
              <div className="space-y-3">
                {recentNews.map((item) => (
                  <NewsCard key={item.id} news={item} />
                ))}
              </div>
            </div>

            {/* Patch Notes */}
            <div>
              <Text variant="h3" className="mb-3">
                Patch Notes
              </Text>
              <div className="bg-card rounded-lg p-6 border border-border">
                <PatchNotes patchNotes={patchNotes} />
              </div>
            </div>
          </div>
        </main>
      </>
    );
  } catch (error) {
    console.error("Error loading news:", error);
    notFound();
  }
}
