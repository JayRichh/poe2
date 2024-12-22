import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "POE2 News & Updates",
    description: "Latest news, announcements, updates, and patch notes for Path of Exile 2.",
    alternates: {
      canonical: "https://poe2.dev/news",
    },
    openGraph: {
      title: "POE2 News & Updates",
      description: "Latest news, announcements, updates, and patch notes for Path of Exile 2.",
      url: "https://poe2.dev/news",
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
    }
  };
}
