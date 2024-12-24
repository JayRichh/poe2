import { type Metadata } from "next";

import { mechanics } from "~/lib/mechanics/data";

const mechanic = mechanics["character-stats"];

export const metadata: Metadata = {
  title: `${mechanic.title} | POE2 Game Mechanics Guide`,
  description: `${mechanic.description}. Understand strength, dexterity, intelligence scaling, derived stats, defense mechanics, and character optimization in Path of Exile 2.`,
  keywords: [
    "POE2 character stats",
    "Path of Exile 2 attributes",
    "POE2 strength scaling",
    "POE2 dexterity scaling",
    "POE2 intelligence scaling",
    "POE2 defense mechanics",
    "POE2 armor mechanics",
    "POE2 evasion mechanics",
    "POE2 energy shield",
    "POE2 block mechanics",
    "POE2 dodge mechanics",
    "POE2 character optimization",
    "POE2 attribute requirements",
    "POE2 derived stats",
  ].join(", "),
  openGraph: {
    images: ["/skill-tree.png"],
    type: "article",
    description: mechanic.description,
    siteName: "POE2 Tools",
  },
  alternates: {
    canonical: "https://poe2.dev/mechanics/character-stats",
  },
  category: "Game Guide",
};
