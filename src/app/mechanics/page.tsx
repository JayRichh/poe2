import { Book } from "lucide-react";

import type { Metadata } from "next";

import { IconMap } from "~/components/mechanics/IconMap";

import { MECHANICS_DATA_VERSION, mechanicsWithMeta } from "~/lib/mechanics/data";

export const metadata: Metadata = {
  title: "Game Mechanics",
  description:
    "Comprehensive guide to Path of Exile 2 game mechanics. Learn about damage types, status effects, character stats, combat mechanics, ailments, and defenses.",
  alternates: {
    canonical: "/mechanics",
  },
  openGraph: {
    title: "POE2 Game Mechanics",
    description:
      "In-depth guides and explanations of Path of Exile 2's core game mechanics and systems.",
    type: "website",
    images: ["/skill-tree.png"],
  },
};

export default function MechanicsPage() {
  return (
    <div className="w-full space-y-4 sm:space-y-6">
      <div className="flex justify-end">
        <span className="px-2 py-1 text-xs rounded-md bg-primary/10 text-primary/90">
          Data: {MECHANICS_DATA_VERSION}
        </span>
      </div>
      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 auto-rows-fr">
      {mechanicsWithMeta.map((mechanic) => {
        const Icon = IconMap[mechanic.icon] || Book;
        return (
          <a
            key={mechanic.id}
            href={`/mechanics/${mechanic.id}`}
            className="group flex flex-col p-6 rounded-xl border border-border/50 hover:border-primary/50 transition-colors bg-card/50 hover:bg-card/80"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold group-hover:text-primary transition-colors">
                {mechanic.title}
              </h3>
            </div>
            <p className="text-sm text-foreground/70 flex-grow">{mechanic.description}</p>
            {mechanic.sections.length > 0 && (
              <p className="text-xs text-primary mt-3">
                {mechanic.sections.length} section{mechanic.sections.length !== 1 ? "s" : ""}
              </p>
            )}
          </a>
        );
      })}
      </div>
    </div>
  );
}
