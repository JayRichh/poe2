import type { ContentCategory, ContentIcon, BaseContent, ContentWithMeta, SectionKey } from "~/lib/shared/types";

export const guides: Record<ContentCategory, BaseContent> = {
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
        type: "mechanic"
      }
    ]
  },
  trading: {
    title: "Trading Tips",
    description: "Essential trading information and strategies for POE2 players",
    sections: [
      {
        title: "Currency & Trading Basics",
        content: [
          "Save Exalted Orbs (EX) during campaign - they're the primary trading currency",
          "Use official POE2 trade site at pathofexile.com/trade2 for non-stackable items",
          "Use Currency Exchange Market through Alva for stackable currency trading",
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
        type: "mechanic"
      }
    ]
  },
  "character-building": {
    title: "Character Building",
    description: "Essential information about building and developing your character",
    sections: [
      {
        title: "Defense Mechanics",
        content: [
          "Health nodes are mostly replaced by strength attribute nodes",
          "1 strength now gives 2 maximum life (4x more than POE1)",
          "Choose strength for attribute nodes when traveling the tree",
          "Use The Hooded One to respec individual attribute nodes in town",
          "Slows apply to action speed and provide significant defensive layer",
          "Slows are 70% effective on rare mobs and 50% on bosses",
        ],
      },
      {
        title: "Ascendancy Guide",
        content: [
          "First ascendancy comes from Act 2 Trial of the Sekhemas",
          "Second ascendancy from Act 3 The Temple of Chaos",
          "Monster level 38 trial items don't count for second ascendancy",
          "Ascendancy choices cannot be changed after selection",
          "Blood Mage: Avoid Sanguimancy node early without proper setup",
          "Blood Mage Sanguimancy can be refunded at The Hooded One if needed",
        ],
      },
    ],
    relatedContent: [
      {
        title: "Character Stats",
        description: "Understanding core character statistics",
        href: "/mechanics/character-stats",
        type: "mechanic"
      }
    ]
  },
  equipment: {
    title: "Equipment & Crafting",
    description: "Guide to gear progression and crafting mechanics",
    sections: [
      {
        title: "Gear Sockets & Runes",
        content: [
          "Gloves/Boots/Helmets/Body armours/Weapons can have rune sockets",
          "Runes provide powerful stats like 12% elemental res or 25 max life",
          "Use Artificer's orbs to add sockets to items",
          "Salvage quality gear for armourers scraps",
          "Salvage socketed gear for artificier's shards (10 for an orb)",
          "First guaranteed 4-link from Orok Campfire chest in Act 3",
        ],
      },
    ],
    relatedContent: [
      {
        title: "Economy Guide",
        description: "Learn about currency and crafting materials",
        href: "/mechanics/economy",
        type: "mechanic"
      }
    ]
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
        type: "mechanic"
      },
      {
        title: "Status Effects",
        description: "Understanding status effects and ailments",
        href: "/mechanics/status-effects",
        type: "mechanic"
      }
    ]
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
        type: "mechanic"
      }
    ]
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
          "Focus on core defensive stats early game",
          "Get your first 4-link from Orok Campfire in Act 3",
          "Complete resistance-boosting side quests before Cruel mode",
        ],
      },
    ],
    relatedContent: [
      {
        title: "Character Stats",
        description: "Understanding character statistics and scaling",
        href: "/mechanics/character-stats",
        type: "mechanic"
      }
    ]
  },
  mapping: {
    title: "Mapping Guide",
    description: "Advanced endgame mapping strategies and tips",
    sections: [
      {
        title: "Map Management",
        content: [
          "Save T16 maps for +2 waystones (corrupted + irradiated)",
          "Level 20 gems drop at area level 82+",
          "Running blue T15 maps is fine for efficiency",
          "Don't waste time over-rolling maps",
          "Run Citadels with no negative mods for safety",
        ],
      },
    ],
    relatedContent: [
      {
        title: "Economy Guide",
        description: "Learn about map investment and returns",
        href: "/mechanics/economy",
        type: "mechanic"
      }
    ]
  },
  // Add stubs for other required categories
  "damage-types": {
    title: "Damage Types",
    description: "Damage type mechanics",
    sections: []
  },
  "status-effects": {
    title: "Status Effects",
    description: "Status effect mechanics",
    sections: []
  },
  "character-stats": {
    title: "Character Stats",
    description: "Character stat mechanics",
    sections: []
  },
  economy: {
    title: "Economy",
    description: "Economy mechanics",
    sections: []
  }
};

const guideIconMap: Record<ContentCategory, ContentIcon> = {
  gameplay: "Book",
  trading: "Coins",
  "boss-fights": "Sword",
  "character-building": "User",
  equipment: "Box",
  combat: "Crosshair",
  progression: "ArrowUp",
  mapping: "Map",
  "damage-types": "Zap",
  "status-effects": "Activity",
  "character-stats": "User",
  economy: "Coins"
};

export const guidesWithMeta: ContentWithMeta[] = Object.entries(guides).map(([id, guide]) => ({
  ...guide,
  id: id as ContentCategory,
  icon: guideIconMap[id as ContentCategory]
}));

// Organize guides by section
export const guidesBySection: Record<SectionKey, ContentWithMeta[]> = {
  getting_started: guidesWithMeta.filter((g) => ["gameplay", "character-building"].includes(g.id)),
  combat_equipment: guidesWithMeta.filter((g) =>
    ["combat", "equipment", "boss-fights"].includes(g.id)
  ),
  progression_economy: guidesWithMeta.filter((g) =>
    ["progression", "trading", "mapping"].includes(g.id)
  ),
  game_mechanics: guidesWithMeta.filter((g) =>
    ["damage-types", "status-effects", "character-stats", "economy"].includes(g.id)
  ),
  additional: [],
};
