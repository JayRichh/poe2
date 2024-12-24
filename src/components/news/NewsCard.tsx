"use client";

import { ArrowRight, Clock, ExternalLink } from "lucide-react";

import { useMemo, useState } from "react";

import Link from "next/link";

import { cn } from "~/utils/cn";

import { NewsItem } from "~/types/news";

import { Text } from "../ui/Text";

interface NewsCardProps {
  news: NewsItem;
  variant?: "featured" | "compact";
}

export function NewsCard({ news, variant = "compact" }: NewsCardProps) {
  const isExternalUrl = useMemo(() => news.url?.startsWith("http") ?? false, [news.url]);

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
        href={isExternalUrl ? (news.url ?? "#") : `/news/${news.id}`}
        target={isExternalUrl ? "_blank" : undefined}
        rel={isExternalUrl ? "noopener noreferrer" : undefined}
        className="group relative overflow-hidden rounded-lg border border-border bg-background/50 hover:bg-muted/50 transition-all duration-200 h-full backdrop-blur-sm"
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center justify-between mb-4">
            {news.category && (
              <span className="text-sm font-medium text-primary">{news.category}</span>
            )}
            <div className="flex items-center gap-1.5 text-sm text-foreground/60">
              <Clock className="w-3.5 h-3.5" />
              {timeAgo(news.publishedAt || news.date || new Date().toISOString())}
            </div>
          </div>

          <div className="flex-grow space-y-3">
            <Text variant="h4" className="line-clamp-2">
              {news.title}
            </Text>
            {news.type === "patch" ? (
              <div className="space-y-2">
                <Text variant="body" color="secondary" className="line-clamp-2">
                  {news.description}
                </Text>
                {Array.isArray(news.content) && news.content.length > 0 && (
                  <ul className="space-y-1 list-disc list-inside text-sm text-foreground/70">
                    {news.content.slice(0, 3).map((change: string, i: number) => (
                      <li key={i} className="line-clamp-1 leading-relaxed">
                        {change}
                      </li>
                    ))}
                    {news.content.length > 3 && (
                      <Text color="secondary" className="text-sm">
                        +{news.content.length - 3} more changes
                      </Text>
                    )}
                  </ul>
                )}
              </div>
            ) : (
              <Text variant="body" color="secondary" className="line-clamp-3">
                {news.description}
              </Text>
            )}
          </div>

          <div className="flex items-center text-sm text-primary font-medium pt-4">
            Read More
            {isExternalUrl ? (
              <ExternalLink className="w-4 h-4 ml-1" />
            ) : (
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            )}
          </div>
        </div>
        <div className="absolute inset-0 border border-primary/10 rounded-lg group-hover:border-primary/20 transition-colors" />
      </Link>
    );
  }

  return (
    <Link
      href={isExternalUrl ? (news.url ?? "#") : `/news/${news.id}`}
      target={isExternalUrl ? "_blank" : undefined}
      rel={isExternalUrl ? "noopener noreferrer" : undefined}
      className="group block p-4 rounded-lg border border-border bg-background/50 hover:bg-muted/50 transition-all duration-200 backdrop-blur-sm"
    >
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          {news.category && (
            <span className="text-sm font-medium text-primary">{news.category}</span>
          )}
          <div className="flex items-center gap-1.5 text-sm text-foreground/60">
            <Clock className="w-3.5 h-3.5" />
            {timeAgo(news.publishedAt || news.date || new Date().toISOString())}
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="flex-grow space-y-1.5 min-w-0">
            <Text variant="h4" className="line-clamp-1">
              {news.title}
            </Text>
            <Text variant="body" color="secondary" className="line-clamp-2">
              {news.description}
            </Text>
          </div>
          <div className="flex-shrink-0 mt-1 text-primary">
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}
