import { Metadata, ResolvingMetadata } from "next";

import { NewsService } from "../services/news-service";

type Props = {
  params: { [key: string]: string | string[] | undefined };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const latestNews = await NewsService.getLatestNews();
  const latestUpdate = latestNews.find((n) => n.category === "Update");

  const description = latestUpdate
    ? `Latest POE2 Update: ${latestUpdate.title}. Comprehensive Path of Exile 2 toolkit featuring an interactive build planner, skill tree calculator, DPS simulator, and character optimization tools.`
    : "Comprehensive Path of Exile 2 toolkit featuring an interactive build planner, skill tree calculator, DPS simulator, and character optimization tools. Plan, analyze, and share your POE2 builds with the community.";

  const schemaData = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "POE2 Tools",
      url: "https://poe2.dev",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://poe2.dev/build-planner?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "POE2 Tools",
      applicationCategory: "GameApplication",
      operatingSystem: "Web Browser",
      description: description,
      url: "https://poe2.dev",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      featureList: [
        "Advanced Build Planning & Optimization",
        "Interactive Skill Tree Planner",
        "Real-time DPS Calculator",
        "Equipment & Gem Configuration",
        "Character Progression Planning",
        "Build Templates & Sharing",
        "Multiple Ascendancy Support",
        "Build Version History",
        "Community Build Guides",
        "News & Updates",
        "Build Export & Import",
        "Equipment Comparison",
        "Gem Socket Planning",
        "Build Optimization Tips",
        "Save & Load Builds",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://poe2.dev",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Build Planner",
          item: "https://poe2.dev/build-planner",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "DPS Calculator",
          item: "https://poe2.dev/dps-calc",
        },
      ],
    },
  ];

  return {
    metadataBase: new URL("https://poe2.dev"),
    title: {
      template: "%s | POE2 Tools",
      default: "POE2 Tools - Path of Exile 2 Build Planning & Tools",
    },
    description,
    keywords: [
      // Core Game Terms
      "path of exile 2",
      "poe2",
      "path of exile 2 tools",
      "poe2 tools",

      // Build Planning
      "poe2 build planner",
      "path of exile 2 build planner",
      "poe2 character builder",
      "poe2 build templates",
      "poe2 build guides",
      "poe2 build sharing",
      "poe2 build optimization",
      "poe2 character planning",
      "poe2 character progression",

      // Skill Tree
      "poe2 skill tree",
      "path of exile 2 skill tree",
      "poe2 passive tree",
      "poe2 skill points",
      "poe2 skill planning",
      "poe2 node calculator",

      // Classes & Ascendancies
      "poe2 classes",
      "poe2 ascendancies",
      "poe2 ascendancy builds",
      "poe2 class builds",
      "poe2 character classes",

      // DPS & Combat
      "poe2 dps calculator",
      "path of exile 2 damage calculator",
      "poe2 damage types",
      "poe2 critical strikes",
      "poe2 attack speed",
      "poe2 elemental damage",
      "poe2 physical damage",
      "poe2 chaos damage",

      // Equipment & Items
      "poe2 equipment planner",
      "poe2 gear optimizer",
      "poe2 item stats",
      "poe2 weapon calculator",
      "poe2 armor calculator",

      // Skills & Gems
      "poe2 skill gems",
      "poe2 gem calculator",
      "poe2 support gems",
      "poe2 skill combinations",
      "poe2 gem links",

      // Game Updates
      "poe2 patch notes",
      "poe2 updates",
      "path of exile 2 news",
      "poe2 game changes",
      "poe2 meta updates",
    ],
    authors: [{ name: "POE2 Tools Team" }],
    category: "Gaming Tools",
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/icon.svg", type: "image/svg+xml" },
      ],
      shortcut: ["/favicon.ico"],
      apple: [{ url: "/icon.svg" }],
    },
    manifest: "/manifest.json",
    openGraph: {
      title: "POE2 Tools - Path of Exile 2 Build Planning & Tools",
      description,
      type: "website",
      locale: "en_US",
      siteName: "POE2 Tools",
      images: [
        {
          url: "/android-chrome-512x512.png",
          width: 512,
          height: 512,
          alt: "POE2 Tools Icon",
          type: "image/png",
        },
        {
          url: "/android-chrome-192x192.png",
          width: 192,
          height: 192,
          alt: "POE2 Tools Icon",
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary",
      title: "POE2 Tools - Path of Exile 2 Build Planning & Tools",
      description,
      images: ["/android-chrome-512x512.png"],
      creator: "@poe2tools",
    },
    alternates: {
      types: {
        "application/rss+xml": "https://poe2.dev/feed.xml",
      },
    },
    // Canonical URL will be set per-page
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
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
    other: {
      "schema:WebApplication": JSON.stringify(schemaData),
    },
  };
}
