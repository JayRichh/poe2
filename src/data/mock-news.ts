import { NewsItem, PatchNote } from "~/types/news";

export const MOCK_PATCH_NOTES: PatchNote[] = [
  {
    version: "0.5.0",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    url: "https://www.pathofexile.com/forum/patch-0.5.0",
    author: "Grinding Gear Games",
    lastBumped: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    sections: [{
      title: "Changes",
      changes: [
        "Added new skill gems",
        "Balance adjustments to existing skills",
        "Performance improvements"
      ]
    }]
  },
  {
    version: "0.4.9",
    date: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    url: "https://www.pathofexile.com/forum/patch-0.4.9",
    author: "Grinding Gear Games",
    lastBumped: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    sections: [{
      title: "Changes",
      changes: [
        "Bug fixes",
        "UI improvements",
        "New character customization options"
      ]
    }]
  }
];

export const MOCK_NEWS: NewsItem[] = [
  {
    id: "poe2-beta-weekend-announced",
    title: "Path of Exile 2 Beta Weekend Announced",
    description:
      "Join us for an exclusive beta test of Path of Exile 2 this weekend. Test new features and provide feedback.",
    category: "Event",
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    source: "Official",
    url: "https://www.pathofexile.com/news/beta-weekend",
  },
  {
    id: "latest-development-update",
    title: "Latest Development Update",
    description:
      "Check out the latest changes and improvements coming to Path of Exile 2, including new skills and balance changes.",
    category: "Update",
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    source: "Official",
    url: "https://www.pathofexile.com/news/dev-update",
  },
  {
    id: "community-build-competition",
    title: "Community Event: Build Competition",
    description:
      "Showcase your best builds and compete for prizes in our community build competition.",
    category: "Community",
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    source: "Community",
    url: "https://www.pathofexile.com/forum/build-competition",
  },
];
