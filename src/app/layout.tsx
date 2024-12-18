import { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react"
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import Script from "next/script";

import { metadata as baseMetadata, viewport as baseViewport } from "./metadata";
import "./globals.css";

export const metadata: Metadata = baseMetadata;
export const viewport: Viewport = baseViewport;

import ClientLayout from "./client-layout";

const plexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-geist-sans',
  preload: true,
  display: 'swap',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-geist-mono',
  preload: true,
  display: 'swap',
});

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
        <meta name="google-site-verification" content="REPLACE_WITH_YOUR_VERIFICATION_CODE" />
      </head>
      <body className="bg-background text-foreground font-sans antialiased min-h-full flex flex-col">
        <Script
          id="schema-org"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "POE2 Tools",
              "applicationCategory": "Game Tools",
              "operatingSystem": "Web Browser",
              "description": "Community-driven tools for Path of Exile 2 players. Build planning, DPS calculations, and more.",
              "url": "https://poe2.dev",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              }
            })
          }}
        />
        <ClientLayout>{children}</ClientLayout>
        <Analytics />
      </body>
    </html>
  );
}
