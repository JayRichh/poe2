import { Container } from "~/components/ui/Container";
import { Text } from "~/components/ui/Text";
import { NewsCard } from "~/components/news/NewsCard";
import { NewsSidebar } from "~/components/news/NewsSidebar";
import { NewsService } from "~/services/news-service";
import { notFound } from 'next/navigation';

interface PageProps {
  searchParams: Promise<{
    category?: string;
    source?: string;
  }> | undefined;
}

export default async function NewsPage({ searchParams }: PageProps) {
  if (!searchParams) return null;
  
  try {
    const params = await searchParams;
    const news = await NewsService.getLatestNews(params.category);
    const featuredNews = news.slice(0, 2);
    const recentNews = news.slice(2);

    return (
      <>
        <NewsSidebar />
        <main className="flex-1">
          <div className="space-y-6 p-6 md:p-10">
            {/* Header */}
            <div className="space-y-1.5">
              <Text variant="h1" className="flex items-center">Latest News</Text>
              <Text variant="body" color="secondary" className="max-w-2xl leading-relaxed">
                Stay updated with the latest Path of Exile 2 news and announcements
              </Text>
            </div>

            {/* Featured News */}
            <div>
              <Text variant="h3" className="mb-3">Featured</Text>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {featuredNews.map((item) => (
                  <NewsCard key={item.id} news={item} variant="featured" />
                ))}
              </div>
            </div>

            {/* Recent News */}
            <div>
              <Text variant="h3" className="mb-3">Recent Updates</Text>
              <div className="space-y-3">
                {recentNews.map((item) => (
                  <NewsCard key={item.id} news={item} />
                ))}
              </div>
            </div>
          </div>
        </main>
      </>
    );
  } catch (error) {
    console.error('Error loading news:', error);
    notFound();
  }
}
