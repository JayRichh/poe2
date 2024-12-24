import { type Metadata } from "next";

import { mechanicsWithMeta } from "~/lib/mechanics/data";

export const metadata: Metadata = {
  title: "POE2 Game Mechanics | Path of Exile 2 Mechanics Guide",
  description:
    "Comprehensive guide to Path of Exile 2 game mechanics. Learn about damage types, status effects, character stats, combat mechanics, and more.",
  keywords: [
    "POE2 mechanics",
    "Path of Exile 2 damage types",
    "POE2 status effects",
    "POE2 character stats",
    "POE2 combat mechanics",
    "POE2 ailments",
    "POE2 attributes",
    "POE2 defense mechanics",
    "POE2 combat system",
    ...mechanicsWithMeta.flatMap((mechanic) => [
      `POE2 ${mechanic.title.toLowerCase()}`,
      `Path of Exile 2 ${mechanic.title.toLowerCase()}`,
    ]),
  ].join(", "),
  openGraph: {
    images: ["/skill-tree.png"],
    type: "website",
    description:
      "In-depth guides and explanations of Path of Exile 2's core game mechanics and systems.",
    siteName: "POE2 Tools",
  },
  alternates: {
    canonical: "https://poe2.dev/mechanics",
  },
  category: "Game Guide",
};
