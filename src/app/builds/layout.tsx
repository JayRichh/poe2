import { Metadata } from "next";

export const metadata: Metadata = {
  title: "POE2 Build Statistics & Class Distribution",
  description: "Comprehensive Path of Exile 2 build statistics showing class distribution, player counts, ladder comparisons, and meta trends across different game modes.",
  openGraph: {
    title: "POE2 Build Statistics & Class Distribution",
    description: "Analyze POE2 build statistics, class distribution, and meta trends across different ladders and game modes.",
    images: ["/android-chrome-512x512.png"],
  },
  twitter: {
    card: "summary",
    title: "POE2 Build Statistics & Class Distribution",
    description: "Analyze POE2 build statistics, class distribution, and meta trends across different ladders and game modes.",
    images: ["/android-chrome-512x512.png"],
  },
  other: {
    "schema:WebPage": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "POE2 Build Statistics",
      description: "Comprehensive Path of Exile 2 build statistics and class distribution analysis.",
      primaryImageOfPage: {
        "@type": "ImageObject",
        contentUrl: "https://poe2.dev/android-chrome-512x512.png",
      },
      mainEntity: {
        "@type": "Dataset",
        name: "POE2 Build Statistics",
        description: "Statistical data about Path of Exile 2 character builds and class distribution across different game modes.",
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
