import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skill Tree - POE2 Planner",
  description:
    "Interactive skill tree planner for Path of Exile 2. Plan and share your character builds with the community.",
  keywords: ["path of exile 2", "poe2", "skill tree", "build planner", "character planning"],
  openGraph: {
    title: "POE2 Skill Tree Planner",
    description:
      "Interactive skill tree planner for Path of Exile 2. Plan and share your character builds with the community.",
    type: "website",
    images: [
      {
        url: "/skill-tree.png",
        width: 1200,
        height: 630,
        alt: "POE2 Skill Tree Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "POE2 Skill Tree Planner",
    description:
      "Interactive skill tree planner for Path of Exile 2. Plan and share your character builds with the community.",
    images: ["/skill-tree.png"],
  },
};
