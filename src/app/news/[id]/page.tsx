import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NewsLayout } from "~/components/news/NewsLayout";
import { Text } from "~/components/ui/Text";
import { NewsService } from "~/services/news-service";
import { Clock } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }> | undefined;
  searchParams: Promise<{ category?: string }> | undefined;
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  if (!params || !searchParams) return { title: "News Not Found" };

  try {
    const { id } = await params;
    const { category } = await searchParams;
    const news = await NewsService.getNewsById(id);
    if (!news || (category && news.category.toLowerCase() !== category.toLowerCase())) {
      return { title: "News Not Found" };
    }

    return {
      title: `${news.title} - Path of Exile 2 News`,
      description: news.description,
    };
  } catch (error) {
    console.error("Error generating news metadata:", error);
    return { title: "News Not Found" };
  }
}

export default async function NewsItemPage({ params, searchParams }: PageProps) {
  if (!params || !searchParams) notFound();

  try {
    const { id } = await params;
    const { category } = await searchParams;
    const news = await NewsService.getNewsById(id);

    if (!news) {
      notFound();
    }

    // If category is provided in URL, validate it matches the news item
    if (category && news.category.toLowerCase() !== category.toLowerCase()) {
      notFound();
    }

    const timeAgo = (date: string) => {
      const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
  
      let interval = seconds / 31536000;
      if (interval > 1) return Math.floor(interval) + " years ago";
      interval = seconds / 2592000;
      if (interval > 1) return Math.floor(interval) + " months ago";
      interval = seconds / 86400;
      if (interval > 1) return Math.floor(interval) + " days ago";
      interval = seconds / 3600;
      if (interval > 1) return Math.floor(interval) + " hours ago";
      interval = seconds / 60;
      if (interval > 1) return Math.floor(interval) + " minutes ago";
      return Math.floor(seconds) + " seconds ago";
    };

    return (
      <NewsLayout
        title={news.title}
        description={news.description}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Suspense
            fallback={
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
              </div>
            }
          >
            <article className="prose prose-invert max-w-none">
              <div className="flex items-center gap-4 text-sm text-foreground/60 mb-8">
                <span className="text-primary font-medium">{news.category}</span>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {timeAgo(news.publishedAt)}
                </div>
                <span className="text-foreground/40">•</span>
                <span>{news.source}</span>
              </div>

              <div className="space-y-6">
                <Text variant="h1" className="!mt-0">{news.title}</Text>
                <Text variant="body" color="secondary" className="text-lg">
                  {news.description}
                </Text>
                {/* Add more content sections as needed */}
              </div>
            </article>
          </Suspense>
        </div>
      </NewsLayout>
    );
  } catch (error) {
    console.error("Error loading news item:", error);
    notFound();
  }
}
