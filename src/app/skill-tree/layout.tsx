import { Metadata, ResolvingMetadata } from "next";

import { generateDynamicMetadata } from "~/utils/metadata";

import { SkillTreeLayoutClient } from "./SkillTreeLayoutClient";
import "./styles/skill-tree.css";

export async function generateMetadata(
  _props: unknown,
  parent: ResolvingMetadata
): Promise<Metadata> {
  return generateDynamicMetadata({ params: {} }, parent, {
    title: "POE2 Skill Tree Planner - Path of Exile 2 Passive Tree Builder",
    description:
      "Plan your Path of Exile 2 character's passive skill tree with our interactive planner. Features advanced search, stat tracking, and shareable builds. Optimize your character's progression with detailed node analysis.",
    path: "/skill-tree",
    openGraph: {
      type: "website",
      images: ["/skill-tree.png"],
    },
    schema: {
      type: "tool",
      data: {
        features: [
          "Interactive skill tree visualization with zoom and pan",
          "Advanced node search with attribute filtering",
          "Real-time stat tracking and analysis",
          "Multiple class and ascendancy support",
          "Save and share skill tree configurations",
          "Detailed node tooltips",
          "Quick reset and respec tools",
          "Export and import configurations",
        ],
        keywords: [
          "poe2 skill tree",
          "path of exile 2 passive tree",
          "poe2 passive planner",
          "poe2 skill tree calculator",
          "path of exile 2 build tree",
          "poe2 ascendancy tree",
          "poe2 skill points",
          "poe2 tree optimizer",
        ],
        applicationCategory: "Game Planning Tool",
        operatingSystem: "Web Browser",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
      },
      breadcrumbs: [
        { name: "Home", path: "/" },
        { name: "Tools", path: "/tools" },
        { name: "Skill Tree Planner", path: "/skill-tree" },
      ],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  });
}

export default function SkillTreeLayout({ children }: { children: React.ReactNode }) {
  return <SkillTreeLayoutClient>{children}</SkillTreeLayoutClient>;
}
