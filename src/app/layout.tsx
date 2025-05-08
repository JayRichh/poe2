import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";

import { generateMetadata } from "../config/metadata";
import { viewport } from "../config/viewport";
import ClientLayout from "./client-layout";
import "./globals.css";

export { viewport, generateMetadata };

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-sans",
  display: "optional",
  preload: true,
  adjustFontFallback: true,
  fallback: [
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "sans-serif",
  ],
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "optional",
  preload: true,
  adjustFontFallback: true,
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
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
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* <link rel="preload" href="/skill-tree.png" as="image" type="image/png" /> */}
        <meta
          name="google-site-verification"
          content={process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION}
        />
        <meta name="msvalidate.01" content={process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION} />
        <meta
          name="yandex-verification"
          content={process.env.NEXT_PUBLIC_YANDEX_SITE_VERIFICATION}
        />
        <meta name="google-adsense-account" content="ca-pub-3287461191996714">
      </head>
      <body className="bg-background text-foreground font-sans antialiased min-h-full flex flex-col">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
