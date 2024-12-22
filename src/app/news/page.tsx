import { Suspense } from "react";
import { notFound } from "next/navigation";
import { NewsCard } from "~/components/news/NewsCard";
import { PatchNotes } from "~/components/news/PatchNotes";
import { NewsLayout } from "~/components/news/NewsLayout";
import { Text } from "~/components/ui/Text";
import { NewsService } from "~/services/news-service";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{
    category?: string;
    source?: string;
    timeRange?: string;
  }> | undefined;
}

export default async function NewsPage({ searchParams }: PageProps) {
  if (!searchParams) return null;

  try {
    const params = await searchParams;
    const news = await NewsService.getLatestNews(
      params.category,
      params.source,
      params.timeRange
    );

    // If category is selected, show filtered view
    if (params.category) {
      const formattedCategory = params.category.charAt(0).toUpperCase() + params.category.slice(1);
      return (
        <NewsLayout
          title={`${formattedCategory} News`}
          description={`Latest ${formattedCategory.toLowerCase()} news and updates`}
        >
          <div className="space-y-8 px-4 sm:px-6 lg:px-8 py-4">
            <Suspense
              fallback={
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  </div>
                </div>
              }
            >
              <div className="space-y-3">
                {news.map((item) => (
                  <NewsCard key={item.id} news={item} />
                ))}
              </div>
            </Suspense>
          </div>
        </NewsLayout>
      );
    }

    // Show full layout for main news page
    const [patchNotes] = await Promise.all([NewsService.getPatchNotes()]);
    const featuredNews = news.slice(0, 2);
    const recentNews = news.slice(2);

    return (
      <NewsLayout
        title="Latest News"
        description="Stay updated with the latest Path of Exile 2 news and announcements"
      >
        <div className="space-y-8 px-4 sm:px-6 lg:px-8 py-4">
          <Suspense
            fallback={
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
              </div>
            }
          >
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
          </Suspense>
        </div>
      </NewsLayout>
    );
  } catch (error) {
    console.error("Error loading news:", error);
    notFound();
  }
}
