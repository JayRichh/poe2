import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile Settings",
  description: "Manage your POE2 Tools account settings, Path of Exile connections, and preferences.",
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "Profile Settings",
    description: "Manage your POE2 Tools account settings and Path of Exile connections.",
    type: "profile",
    url: "https://poe2.dev/profile",
  },
  alternates: {
    canonical: "https://poe2.dev/profile",
  },
};

// No generateMetadata needed since this is a protected route
// and we don't want to expose user-specific data in metadata
