import { type Metadata } from "next";

import { mechanics } from "~/lib/mechanics/data";

const mechanic = mechanics["damage-types"];

export const metadata: Metadata = {
  title: `${mechanic.title} | POE2 Game Mechanics Guide`,
  description: `${mechanic.description}. Learn about physical damage, elemental damage types, damage conversion, penetration, and resistance mechanics in Path of Exile 2.`,
  keywords: [
    "POE2 damage types",
    "Path of Exile 2 damage",
    "POE2 physical damage",
    "POE2 elemental damage",
    "POE2 damage conversion",
    "POE2 penetration mechanics",
    "POE2 resistance mechanics",
    "POE2 damage over time",
    "POE2 bleed mechanics",
    "POE2 fire damage",
    "POE2 cold damage",
    "POE2 lightning damage",
  ].join(", "),
  openGraph: {
    images: ["/skill-tree.png"],
    type: "article",
    description: mechanic.description,
    siteName: "POE2 Tools",
  },
  alternates: {
    canonical: "https://poe2.dev/mechanics/damage-types",
  },
  category: "Game Guide",
};
