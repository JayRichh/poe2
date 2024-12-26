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
  display: "swap",
  adjustFontFallback: false,
  fallback: ["system-ui", "sans-serif"],
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
  adjustFontFallback: false,
  fallback: ["monospace"],
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
        <link rel="preload" href="/skill-tree.png" as="image" type="image/png" />
        <link rel="preload" href="/ascendancies/acolyte.webp" as="image" type="image/webp" />
        <meta
          name="google-site-verification"
          content={process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION}
        />
        <meta name="msvalidate.01" content={process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION} />
        <meta
          name="yandex-verification"
          content={process.env.NEXT_PUBLIC_YANDEX_SITE_VERIFICATION}
        />
      </head>
      <body className="bg-background text-foreground font-sans antialiased min-h-full flex flex-col">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
