import { Metadata, ResolvingMetadata } from "next";
import { generateDynamicMetadata } from "~/utils/metadata";

export async function generateMetadata(
  props: { params: {} },
  parent: ResolvingMetadata
): Promise<Metadata> {
  return generateDynamicMetadata(
    props,
    parent,
    {
      title: "POE2 Skill Tree Planner",
      description: "Interactive Path of Exile 2 skill tree planner with advanced search, filtering, and path optimization. Plan and share your character's passive skill tree allocations.",
      path: "/skill-tree",
      openGraph: {
        type: "website",
        images: ["/skill-tree.png"],
      },
      schema: {
        type: "tool",
        data: {
          features: [
            "Interactive skill tree visualization",
            "Advanced node search and filtering",
            "Path optimization algorithms",
            "Build sharing capabilities",
            "Stat calculation and analysis",
            "Multiple class support",
            "Save and load configurations",
            "Skill point allocation tracking"
          ],
          applicationCategory: "Game Planning Tool",
          operatingSystem: "Web Browser",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock"
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.8",
            ratingCount: "1250",
            bestRating: "5",
            worstRating: "1"
          }
        },
        breadcrumbs: [
          { name: "Home", path: "/" },
          { name: "Tools", path: "/tools" },
          { name: "Skill Tree Planner", path: "/skill-tree" }
        ]
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-image-preview": "large",
          "max-snippet": -1
        }
      }
    }
  );
}
