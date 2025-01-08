"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { Suspense } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { NewsCard } from "~/components/news/NewsCard";
import { PatchNotes } from "~/components/news/PatchNotes";
import { Text } from "~/components/ui/Text";

import { cn } from "~/utils/cn";

import type { NewsPost, PaginatedResponse } from "~/types/news";

interface NewsContentProps {
  news: PaginatedResponse<NewsPost>;
  featuredNews: NewsPost[];
  categoryCounts: {
    announcements: number;
    patchNotes: number;
  };
}

export function NewsContent({ news, featuredNews, categoryCounts }: NewsContentProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || "";
  const currentPage = parseInt(searchParams.get("page") || "1");

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`/news?${params.toString()}`);
  };

  const renderContent = () => {
    if (currentCategory === "patch-notes") {
      return (
        <div className="bg-card rounded-lg p-6 border border-border">
          <PatchNotes patchNotes={news.items} />
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {news.items.map((item) => (
          <NewsCard key={item.id} news={item} />
        ))}
      </div>
    );
  };

  return (
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
        {/* Featured News - Only show on main view */}
        {!currentCategory && featuredNews.length > 0 && (
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
        )}

        {/* News Content */}
        <div className="space-y-6">{renderContent()}</div>

        {/* Pagination Controls */}
        {news.metadata.totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-border/30 pt-4 mt-8">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={cn(
                "flex items-center gap-1 px-3 py-2 text-sm rounded-md",
                "hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>
            <div className="text-sm text-foreground/60">
              Page {currentPage} of {news.metadata.totalPages}
            </div>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === news.metadata.totalPages}
              className={cn(
                "flex items-center gap-1 px-3 py-2 text-sm rounded-md",
                "hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </Suspense>
    </div>
  );
}
