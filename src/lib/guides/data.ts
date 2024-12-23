export type GuideCategory = 'gameplay' | 'trading' | 'boss-fights' | 'cruel-mode' | 'character-building' | 'equipment' | 'combat' | 'progression' | 'mapping';

export type GuideIcon = "Book" | "Coins" | "Sword" | "Shield" | "User" | "Box" | "Crosshair" | "ArrowUp" | "Map";

export interface Guide {
  title: string;
  description: string;
  sections: {
    title: string;
    tips: string[];
  }[];
}

export interface GuideWithMeta extends Guide {
  id: GuideCategory;
  icon: GuideIcon;
}

export const guides: Record<GuideCategory, Guide> = {
  "character-building": {
    title: "Character Building",
    description: "Essential information about building and developing your character",
    sections: [
      {
        title: "Defense Mechanics",
        tips: [
          "Health nodes are mostly replaced by strength attribute nodes",
          "1 strength now gives 2 maximum life (4x more than POE1)",
          "Choose strength for attribute nodes when traveling the tree",
          "Use The Hooded One to respec individual attribute nodes in town",
          "Slows apply to action speed and provide significant defensive layer",
          "Slows are 70% effective on rare mobs and 50% on bosses"
        ]
      },
      {
        title: "Ascendancy Guide",
        tips: [
          "First ascendancy comes from Act 2 Trial of the Sekhemas",
          "Second ascendancy from Act 3 The Temple of Chaos",
          "Monster level 38 trial items don't count for second ascendancy",
          "Ascendancy choices cannot be changed after selection",
          "Blood Mage: Avoid Sanguimancy node early without proper setup",
          "Blood Mage Sanguimancy can be refunded at The Hooded One if needed"
        ]
      }
    ]
  },
  "equipment": {
    title: "Equipment & Crafting",
    description: "Guide to gear progression and crafting mechanics",
    sections: [
      {
        title: "Gear Sockets & Runes",
        tips: [
          "Gloves/Boots/Helmets/Body armours/Weapons can have rune sockets",
          "Runes provide powerful stats like 12% elemental res or 25 max life",
          "Use Artificer's orbs to add sockets to items",
          "Salvage quality gear for armourers scraps",
          "Salvage socketed gear for artificier's shards (10 for an orb)",
          "First guaranteed 4-link from Orok Campfire chest in Act 3"
        ]
      },
      {
        title: "Gear Progression",
        tips: [
          "Check vendor inventories regularly for +gems gear",
          "Look for blue items with good stats to augment/regal",
          "Use empty rune sockets as search criteria when trading",
          "Consider level and attribute requirements when buying gear",
          "Save currency early game for trading rather than crafting"
        ]
      }
    ]
  },
  gameplay: {
    title: "Gameplay Tips",
    description: "Essential gameplay tips and tricks for new POE2 players",
    sections: [
      {
        title: "Keyboard Shortcuts",
        tips: [
          "CRTL clicking on map in waypoint view forces the map to reset right away",
          "CRTL clicking items for fast selling/moving to stash in trade windows",
          "Double click portal icon on party member portrait to fast teleport",
          "Use checkpoints to teleport to other checkpoints in a dungeon",
          "ALT shows loot on the floor, Z toggles always showing loot",
          "CRTL + ALT + left click links items to chat",
          "CRTL + click The Hooded One to automatically ID inventory",
          "Hold SHIFT on skill tree nodes to see stat changes before committing",
          "CRTL + ENTER opens whisper to last message sender",
          "Press P to pause game in solo play while allowing chat"
        ]
      }
    ]
  },
  trading: {
    title: "Trading Tips",
    description: "Essential trading information for POE2 players",
    sections: [
      {
        title: "Currency & Trading Basics",
        tips: [
          "Save Exalted Orbs (EX) during campaign - they're valuable for trading",
          "Use official POE2 trade site at pathofexile.com/trade2",
          "Search for items with pseudo total res and maximum life",
          "Click contact button on trade site to auto-whisper sellers in-game",
          "If a seller doesn't respond, move on to other listings",
          "Buy a premium stash tab to list items for sale",
          "Set premium tab items to sell for Exalted Orbs (main currency)",
          "List all decent looking rares - you'll be surprised what sells"
        ]
      },
      {
        title: "Smart Trading",
        tips: [
          "Use trade site filters for level and attribute requirements",
          "Consider empty rune sockets when buying gear for customization",
          "Buy perfect gear instead of gambling with currency crafting",
          "Check trade site regularly for upgrades during progression",
          "Focus on resistance and life stats early game"
        ]
      }
    ]
  },
  "boss-fights": {
    title: "Boss Fight Mechanics",
    description: "Understanding and mastering boss fight patterns",
    sections: [
      {
        title: "Core Mechanics",
        tips: [
          "Look for safe spots where no damage is dealt during fights",
          "Prioritize destroying minions/adds when they appear",
          "Learn timing between boss animations and actual attacks",
          "Sometimes moving is better than dodging for certain attacks",
          "Get boots with movement speed to make boss fights easier",
          "Use level 2 support hinder on DoT skills for boss slows"
        ]
      },
      {
        title: "Boss Strategies",
        tips: [
          "Learn boss patterns through practice (Dark Souls approach)",
          "Improve your build with better gear and support gems",
          "Consider buying weapon upgrades to double your damage",
          "Overlevel by farming zones for easier progression",
          "Complete side quests later when you're stronger",
          "Don't rush ascendancy trials if undergeared"
        ]
      }
    ]
  },
  "cruel-mode": {
    title: "Cruel Mode Guide",
    description: "Important information about Cruel difficulty",
    sections: [
      {
        title: "Difficulty Changes",
        tips: [
          "Cruel mode unlocks after completing Acts 1-3",
          "-10% elemental resistance per completed act (-60% total)",
          "Complete side quests for +20% resistance bonus",
          "Ascendency quests in Acts 2-3 are currently bugged",
          "Focus on gear with multiple resistances to counter penalties"
        ]
      }
    ]
  },
  "combat": {
    title: "Combat Mechanics",
    description: "Understanding combat mechanics and skill interactions",
    sections: [
      {
        title: "Skill Mechanics",
        tips: [
          "Some melee skills allow direction changes while casting",
          "Hold skill button instead of clicking for directional control",
          "Use level 2 support hinder on DoT abilities for boss slows",
          "Slows affect action speed instead of movement speed",
          "Blink provides both clearspeed and survivability benefits",
          "Consider swapping gems between mapping and bossing"
        ]
      },
      {
        title: "Combat Tips",
        tips: [
          "Learn enemy attack patterns and animations",
          "Use movement skills for both offense and defense",
          "Position carefully to maximize skill effectiveness",
          "Combine slows with other defensive layers",
          "Adapt your combat style based on enemy types"
        ]
      }
    ]
  },
  "progression": {
    title: "Character Progression",
    description: "Guide to efficient character progression and development",
    sections: [
      {
        title: "Leveling Strategy",
        tips: [
          "Don't rush side quests - return when stronger if needed",
          "Overlevel zones for smoother progression",
          "Focus on core defensive stats early game",
          "Get your first 4-link from Orok Campfire in Act 3",
          "Complete resistance-boosting side quests before Cruel mode"
        ]
      },
      {
        title: "Build Development",
        tips: [
          "Plan your ascendancy choices carefully",
          "Balance offense and defense while leveling",
          "Keep gear updated through vendor checks and trading",
          "Use the trade site to find key upgrades",
          "Consider temporary gear setups while progressing"
        ]
      }
    ]
  },
  "mapping": {
    title: "Mapping Guide",
    description: "Advanced endgame mapping strategies and tips",
    sections: [
      {
        title: "Map Management",
        tips: [
          "Save T16 maps for +2 waystones (corrupted + irradiated)",
          "Level 20 gems drop at area level 82+",
          "Running blue T15 maps is fine for efficiency",
          "Don't waste time over-rolling maps",
          "Run Citadels with no negative mods for safety"
        ]
      },
      {
        title: "Efficiency Tips",
        tips: [
          "Make Tower buffs overlap in areas with multiple watchtowers",
          "Focus on maps with 2+ mechanics (Breach, Expedition)",
          "Always run Blink for movement speed and survival",
          "Consider using 60 spirit amulet/body for Blink",
          "Swap gems for mapping vs bossing as needed"
        ]
      }
    ]
  }
};

export const guidesWithMeta: GuideWithMeta[] = [
  { ...guides.gameplay, id: 'gameplay', icon: "Book" },
  { ...guides["character-building"], id: 'character-building', icon: "User" },
  { ...guides.equipment, id: 'equipment', icon: "Box" },
  { ...guides.combat, id: 'combat', icon: "Crosshair" },
  { ...guides.progression, id: 'progression', icon: "ArrowUp" },
  { ...guides.trading, id: 'trading', icon: "Coins" },
  { ...guides["boss-fights"], id: 'boss-fights', icon: "Sword" },
  { ...guides["cruel-mode"], id: 'cruel-mode', icon: "Shield" },
  { ...guides.mapping, id: 'mapping', icon: "Map" }
];
