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
        "Build Planning",
        "DPS Calculator",
        "Skill Tree Planner",
        "Character Optimization",
        "News Updates",
        "Community Features",
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
      "path of exile 2",
      "poe2",
      "build planner",
      "dps calculator",
      "skill tree planner",
      "poe tools",
      "character builder",
      "poe2 builds",
      "path of exile 2 calculator",
      "poe2 character optimization",
      "poe2 skill simulator",
      "path of exile 2 guides",
      "poe2 build guides",
      "poe2 character planning",
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
