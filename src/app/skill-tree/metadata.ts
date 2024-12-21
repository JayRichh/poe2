import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { [key: string]: string | string[] | undefined };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Get parent metadata
  const previousImages = (await parent).openGraph?.images || [];
  const previousKeywords = (await parent).keywords || [];

  const description =
    "Interactive Path of Exile 2 skill tree planner with advanced build optimization. Plan passive skills, calculate stat bonuses, and share your character builds. Features visual node connections and build saving.";

  const pageUrl = "https://poe2.dev/skill-tree";

  // Combine with parent keywords
  const skillTreeKeywords = [
    "path of exile 2 skill tree",
    "poe2 passive skills",
    "poe2 build planner",
    "path of exile 2 character builds",
    "poe2 skill calculator",
    "poe2 passive tree",
    "path of exile 2 build optimizer",
    "poe2 skill planning",
    "poe2 character optimization",
    "path of exile 2 build sharing",
    ...previousKeywords,
  ].filter((keyword): keyword is string => Boolean(keyword));

  // Enhanced schema.org data
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "POE2 Skill Tree Planner",
    applicationCategory: "GameApplication",
    operatingSystem: "Any",
    description: description,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Interactive skill tree visualization",
      "Build optimization tools",
      "Stat calculation",
      "Build sharing",
      "Visual node connections",
      "Build saving and loading",
    ],
    url: pageUrl,
    image: "https://poe2.dev/skill-tree.png",
    screenshot: "https://poe2.dev/skill-tree.png",
  };

  return {
    title: { absolute: "Skill Tree Planner | POE2 Tools" },
    description,
    keywords: skillTreeKeywords,
    openGraph: {
      title: "POE2 Skill Tree Planner - Plan Your Character Build",
      description,
      type: "website",
      url: pageUrl,
      images: [
        {
          url: "/skill-tree.png",
          width: 1200,
          height: 630,
          alt: "POE2 Skill Tree Preview",
        },
        ...previousImages,
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "POE2 Skill Tree Planner",
      description,
      images: ["/skill-tree.png"],
    },
    alternates: {
      canonical: pageUrl,
    },
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
    other: {
      "schema:WebApplication": JSON.stringify(schemaData),
      "application:type": "GameApplication",
      "application:category": "Build Planning",
      "application:features": [
        "Interactive skill tree",
        "Build optimization",
        "Stat calculation",
        "Build sharing",
      ].join(","),
    },
  };
}
