import { Metadata } from "next";

export const metadata: Metadata = {
  title: "POE2 Top 1000 Ladder Statistics & Class Distribution",
  description: "Comprehensive Path of Exile 2 statistics analyzing class distribution and meta trends among the top 1000 players across Standard, Hardcore, SSF, and HC SSF ladders.",
  openGraph: {
    title: "POE2 Top 1000 Ladder Statistics & Class Distribution",
    description: "Analyze POE2 class distribution and meta trends among top 1000 players across Standard, Hardcore, SSF, and HC SSF ladders.",
    images: ["/android-chrome-512x512.png"],
  },
  twitter: {
    card: "summary",
    title: "POE2 Top 1000 Ladder Statistics & Class Distribution",
    description: "Analyze POE2 class distribution and meta trends among top 1000 players across Standard, Hardcore, SSF, and HC SSF ladders.",
    images: ["/android-chrome-512x512.png"],
  },
  other: {
    "schema:WebPage": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "POE2 Top 1000 Ladder Statistics",
      description: "Comprehensive analysis of Path of Exile 2 class distribution among top 1000 players per ladder.",
      primaryImageOfPage: {
        "@type": "ImageObject",
        contentUrl: "https://poe2.dev/android-chrome-512x512.png",
      },
      mainEntity: {
        "@type": "Dataset",
        name: "POE2 Top 1000 Ladder Statistics",
        description: "Statistical data analyzing class distribution among the top 1000 Path of Exile 2 players in Standard, Hardcore, SSF, and HC SSF ladders.",
        creator: {
          "@type": "Organization",
          name: "POE2 Tools",
        },
        variableMeasured: [
          "Class Distribution",
          "Player Count",
          "Ladder Rankings",
          "Game Mode Statistics"
        ]
      }
    })
  }
};

export default function BuildsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
