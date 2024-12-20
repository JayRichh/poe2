import { ArrowRight, Clock } from "lucide-react";

import Link from "next/link";

import { NewsItem } from "~/types/news";

import { Text } from "../ui/Text";

interface NewsCardProps {
  news: NewsItem;
  variant?: "featured" | "compact";
}

export function NewsCard({ news, variant = "compact" }: NewsCardProps) {
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

  if (variant === "featured") {
    return (
      <Link
        href={news.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative overflow-hidden rounded-lg border border-border bg-card hover:bg-accent/5 transition-colors h-full"
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-accent">{news.category}</span>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="w-3 h-3" />
              {timeAgo(news.publishedAt)}
            </div>
          </div>

          <div className="flex-grow space-y-2">
            <Text variant="h4" className="line-clamp-2">
              {news.title}
            </Text>
            <Text variant="body" color="secondary" className="line-clamp-3">
              {news.description}
            </Text>
          </div>

          <div className="flex items-center text-sm text-accent pt-4">
            Read More
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
        <div className="absolute inset-0 border border-accent/10 rounded-lg group-hover:border-accent/20 transition-colors" />
      </Link>
    );
  }

  return (
    <Link
      href={news.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block p-4 rounded-lg border border-border bg-card hover:bg-accent/5 transition-colors"
    >
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-accent">{news.category}</span>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="w-3 h-3" />
            {timeAgo(news.publishedAt)}
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="flex-grow space-y-1 min-w-0">
            <Text variant="h4" className="line-clamp-1">
              {news.title}
            </Text>
            <Text variant="body" color="secondary" className="line-clamp-2">
              {news.description}
            </Text>
          </div>
          <ArrowRight className="w-5 h-5 text-accent flex-shrink-0 mt-1 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
