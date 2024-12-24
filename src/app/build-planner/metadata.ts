import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "POE2 Build Planner - Path of Exile 2 Character Builder & Optimizer",
  description:
    "Create, optimize, and share your Path of Exile 2 character builds. Advanced build planner featuring interactive skill tree, equipment loadouts, gem configurations, and detailed stat calculations. Plan your POE2 character progression with our comprehensive toolkit.",
  openGraph: {
    type: "website",
    images: ["/build-planner-bg.jpg"],
  },
  other: {
    "schema:SoftwareApplication": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "POE2 Build Planner",
      applicationCategory: "GameApplication",
      operatingSystem: "Web Browser",
      description:
        "Create and optimize your Path of Exile 2 character builds with our comprehensive build planning toolkit. Features interactive skill tree, equipment loadouts, and detailed stat calculations.",
      keywords: [
        "poe2 build planner",
        "path of exile 2 character builder",
        "poe2 skill tree planner",
        "poe2 character optimizer",
        "path of exile 2 builds",
        "poe2 build calculator",
        "poe2 character planner",
        "path of exile 2 skill tree",
        "poe2 gem calculator",
        "poe2 equipment planner",
        "poe2 ascendancy planner",
        "poe2 build guide",
        "poe2 character progression",
        "poe2 build sharing",
        "poe2 build templates",
      ],
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      featureList: [
        "Interactive Skill Tree Planning",
        "Equipment & Gem Configuration",
        "Detailed Stat Calculations",
        "Build Templates & Sharing",
        "Character Progression Planning",
        "Multiple Ascendancy Support",
        "Build Version History",
        "DPS & Defense Calculations",
        "Build Export & Import",
        "Real-time Stat Updates",
        "Equipment Comparison Tools",
        "Gem Socket Planning",
        "Build Optimization Tips",
        "Save & Load Builds",
        "Build Sharing Community",
      ],
    }),
  },
};
