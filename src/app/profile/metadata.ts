import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile - POE2 Tools",
  description:
    "Manage your POE2 Tools profile, builds, and settings. View your saved builds, track build history, and customize your preferences.",
  openGraph: {
    title: "POE2 Tools Profile - Manage Your Builds & Settings",
    description:
      "Manage your POE2 Tools profile, builds, and settings. View your saved builds, track build history, and customize your preferences.",
    images: [
      {
        url: "/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "POE2 Tools Icon",
        type: "image/png",
      },
    ],
  },
  other: {
    "schema:ProfilePage": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      name: "POE2 Tools User Profile",
      description: "User profile page for POE2 Tools platform",
      mainEntity: {
        "@type": "Person",
        description: "Path of Exile 2 player profile with saved builds and preferences",
        potentialAction: {
          "@type": "UpdateAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://poe2.dev/profile/settings",
            description: "Profile settings page",
          },
        },
      },
      significantLink: [
        {
          "@type": "LinkRole",
          url: "https://poe2.dev/build-planner",
          linkRelationship: "builds",
        },
        {
          "@type": "LinkRole",
          url: "https://poe2.dev/dps-calc",
          linkRelationship: "calculations",
        },
      ],
    }),
    "schema:ItemList": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "User's POE2 Builds",
      description: "Collection of user's saved Path of Exile 2 character builds",
      itemListOrder: "ItemListOrderDescending",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Saved Builds",
          description: "Access and manage your saved character builds",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Build History",
          description: "View and restore previous versions of your builds",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Profile Settings",
          description: "Customize your POE2 Tools experience",
        },
      ],
    }),
  },
};
