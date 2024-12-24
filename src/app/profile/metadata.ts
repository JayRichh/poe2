import { Metadata, ResolvingMetadata } from "next";

import { generateDynamicMetadata } from "~/utils/metadata";

export async function generateMetadata(
  props: { params: {} },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const metadata = await generateDynamicMetadata(props, parent, {
    title: "Profile - POE2 Tools",
    description:
      "View and manage your Path of Exile 2 character builds, settings, and preferences. Track your build progress and share your creations with the community.",
    path: "/profile",
    openGraph: {
      type: "profile",
    },
  });

  // Add noindex for private profile pages
  // You might want to make this conditional based on profile privacy settings
  return {
    ...metadata,
    robots: {
      index: true,
      follow: true,
      nocache: true, // Prevent caching of potentially sensitive data
      noarchive: true, // Prevent archiving of profile pages
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
