import { ChevronLeft } from "lucide-react";

import Link from "next/link";
import { notFound } from "next/navigation";

import { NewsLayout } from "~/components/news/NewsLayout";
import { PatchNotes } from "~/components/news/PatchNotes";
import { Text } from "~/components/ui/Text";

import { NewsService } from "~/services/news-service";
import type { NewsQueryParams } from "~/types/news";

export const dynamic = "force-dynamic";
export const revalidate = 3600; // Revalidate every hour

interface PageProps {
  searchParams:
    | Promise<{
        page?: string;
        itemsPerPage?: string;
      }>
    | undefined;
}

export default async function PatchNotesPage({ searchParams }: PageProps) {
  if (!searchParams) return null;

  try {
    // Await searchParams before using
    const params = await searchParams;

    // Convert pagination params
    const queryParams: NewsQueryParams = {
      page: params.page ? parseInt(params.page) : 1,
      itemsPerPage: params.itemsPerPage ? parseInt(params.itemsPerPage) : 10,
      type: "patch-note",
    };

    const patchNotes = await NewsService.getPatchNotes(queryParams);

    return (
      <NewsLayout
        title="Patch Notes"
        description="Latest Path of Exile 2 patch notes and game updates"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Text variant="h2" className="!mt-0">
                  All Patch Notes
                </Text>
                <Text className="text-sm text-foreground/60">
                  {patchNotes.metadata.totalItems} updates
                </Text>
              </div>
              <Link
                href="/news"
                className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 font-medium"
              >
                <ChevronLeft className="w-4 h-4" />
                Back to News
              </Link>
            </div>

            {/* Patch Notes List */}
            <div className="space-y-6">
              <div className="bg-card rounded-lg p-6 border border-border">
                <PatchNotes patchNotes={patchNotes.items} />
              </div>
            </div>
          </div>
        </div>
      </NewsLayout>
    );
  } catch (error) {
    console.error("Error loading patch notes:", error);
    notFound();
  }
}
