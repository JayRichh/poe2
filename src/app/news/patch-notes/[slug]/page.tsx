import { ChevronLeft, Clock } from "lucide-react";

import { Suspense } from "react";

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { NewsLayout } from "~/components/news/NewsLayout";
import { Text } from "~/components/ui/Text";

import { NewsService } from "~/services/news-service";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const news = await NewsService.getNewsById(slug);
    if (!news) return {};

    return {
      title: news.title,
      description: news.description,
      openGraph: {
        title: news.title,
        description: news.description,
        type: 'article',
        publishedTime: news.publishedAt || news.date,
        modifiedTime: news.publishedAt || news.date,
      },
    };
  } catch {
    return {};
  }
}

export default async function PatchNotePage({ params }: PageProps) {
  try {
    const { slug } = await params;
    const news = await NewsService.getNewsById(slug);
    if (!news || news.type !== 'patch') notFound();

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
      <NewsLayout title={news.title} description={news.description}>
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
                <span className="text-primary font-medium">Patch Notes</span>
                {news.publishedAt && (
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {timeAgo(news.publishedAt)}
                  </div>
                )}
                <span className="text-foreground/40">•</span>
                <span>Official</span>
              </div>

              <div className="space-y-6">
                <Text variant="h1" className="!mt-0">
                  {news.title}
                </Text>
                {news.description && (
                  <Text variant="body" color="secondary" className="text-lg">
                    {news.description}
                  </Text>
                )}

                {Array.isArray(news.content) && (
                  <div className="mt-8 space-y-6">
                    <div className="prose prose-invert max-w-none">
                      <ul className="space-y-3 list-disc list-inside">
                        {news.content.map((change, i) => (
                          <li key={i} className="leading-relaxed text-foreground/80">
                            {change}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Back to Patch Notes Link */}
                <div className="mt-12 pt-6 border-t border-border/30">
                  <Link
                    href="/news/patch-notes"
                    className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 font-medium"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Back to Patch Notes
                  </Link>
                </div>
              </div>
            </article>
          </Suspense>
        </div>
      </NewsLayout>
    );
  } catch (error) {
    console.error("Error loading patch note:", error);
    notFound();
  }
}
