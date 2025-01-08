"use client";

import { ArrowRight, ExternalLink } from "lucide-react";
import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { NewsService } from "~/services/news-service";
import { NewsPost } from "~/types/news";
import { Text } from "../ui/Text";
import { TimeAgo } from "../ui/TimeAgo";

interface NewsCardProps {
  news: NewsPost;
  variant?: "featured" | "compact";
}

export function NewsCard({ news, variant = "compact" }: NewsCardProps) {
  const hasExternalUrl = useMemo(() => news.url?.startsWith("http") ?? false, [news.url]);
  
  const processedContent = useMemo(() => ({
    __html: news.processedContent || ''
  }), [news.processedContent]);

  if (variant === "featured") {
    return (
      <article className="group relative overflow-hidden rounded-lg border border-border bg-background/50 hover:bg-muted/50 transition-all duration-200 h-full backdrop-blur-sm">
        <div className="flex flex-col h-full p-6 relative z-10">
          <header className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-primary">
              {news.type === "patch-note" ? "Patch Notes" : "Announcement"}
            </span>
            <TimeAgo date={news.date} />
          </header>

          {news.imageUrl && (
            <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
              <Image
                src={news.imageUrl}
                alt=""
                fill
                priority={true}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          )}

          <Link href={NewsService.getNewsUrl(news)} className="flex-grow block">
            <Text variant="h4" className="line-clamp-2 mb-3">
              {news.title}
            </Text>
            {news.replies ? (
              <Text color="secondary" className="text-sm mt-2">
                {news.replies} replies
              </Text>
            ) : null}
          </Link>

          <footer className="flex items-center justify-between pt-4 mt-auto">
            <Link href={NewsService.getNewsUrl(news)} className="flex items-center text-sm text-primary font-medium">
              Read More
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
            {hasExternalUrl && (
              <a
                href={news.url}
                target="_blank"
                rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-foreground/80 hover:text-foreground/90 hover:bg-muted px-2 py-1 rounded-md transition-colors whitespace-nowrap flex-shrink-0"
              >
                View on Forum
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </footer>
        </div>
      </article>
    );
  }

  return (
    <article className="group relative p-4 rounded-lg border border-border bg-background/50 hover:bg-muted/50 transition-all duration-200 backdrop-blur-sm">
      <header className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-primary">
          {news.type === "patch-note" ? "Patch Notes" : "Announcement"}
        </span>
        <TimeAgo date={news.date} />
      </header>

      <div className="flex items-start gap-4">
        <Link href={NewsService.getNewsUrl(news)} className="flex-grow min-w-0 block">
          <Text variant="h4" className="line-clamp-1 mb-1.5">
            {news.title}
          </Text>
        </Link>

        <div className="flex items-center gap-2">
          {hasExternalUrl && (
            <a
              href={news.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-foreground/80 hover:text-foreground/90 hover:bg-muted px-2 py-1 rounded-md transition-colors whitespace-nowrap flex-shrink-0"
            >
              View on Forum
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
          <Link href={NewsService.getNewsUrl(news)} className="flex-shrink-0 mt-1 text-primary">
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
}
