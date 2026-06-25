import { ChevronLeft } from "lucide-react";

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { MajorUpdateTimeline } from "~/components/news/MajorUpdateTimeline";
import { NewsLayout } from "~/components/news/NewsLayout";
import { PatchNotes } from "~/components/news/PatchNotes";
import { Text } from "~/components/ui/Text";

import { NewsService } from "~/services/news-service";
import type { NewsQueryParams } from "~/types/news";

export const metadata: Metadata = {
  title: "Patch Notes",
  description:
    "Browse Path of Exile 2 patch notes and major update history. Track balance changes, skill reworks, bug fixes, and new content across every game version.",
  alternates: {
    canonical: "/news/patch-notes",
  },
  openGraph: {
    title: "POE2 Patch Notes",
    description:
      "Path of Exile 2 patch notes and update history: balance changes, skill reworks, and new content by version.",
    type: "website",
    images: ["/android-chrome-512x512.png"],
  },
};

function formatAsOf(date: string) {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return date;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

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

    const [patchNotes, versionGroups, dataAsOf] = await Promise.all([
      NewsService.getPatchNotes(queryParams),
      NewsService.getMajorVersionGroups(),
      NewsService.getDataAsOf(),
    ]);

    const hasNotes = patchNotes.items.length > 0;

    return (
      <NewsLayout
        title="Patch Notes"
        description="Path of Exile 2 patch notes and major-update history"
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
                  {dataAsOf && (
                    <span className="text-foreground/40"> &middot; as of {formatAsOf(dataAsOf)}</span>
                  )}
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

            {/* Major-update timeline (grouped by 0.x version) */}
            <div className="bg-card rounded-lg p-6 border border-border">
              <MajorUpdateTimeline groups={versionGroups} />
            </div>

            {/* Patch Notes List */}
            <div className="space-y-6">
              <div className="bg-card rounded-lg p-6 border border-border">
                {hasNotes ? (
                  <PatchNotes patchNotes={patchNotes.items} />
                ) : (
                  <div className="py-8 text-center">
                    <Text variant="h4" className="mb-2">
                      No patch notes available
                    </Text>
                    <Text className="text-sm text-foreground/60">
                      The patch-note archive is currently empty or could not be loaded.
                    </Text>
                  </div>
                )}
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
