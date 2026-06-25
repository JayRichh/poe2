import type {
  BaseContent,
  ContentCategory,
  ContentIcon,
  ContentWithMeta,
  SectionKey,
} from "~/lib/shared/types";

// Data verified against PoE2 0.5.x ("Return of the Ancients"). See
// docs/poe2-2026-reference.md. Note: the "game mechanics" reference categories
// (damage-types, status-effects, character-stats, economy) live under /mechanics
// and are intentionally NOT duplicated here as empty guide stubs.
export const GUIDES_DATA_VERSION = "0.5.x";

export const guides: Partial<Record<ContentCategory, BaseContent>> = {
  gameplay: {
    title: "Gameplay Tips",
    description: "Essential gameplay tips and tricks for new POE2 players",
    sections: [
      {
        title: "Keyboard Shortcuts",
        content: [
          "CRTL clicking on map in waypoint view forces the map to reset right away",
          "CRTL clicking items for fast selling/moving to stash in trade windows",
          "Double click portal icon on party member portrait to fast teleport",
          "Use checkpoints to teleport to other checkpoints in a dungeon",
          "ALT shows loot on the floor, Z toggles always showing loot",
          "CRTL + ALT + left click links items to chat",
          "CRTL + click The Hooded One to automatically ID inventory",
          "Hold SHIFT on skill tree nodes to see stat changes before committing",
          "CRTL + ENTER opens whisper to last message sender",
          "Press P to pause game in solo play while allowing chat",
        ],
      },
    ],
    relatedContent: [
      {
        title: "Character Stats",
        description: "Learn about core character statistics and mechanics",
        href: "/mechanics/character-stats",
        type: "mechanic",
      },
    ],
  },
  trading: {
    title: "Trading Tips",
    description: "Essential trading information and strategies for POE2 players",
    sections: [
      {
        title: "Currency & Trading Basics",
        content: [
          "Save Exalted Orbs (EX) during the campaign - they're a primary trading currency",
          "Use the official PoE2 trade site at pathofexile.com/trade/search/poe2 for items",
          "Use the in-game Currency Exchange for stackable currency trading",
          "Buy premium stash tabs to list items - required for selling",
          "Set up a proper loot filter to identify valuable drops efficiently",
          "Don't ignore 'small' currency - they add up significantly over time",
          "Learn to price check using both trade site and currency exchange",
          "Use the contact button on trade site for automatic whisper formatting",
        ],
      },
      {
        title: "Smart Trading Strategies",
        content: [
          "Use pseudo total resistance and maximum life searches for efficient pricing",
          "Consider level and attribute requirements when buying progression gear",
          "Look for empty rune sockets as valuable customization opportunities",
          "Don't waste currency crafting when you can buy perfect gear",
          "Focus on resistance and life stats for early game progression",
          "Check vendor inventories regularly for valuable base items",
          "Use dump tabs with fixed prices for efficient bulk selling",
          "Research market rates before raising prices on frequently whispered items",
        ],
      },
    ],
    relatedContent: [
      {
        title: "Economy System",
        description: "Deep dive into POE2's economy and currency mechanics",
        href: "/mechanics/economy",
        type: "mechanic",
      },
    ],
  },
  "character-building": {
    title: "Character Building",
    description: "Essential information about building and developing your character",
    sections: [
      {
        title: "Defense & Attributes",
        content: [
          "In PoE2 each point of Strength grants +2 Maximum Life (a flat bonus, not a percentage)",
          "Dexterity grants +5 Accuracy Rating per point and does NOT grant Evasion",
          "Intelligence grants +2 Mana per point and does NOT grant Energy Shield",
          "Spirit is a separate resource that pays reservations for auras, heralds and persistent minions",
          "Travel the passive tree through Strength nodes when you need more life",
          "Use The Hooded One to respec passives in town",
          "Slows apply to action speed and provide a significant defensive layer",
        ],
      },
      {
        title: "Ascendancy Guide",
        content: [
          "First ascendancy comes from the Act 2 Trial of the Sekhemas",
          "Second ascendancy comes from the Trial of Chaos",
          "Each base class has 2-3 ascendancies; there are 8 base classes and 22 ascendancies in 0.5.x",
          "Ascendancy choices cannot be changed after selection",
          "Blood Mage: avoid the Sanguimancy node early without proper life-cost setup",
          "Blood Mage Sanguimancy can be refunded at The Hooded One if needed",
        ],
      },
    ],
    relatedContent: [
      {
        title: "Character Stats",
        description: "Understanding core character statistics",
        href: "/mechanics/character-stats",
        type: "mechanic",
      },
    ],
  },
  equipment: {
    title: "Equipment & Crafting",
    description: "Guide to gear progression and crafting mechanics",
    sections: [
      {
        title: "Gear Sockets & Runes",
        content: [
          "Armour pieces and weapons can have rune sockets for stat runes",
          "Runes provide powerful stats like elemental resistance or maximum life",
          "Skills come from Uncut Skill Gems; supports link into a skill's support sockets",
          "Use Jeweller's Orbs to add support sockets to a skill (max 5: Lesser=3, Greater=4, Perfect=5)",
          "Support gems carry tiers gated by your Uncut Support Gem level (1-3); the one-copy-per-character limit was removed in 0.3.0",
          "Salvage quality/socketed gear at the salvage bench for crafting shards",
        ],
      },
    ],
    relatedContent: [
      {
        title: "Economy Guide",
        description: "Learn about currency and crafting materials",
        href: "/mechanics/economy",
        type: "mechanic",
      },
    ],
  },
  combat: {
    title: "Combat Mechanics",
    description: "Understanding combat mechanics and skill interactions",
    sections: [
      {
        title: "Skill Mechanics",
        content: [
          "Some melee skills allow direction changes while casting",
          "Hold skill button instead of clicking for directional control",
          "Use level 2 support hinder on DoT abilities for boss slows",
          "Slows affect action speed instead of movement speed",
          "Blink provides both clearspeed and survivability benefits",
          "Consider swapping gems between mapping and bossing",
        ],
      },
    ],
    relatedContent: [
      {
        title: "Damage Types",
        description: "Learn about different damage types and their interactions",
        href: "/mechanics/damage-types",
        type: "mechanic",
      },
      {
        title: "Status Effects",
        description: "Understanding status effects and ailments",
        href: "/mechanics/status-effects",
        type: "mechanic",
      },
    ],
  },
  "boss-fights": {
    title: "Boss Fight Mechanics",
    description: "Understanding and mastering boss fight patterns",
    sections: [
      {
        title: "Core Mechanics",
        content: [
          "Look for safe spots where no damage is dealt during fights",
          "Prioritize destroying minions/adds when they appear",
          "Learn timing between boss animations and actual attacks",
          "Sometimes moving is better than dodging for certain attacks",
          "Get boots with movement speed to make boss fights easier",
          "Use level 2 support hinder on DoT skills for boss slows",
        ],
      },
    ],
    relatedContent: [
      {
        title: "Combat Mechanics",
        description: "Master core combat mechanics",
        href: "/mechanics/combat",
        type: "mechanic",
      },
    ],
  },
  progression: {
    title: "Character Progression",
    description: "Guide to efficient character progression and development",
    sections: [
      {
        title: "Leveling Strategy",
        content: [
          "Don't rush side quests - return when stronger if needed",
          "Overlevel zones for smoother progression",
          "Focus on core defensive stats (capped resistances and life) early game",
          "The campaign is 4 Acts plus 3 Interludes - the old 'Cruel' replay was removed in 0.3.0",
          "Grab resistance and skill-point side quests as you progress each Act",
          "After the campaign and Interludes you unlock the Atlas and endgame Waystones (~level 65)",
        ],
      },
    ],
    relatedContent: [
      {
        title: "Character Stats",
        description: "Understanding character statistics and scaling",
        href: "/mechanics/character-stats",
        type: "mechanic",
      },
    ],
  },
  mapping: {
    title: "Mapping Guide",
    description: "Advanced endgame mapping strategies and tips",
    sections: [
      {
        title: "Map Management",
        content: [
          "Waystones are your map keys, ranging Tier I-XVI (T16 only via corrupting a T15)",
          "As of 0.5.0 Waystones must be identified before they can be run",
          "Use Precursor Towers to reveal the Atlas and apply Tablets to nearby maps",
          "The Atlas Passive Tree has 300+ nodes and can be freely re-allocated",
          "Don't waste currency over-rolling low-tier maps",
          "Run Citadels carefully - they lead toward pinnacle bosses",
        ],
      },
    ],
    relatedContent: [
      {
        title: "Economy Guide",
        description: "Learn about currency, crafting and trading",
        href: "/mechanics/economy",
        type: "mechanic",
      },
    ],
  },
};

const guideIconMap: Partial<Record<ContentCategory, ContentIcon>> = {
  gameplay: "Book",
  trading: "Coins",
  "boss-fights": "Sword",
  "character-building": "User",
  equipment: "Box",
  combat: "Crosshair",
  progression: "ArrowUp",
  mapping: "Map",
};

export const guidesWithMeta: ContentWithMeta[] = (
  Object.entries(guides) as [ContentCategory, BaseContent][]
).map(([id, guide]) => ({
  ...guide,
  id,
  icon: guideIconMap[id] ?? "Book",
}));

// Organize guides by section. The "game_mechanics" group was removed because it
// only ever held empty stub categories that duplicate /mechanics. Reference
// content (damage types, status effects, stats, economy) lives under /mechanics.
export const guidesBySection: Partial<Record<SectionKey, ContentWithMeta[]>> = {
  getting_started: guidesWithMeta.filter((g) => ["gameplay", "character-building"].includes(g.id)),
  combat_equipment: guidesWithMeta.filter((g) =>
    ["combat", "equipment", "boss-fights"].includes(g.id)
  ),
  progression_economy: guidesWithMeta.filter((g) =>
    ["progression", "trading", "mapping"].includes(g.id)
  ),
};
