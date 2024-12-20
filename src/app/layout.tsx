import { Analytics } from "@vercel/analytics/react";
import type { Metadata, Viewport, ResolvingMetadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { NewsService } from "~/services/news-service";

import ClientLayout from "./client-layout";
import "./globals.css";

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-geist-sans",
  preload: true,
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-geist-mono",
  preload: true,
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#d97706" },
    { media: "(prefers-color-scheme: dark)", color: "#fbbf24" },
  ],
  colorScheme: "dark light"
};

type Props = {
  params: { [key: string]: string | string[] | undefined }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Get latest news for dynamic meta description
  const latestNews = await NewsService.getLatestNews();
  const latestUpdate = latestNews.find(n => n.category === "Update");
  
  const description = latestUpdate 
    ? `Latest POE2 Update: ${latestUpdate.title}. Comprehensive Path of Exile 2 toolkit featuring an interactive build planner, skill tree calculator, DPS simulator, and character optimization tools.`
    : "Comprehensive Path of Exile 2 toolkit featuring an interactive build planner, skill tree calculator, DPS simulator, and character optimization tools. Plan, analyze, and share your POE2 builds with the community.";

  // Enhanced schema.org data
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "POE2 Tools",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "description": description,
    "url": "https://poe2.dev",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Build Planning",
      "DPS Calculator",
      "Skill Tree Planner",
      "Character Optimization",
      "News Updates",
      "Community Features"
    ]
  };

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
      "poe2 character planning"
    ],
    authors: [{ name: "POE2 Tools Team" }],
    category: "Gaming Tools",
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/icon.svg", type: "image/svg+xml" }
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
          url: "/icon.svg",
          width: 192,
          height: 192,
          alt: "POE2 Tools Icon",
        },
      ],
    },
    twitter: {
      card: "summary",
      title: "POE2 Tools - Path of Exile 2 Build Planning & Tools",
      description,
      images: ["/icon.svg"],
      creator: "@poe2tools",
    },
    alternates: {
      canonical: "https://poe2.dev",
      types: {
        "application/rss+xml": "https://poe2.dev/feed.xml",
      },
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    other: {
      "schema:WebApplication": JSON.stringify(schemaData)
    }
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${plexSans.variable} ${plexMono.variable} h-full`}
    >
      <head>
        <link rel="preconnect" href="https://poe2.dev" />
        <link rel="dns-prefetch" href="https://poe2.dev" />
      </head>
      <body className="bg-background text-foreground font-sans antialiased min-h-full flex flex-col">
        <ClientLayout>{children}</ClientLayout>
        <Analytics />
      </body>
    </html>
  );
}
