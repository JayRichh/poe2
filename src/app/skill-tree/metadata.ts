import { Metadata, ResolvingMetadata } from "next";

import { generateDynamicMetadata } from "~/utils/metadata";

export async function generateMetadata(
  props: { params: {} },
  parent: ResolvingMetadata
): Promise<Metadata> {
  return generateDynamicMetadata(props, parent, {
    title: "POE2 Skill Tree Planner - Path of Exile 2 Passive Tree Builder",
    description:
      "Plan your Path of Exile 2 character's passive skill tree with our interactive planner. Features advanced search, path optimization, stat tracking, and integration with our build planner. Optimize your character's progression with detailed node analysis.",
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
          "Optimal path calculation algorithms",
          "Real-time stat tracking and analysis",
          "Multiple class and ascendancy support",
          "Build planner integration",
          "Save and share skill tree configurations",
          "Skill point allocation efficiency tools",
          "Node highlight and pathing preview",
          "Attribute requirement calculations",
          "Passive tree version history",
          "Export and import configurations",
          "Mobile-friendly interface",
          "Detailed node tooltips",
          "Quick reset and respec tools",
        ],
        keywords: [
          "poe2 skill tree",
          "path of exile 2 passive tree",
          "poe2 passive planner",
          "poe2 skill tree calculator",
          "path of exile 2 build tree",
          "poe2 node calculator",
          "poe2 skill path optimizer",
          "poe2 passive skills",
          "path of exile 2 tree planner",
          "poe2 skill allocation",
          "poe2 ascendancy tree",
          "poe2 character tree",
          "poe2 skill points",
          "path of exile 2 passive skills",
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
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          ratingCount: "1250",
          bestRating: "5",
          worstRating: "1",
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
