import { type Metadata } from "next";

import { mechanics } from "~/lib/mechanics/data";

const mechanic = mechanics["status-effects"];

export const metadata: Metadata = {
  title: `${mechanic.title} | POE2 Game Mechanics Guide`,
  description: `${mechanic.description}. Learn about ignite, freeze, shock, bleed, poison, and other status effects in Path of Exile 2. Understand ailment thresholds, durations, and effectiveness scaling.`,
  keywords: [
    "POE2 status effects",
    "Path of Exile 2 ailments",
    "POE2 ignite mechanics",
    "POE2 freeze mechanics",
    "POE2 shock mechanics",
    "POE2 bleed mechanics",
    "POE2 poison mechanics",
    "POE2 ailment threshold",
    "POE2 ailment duration",
    "POE2 ailment scaling",
    "POE2 stun mechanics",
    "POE2 knockback effects",
  ].join(", "),
  openGraph: {
    images: ["/skill-tree.png"],
    type: "article",
    description: mechanic.description,
    siteName: "POE2 Tools",
  },
  alternates: {
    canonical: "https://poe2.dev/mechanics/status-effects",
  },
  category: "Game Guide",
};
