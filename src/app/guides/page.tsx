import { Book } from "lucide-react";

import type { Metadata } from "next";

import { IconMap } from "~/components/mechanics/IconMap";

import { GUIDES_DATA_VERSION, guidesWithMeta } from "~/lib/guides/data";

export const metadata: Metadata = {
  title: "Guides",
  description:
    "Comprehensive guides for Path of Exile 2. Master character building, equipment crafting, combat mechanics, trading, boss fights, and endgame mapping. Essential tips for new and experienced players.",
  alternates: {
    canonical: "/guides",
  },
  openGraph: {
    title: "POE2 Guides & Tutorials",
    description:
      "Comprehensive guides for Path of Exile 2 covering builds, crafting, mechanics, trading, bosses, and endgame strategies.",
    type: "article",
    images: ["/skill-tree.png"],
  },
};

export default function GuidesPage() {
  return (
    <div className="w-full space-y-4 sm:space-y-6">
      <div className="flex justify-end">
        <span className="px-2 py-1 text-xs rounded-md bg-primary/10 text-primary/90">
          Data: {GUIDES_DATA_VERSION}
        </span>
      </div>
      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 auto-rows-fr">
      {guidesWithMeta.map((guide) => {
        const Icon = IconMap[guide.icon] || Book;
        return (
          <a
            key={guide.id}
            href={`/guides/${guide.id}`}
            className="group flex flex-col p-6 rounded-xl border border-border/50 hover:border-primary/50 transition-colors bg-background/50 hover:bg-background/80"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold group-hover:text-primary transition-colors">
                {guide.title}
              </h3>
            </div>
            <p className="text-sm text-foreground/70 flex-grow">{guide.description}</p>
            {guide.sections.length > 0 && (
              <p className="text-xs text-primary mt-3">
                {guide.sections.length} section{guide.sections.length !== 1 ? "s" : ""}
              </p>
            )}
          </a>
        );
      })}
      </div>
    </div>
  );
}
