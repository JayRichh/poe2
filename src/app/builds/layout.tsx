import { Metadata } from "next";

export const metadata: Metadata = {
  title: "POE2 Meta Builds & Top 1000 Ladder Statistics 2025",
  description: "Discover the current POE2 meta builds and most powerful character builds based on comprehensive analysis of Path of Exile 2's top 1000 players. Updated daily with latest meta trends, class distribution, and build statistics across Standard, Hardcore, SSF, and HC SSF leagues.",
  keywords: [
    // Meta Build Keywords
    "poe2 meta builds",
    "best poe2 builds 2025",
    "top poe2 builds",
    "path of exile 2 meta",
    "poe2 build tier list",
    "strongest poe2 builds",
    "current poe2 meta",
    "poe2 class tier list",
    "best poe2 classes 2025",
    "poe2 ladder builds",
    // Build Types
    "poe2 stormweaver build",
    "poe2 infernalist build",
    "poe2 lightning build",
    "poe2 minion build",
    "poe2 bleed build",
    // Build Categories
    "poe2 starter builds",
    "poe2 endgame builds",
    "poe2 hardcore builds",
    "poe2 ssf builds",
    "poe2 league starter"
  ],
  openGraph: {
    title: "POE2 Meta Builds & Top 1000 Ladder Statistics 2025",
    description: "Discover the current POE2 meta builds and most powerful character builds based on comprehensive analysis of Path of Exile 2's top 1000 players. Updated daily with latest meta trends.",
    images: ["/android-chrome-512x512.png"],
    type: "website",
    siteName: "POE2 Tools",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "POE2 Meta Builds & Top 1000 Ladder Statistics 2025",
    description: "Discover the current POE2 meta builds and most powerful character builds based on comprehensive analysis of Path of Exile 2's top 1000 players. Updated daily with latest meta trends.",
    images: ["/android-chrome-512x512.png"],
    creator: "@poe2tools",
    site: "@poe2tools",
  },
  other: {
    "schema:WebPage": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "POE2 Meta Builds & Top 1000 Ladder Statistics",
      description: "Comprehensive analysis of current Path of Exile 2 meta builds and class distribution among top 1000 players.",
      primaryImageOfPage: {
        "@type": "ImageObject",
        contentUrl: "https://poe2.dev/android-chrome-512x512.png",
      },
      mainEntity: {
        "@type": "Dataset",
        name: "POE2 Meta Builds Statistics",
        description: "Statistical data analyzing meta builds and class distribution among the top 1000 Path of Exile 2 players across all leagues.",
        creator: {
          "@type": "Organization",
          name: "POE2 Tools",
        },
        variableMeasured: [
          "Meta Build Distribution",
          "Class Popularity",
          "Build Performance",
          "League Statistics",
          "Build Win Rates",
          "Skill Gem Usage",
          "Ascendancy Choices",
          "Character Progression"
        ],
        dateModified: new Date().toISOString(),
        temporalCoverage: "2025-01",
        spatialCoverage: "Global",
        includedInDataCatalog: {
          "@type": "DataCatalog",
          name: "POE2 Build Statistics"
        }
      }
    }),
    "schema:FAQPage": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What are the best POE2 builds in 2025?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Based on our analysis of the top 1000 players, the current meta builds include Lightning builds for Stormweaver, Minion builds for Infernalist, and Bleed builds for Witchhunter. These builds show consistently high performance across all leagues."
          }
        },
        {
          "@type": "Question",
          name: "What is the current POE2 meta?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The current POE2 meta favors builds focusing on consistent damage output and survivability. Top performing builds utilize a combination of defensive layers and efficient damage scaling through skill gem synergies."
          }
        },
        {
          "@type": "Question",
          name: "Which POE2 class is best for beginners?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "For beginners, the Stormweaver class with Lightning builds offers a good balance of damage and survivability. The straightforward gameplay mechanics and build flexibility make it an excellent choice for new players."
          }
        }
      ]
    }),
    "schema:Article": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "POE2 Meta Builds & Class Tier List 2025",
      description: "In-depth analysis of the current Path of Exile 2 meta builds and class performance based on top 1000 player data.",
      author: {
        "@type": "Organization",
        name: "POE2 Tools"
      },
      publisher: {
        "@type": "Organization",
        name: "POE2 Tools",
        logo: {
          "@type": "ImageObject",
          url: "https://poe2.dev/android-chrome-512x512.png"
        }
      },
      datePublished: new Date().toISOString(),
      dateModified: new Date().toISOString(),
      image: "https://poe2.dev/android-chrome-512x512.png"
    })
  }
};

export default function BuildsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
