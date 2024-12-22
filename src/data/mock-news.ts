import { NewsItem, PatchNote } from "~/types/news";

export const MOCK_NEWS: NewsItem[] = [
  {
    id: "1",
    title: "Path of Exile 2 Beta Weekend Announced",
    description:
      "Join us for an exclusive beta test of Path of Exile 2 this weekend. Test new features and provide feedback.",
    category: "Event",
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    source: "Official",
    url: "https://www.pathofexile.com/news/beta-weekend",
  },
  {
    id: "2",
    title: "Latest Development Update",
    description:
      "Check out the latest changes and improvements coming to Path of Exile 2, including new skills and balance changes.",
    category: "Update",
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    source: "Official",
    url: "https://www.pathofexile.com/news/dev-update",
  },
  {
    id: "3",
    title: "Community Event: Build Competition",
    description:
      "Showcase your best builds and compete for prizes in our community build competition.",
    category: "Community",
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    source: "Community",
    url: "https://www.pathofexile.com/forum/build-competition",
  },
];

export const MOCK_PATCH_NOTES: PatchNote[] = [
  {
    version: "0.1.0e",
    date: "2024-12-18",
    sections: [
      {
        title: "General Improvements and Changes",
        changes: [
          "Added the capacity to fast-travel between Checkpoints within an area.",
          "Passive Point Respeccing has been made cheaper especially at higher levels.",
          "Added a shortcut to open a skills advanced information display by right-clicking the skill on your Skill Bar.",
          "You can now compare equipped Flasks when using a Gamepad.",
          "Added Chance Shards to the Currency Exchange.",
          "Added a button to travel to your Guild Hideout when interacting with the Waypoint.",
        ],
      },
      {
        title: "Endgame and Monster Balance",
        changes: [
          "Maps no longer have additional elemental resistance penalties inherently applied at Tier 6 and Tier 11 or higher Maps.",
          "Critical Strikes from Monsters now deal 40% less bonus Damage.",
          "Chaos Damage now scales less aggressively over the Endgame.",
          "The Ground Laser and Ground Lightning abilities used by the Runed Knight in Expedition Encounters now deal substantially less Damage.",
          "The Waystone Modifier that adds Burning Ground to your Maps no longer increases in coverage or area with higher Tier Waystones.",
          "The 'Siphons Flask Charges Modifier' on Monsters now drains ten-times less Flask Charges per second.",
        ],
      },
      {
        title: "Skill Balance",
        changes: [
          "Rolling Slam's Second Slam now deals 50% more Damage to Heavy Stunned Enemies",
          "Ice Shot Shards now gains additional Projectiles as it Levels up",
          "Ice Shot Shards now targets within 90 Degree Cone",
          "Ice Shot Shards now travel further base (200ms, from 100ms)",
          "Ice Shot Arrow & Projectiles are now smaller and are the same size as other arrows",
          "Barrage now has 25% Less damage on Barraged Attacks [From 60% Less] at Level 1",
          "Barrage now has +2 Repeats base, from +1",
          "Shockchain Arrow's Shockwaves now deal 100% more Damage",
          "Sniper's Mark cooldown reduced from 6 seconds to 2 seconds at all Levels",
        ],
      },
    ],
    hotfixes: [
      {
        version: "1",
        date: "2024-12-18",
        changes: [
          "Cast on Critical Strike now also cares about the Damage of the hit when determining how much energy to gain to prevent the use of high-crit low level skills.",
        ],
      },
      {
        version: "2",
        date: "2024-12-18",
        changes: [
          "Fixed a bug where Shapeshift Weapon Set points weren't applying in instances after allocating them.",
          "Fixed a bug introduced in patch 0.1.0e where the Spell Gem Level from the Demon Form buff did not apply unless you resocketed affected gems.",
          "Fixed unintentionally lowering the base minion critical damage bonus from +50% to +30%. We have buffed base minion critical damage bonus to be +100%.",
        ],
      },
    ],
  },
];
