import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Skill Tree Planner | POE2 Tools"
  },
  description:
    "Interactive Path of Exile 2 skill tree planner with advanced build optimization. Plan passive skills, calculate stat bonuses, and share your character builds. Features visual node connections and build saving.",
  keywords: [
    "path of exile 2 skill tree",
    "poe2 passive skills",
    "poe2 build planner",
    "path of exile 2 character builds",
    "poe2 skill calculator",
    "poe2 passive tree",
    "path of exile 2 build optimizer",
    "poe2 skill planning",
    "poe2 character optimization",
    "path of exile 2 build sharing"
  ],
  openGraph: {
    title: {
      absolute: "POE2 Skill Tree Planner"
    },
    description:
      "Interactive Path of Exile 2 skill tree planner with advanced build optimization. Plan passive skills, calculate stat bonuses, and share your character builds. Features visual node connections and build saving.",
    type: "website",
    locale: "en_US",
    siteName: "POE2 Tools",
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
      "Interactive Path of Exile 2 skill tree planner with advanced build optimization. Plan passive skills, calculate stat bonuses, and share your character builds. Features visual node connections and build saving.",
    images: ["/skill-tree.png"],
  },
  alternates: {
    canonical: "https://poe2.dev/skill-tree",
  },
  other: {
    "schema:WebApplication": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "POE2 Skill Tree Planner",
      "applicationCategory": "GameApplication",
      "operatingSystem": "Any",
      "description": "Interactive Path of Exile 2 skill tree planner with advanced build optimization. Plan passive skills, calculate stat bonuses, and share your character builds.",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    })
  }
};
