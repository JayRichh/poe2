import { Metadata } from "next";

export const metadata: Metadata = {
  title: "POE2 Guides - Tips & Tricks",
  description: "Comprehensive guides for Path of Exile 2. Master character building, equipment crafting, combat mechanics, trading, boss fights, endgame mapping and more. Essential tips for both new and experienced players.",
  openGraph: {
    title: "POE2 Guides & Tutorials - Path of Exile 2",
    description: "Comprehensive guides for Path of Exile 2. Master character building, equipment crafting, combat mechanics, trading, boss fights, endgame mapping and more.",
    type: "article",
    images: [
      {
        url: "/skill-tree.png",
        width: 1920,
        height: 1080,
        alt: "POE2 Skill Tree"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "POE2 Guides & Tutorials",
    description: "Master POE2 with our comprehensive guides covering builds, mechanics, and endgame strategies.",
    images: ["/skill-tree.png"]
  },
  other: {
    "schema:Article": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "POE2 Guides - Tips & Tricks",
      description: "Comprehensive guides for Path of Exile 2. Master character building, equipment crafting, combat mechanics, trading, boss fights, endgame mapping and more.",
      image: "https://poe2.dev/skill-tree.png",
      author: {
        "@type": "Organization",
        name: "POE2 Tools Team"
      },
      publisher: {
        "@type": "Organization",
        name: "POE2 Tools",
        logo: {
          "@type": "ImageObject",
          url: "https://poe2.dev/android-chrome-512x512.png"
        }
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": "https://poe2.dev/guides"
      }
    })
  }
};
