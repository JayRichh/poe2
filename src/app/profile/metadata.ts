import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { [key: string]: string | string[] | undefined }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const pageUrl = "https://poe2.dev/profile";
  const description = "Manage your POE2 Tools account settings, Path of Exile connections, and preferences.";

  return {
    title: { absolute: "Profile Settings | POE2 Tools" },
    description,
    robots: {
      index: false,
      follow: false,
      nocache: true,
      googleBot: {
        index: false,
        follow: false,
        noimageindex: true,
        'max-video-preview': -1,
        'max-image-preview': 'none',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title: "Profile Settings | POE2 Tools",
      description,
      type: "profile",
      url: pageUrl,
      // Deliberately omit images for privacy
    },
    twitter: {
      card: "summary",
      title: "Profile Settings | POE2 Tools",
      description,
    },
    alternates: {
      canonical: pageUrl,
    },
    other: {
      // Security headers as metadata
      "referrer": "same-origin",
      "x-frame-options": "DENY",
      "x-content-type-options": "nosniff",
      "permissions-policy": [
        "geolocation=()",
        "camera=()",
        "microphone=()"
      ].join(", "),
      "content-security-policy": [
        "default-src 'self'",
        "img-src 'self' data: https:",
        "script-src 'self'",
        "style-src 'self' 'unsafe-inline'",
        "connect-src 'self' https://api.pathofexile.com"
      ].join("; "),
      // Additional privacy metadata
      "privacy:type": "protected-route",
      "privacy:requires-auth": "true",
      "privacy:data-collection": "minimal",
      "privacy:data-retention": "user-controlled"
    },
    verification: {
      // Prevent any third-party verification on protected routes
      google: null,
      yahoo: null,
      yandex: null,
      me: null,
    },
  };
}
