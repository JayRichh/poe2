"use client";

import { ChevronLeft } from "lucide-react";

import { useEffect } from "react";

import Link from "next/link";

import { NewsLayout } from "~/components/news/NewsLayout";
import { Text } from "~/components/ui/Text";

export default function NewsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("News error:", error);
  }, [error]);

  return (
    <NewsLayout
      title="Error Loading News"
      description="There was a problem loading this news item."
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <Text variant="h1" className="!mt-0">
            Error Loading News
          </Text>
          <Text variant="body" color="secondary" className="text-lg">
            There was a problem loading this news item. Please try again later.
          </Text>

          <div className="mt-12 pt-6 border-t border-border/30">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 font-medium"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to News
            </Link>
          </div>
        </div>
      </div>
    </NewsLayout>
  );
}
