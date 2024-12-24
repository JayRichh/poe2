import { Suspense } from "react";

import { GuideCard } from "~/components/guides/GuideCard";
import { GuideLayout } from "~/components/guides/GuideLayout";
import { GuidePreviewCard } from "~/components/guides/GuidePreviewCard";
import { Text } from "~/components/ui/Text";

import { guides, guidesWithMeta } from "~/lib/guides/data";
import type { GuideCategory } from "~/lib/guides/data";
import type { SectionKey } from "~/lib/guides/types";

// Guide categories organized by section
const guidesBySection: Record<SectionKey, GuideCategory[]> = {
  getting_started: ["gameplay", "character-building"],
  combat_equipment: ["combat", "equipment", "boss-fights"],
  progression_economy: ["progression", "trading", "mapping"],
  additional: ["cruel-mode"],
};

// Section titles
const sectionTitles: Record<SectionKey, string> = {
  getting_started: "Getting Started",
  combat_equipment: "Combat & Equipment",
  progression_economy: "Progression & Economy",
  additional: "Additional Content",
};

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{ category?: string }> | undefined;
}

export default async function GuidesPage({ searchParams }: PageProps) {
  if (!searchParams) return null;

  try {
    const params = await searchParams;
    const category = params.category;

    // If category is selected, show filtered view
    if (category && category in guides) {
      const guide = guides[category as GuideCategory];
      return (
        <GuideLayout title={guide.title} description={guide.description}>
          <div className="space-y-12 py-8">
            <Suspense
              fallback={
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  </div>
                </div>
              }
            >
              <GuideCard {...guide} />
            </Suspense>
          </div>
        </GuideLayout>
      );
    }

    // Show landing page with categorized guides
    return (
      <GuideLayout
        title="POE2 Guides"
        description="Comprehensive guides, tips, and tricks for Path of Exile 2"
      >
        <div className="space-y-12 py-8">
          <Suspense
            fallback={
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
              </div>
            }
          >
            {/* Render each section */}
            {(Object.entries(guidesBySection) as [SectionKey, GuideCategory[]][]).map(
              ([section, categories]) => {
                const sectionGuides = categories
                  .map((category) => guidesWithMeta.find((g) => g.id === category))
                  .filter(Boolean);

                return (
                  <section key={section}>
                    <Text variant="h3" className="text-2xl font-bold mb-6">
                      {sectionTitles[section]}
                    </Text>
                    <div
                      className={`grid grid-cols-1 ${
                        section === "getting_started"
                          ? "md:grid-cols-2 gap-6"
                          : "sm:grid-cols-2 lg:grid-cols-3 gap-4"
                      }`}
                    >
                      {sectionGuides.map(
                        (guide) =>
                          guide && (
                            <GuidePreviewCard
                              key={guide.id}
                              title={guide.title}
                              description={guide.description}
                              icon={guide.icon}
                              href={`/guides?category=${guide.id}`}
                              featured={section === "getting_started"}
                            />
                          )
                      )}
                    </div>
                  </section>
                );
              }
            )}
          </Suspense>
        </div>
      </GuideLayout>
    );
  } catch (error) {
    console.error("Error loading guides:", error);
    return null;
  }
}
