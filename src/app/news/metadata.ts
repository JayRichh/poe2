import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "POE2 News & Updates - Path of Exile 2 Latest Information Hub",
    description:
      "Stay updated with the latest Path of Exile 2 news, patch notes, community announcements, event schedules, and marketplace updates. Track game changes affecting builds, skills, and mechanics.",
    alternates: {
      canonical: "https://poe2.dev/news",
    },
    openGraph: {
      type: "website",
      images: ["/android-chrome-512x512.png"],
    },
    other: {
      "schema:WebPage": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "POE2 News & Updates",
        description:
          "Comprehensive Path of Exile 2 news hub featuring latest updates, patch notes, and community announcements.",
        keywords: [
          "poe2 news",
          "path of exile 2 updates",
          "poe2 patch notes",
          "path of exile 2 announcements",
          "poe2 event schedule",
          "poe2 marketplace updates",
          "path of exile 2 changes",
          "poe2 build updates",
          "poe2 skill changes",
          "path of exile 2 mechanics",
          "poe2 community news",
          "poe2 game updates",
          "path of exile 2 development",
          "poe2 feature announcements",
          "poe2 balance changes",
        ],
        mainContentOfPage: {
          "@type": "WebPageElement",
          about: {
            "@type": "Thing",
            name: "Path of Exile 2 Updates",
          },
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          contentUrl: "https://poe2.dev/android-chrome-512x512.png",
        },
        breadcrumb: {
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
              name: "News & Updates",
              item: "https://poe2.dev/news",
            },
          ],
        },
      }),
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
  };
}
