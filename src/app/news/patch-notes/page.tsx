import { Suspense } from "react";

import { notFound } from "next/navigation";

import { NewsLayout } from "~/components/news/NewsLayout";
import { PatchNotes } from "~/components/news/PatchNotes";
import { Text } from "~/components/ui/Text";

import { NewsService } from "~/services/news-service";

export const metadata = {
  title: "Patch Notes - Path of Exile 2",
  description: "Latest patch notes and updates for Path of Exile 2",
};

export default async function PatchNotesPage() {
  try {
    const patchNotes = await NewsService.getPatchNotes();

    if (!patchNotes.length) {
      notFound();
    }

    return (
      <NewsLayout title="Patch Notes" description="Latest game updates and changes">
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
            <div className="bg-card rounded-lg p-6 border border-border">
              <PatchNotes patchNotes={patchNotes} />
            </div>
          </Suspense>
        </div>
      </NewsLayout>
    );
  } catch (error) {
    console.error("Error loading patch notes:", error);
    notFound();
  }
}
