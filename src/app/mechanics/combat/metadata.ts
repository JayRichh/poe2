import { type Metadata } from "next";

import { mechanics } from "~/lib/mechanics/data";

const mechanic = mechanics["combat"];

export const metadata: Metadata = {
  title: `${mechanic.title} | POE2 Game Mechanics Guide`,
  description: `${mechanic.description}. Master attack speed, cast speed, critical strikes, skill gem interactions, and combat mechanics in Path of Exile 2.`,
  keywords: [
    "POE2 combat mechanics",
    "Path of Exile 2 combat system",
    "POE2 attack speed",
    "POE2 cast speed",
    "POE2 critical strikes",
    "POE2 accuracy mechanics",
    "POE2 hit calculations",
    "POE2 skill gem mechanics",
    "POE2 support gems",
    "POE2 area of effect",
    "POE2 skill interactions",
    "POE2 combat optimization",
    "POE2 attack mechanics",
    "POE2 spell mechanics",
  ].join(", "),
  openGraph: {
    images: ["/skill-tree.png"],
    type: "article",
    description: mechanic.description,
    siteName: "POE2 Tools",
  },
  alternates: {
    canonical: "https://poe2.dev/mechanics/combat",
  },
  category: "Game Guide",
};
