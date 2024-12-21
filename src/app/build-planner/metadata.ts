import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Build Planner - POE2 Tools",
  description:
    "Plan, optimize, and share your Path of Exile 2 character builds. Interactive build planner with skill tree, equipment, and stat calculations.",
  openGraph: {
    title: "POE2 Build Planner - Create and Share POE2 Builds",
    description:
      "Plan, optimize, and share your Path of Exile 2 character builds. Interactive build planner with skill tree, equipment, and stat calculations.",
    images: [
      {
        url: "/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "POE2 Tools Icon",
        type: "image/png",
      },
    ],
  },
  other: {
    "schema:SoftwareApplication": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "POE2 Build Planner",
      applicationCategory: "GameApplication",
      operatingSystem: "Web Browser",
      description:
        "Plan, optimize, and share your Path of Exile 2 character builds. Interactive build planner with skill tree, equipment, and stat calculations.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      featureList: [
        "Interactive Skill Tree",
        "Equipment Planning",
        "Stat Calculations",
        "Build Sharing",
        "Build Templates",
        "Build Versioning",
      ],
    }),
  },
};
