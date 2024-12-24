export type MechanicCategory = "damage-types" | "status-effects" | "character-stats" | "combat";

export type MechanicIcon = "Zap" | "Activity" | "User" | "Swords";

export interface Mechanic {
  title: string;
  description: string;
  sections: {
    title: string;
    content: string[];
  }[];
}

export interface MechanicWithMeta extends Mechanic {
  id: MechanicCategory;
  icon: MechanicIcon;
}

export const mechanics: Record<MechanicCategory, Mechanic> = {
  "damage-types": {
    title: "Damage Types",
    description: "Comprehensive guide to POE2's damage types and their interactions",
    sections: [
      {
        title: "Physical Damage",
        content: [
          "Base physical damage from weapons and skills",
          "Physical damage over time effects",
          "Bleed and physical damage conversion",
        ],
      },
      {
        title: "Elemental Damage",
        content: [
          "Fire, Cold, and Lightning damage mechanics",
          "Elemental penetration and resistance",
          "Elemental damage over time effects",
        ],
      },
    ],
  },
  "status-effects": {
    title: "Status Effects",
    description: "Understanding POE2's status effects and ailments",
    sections: [
      {
        title: "Elemental Ailments",
        content: [
          "Ignite, Freeze, and Shock mechanics",
          "Ailment threshold calculations",
          "Duration and effectiveness scaling",
        ],
      },
      {
        title: "Other Effects",
        content: [
          "Bleed and poison mechanics",
          "Stun and knockback effects",
          "Temporary buffs and debuffs",
        ],
      },
    ],
  },
  "character-stats": {
    title: "Character Statistics",
    description: "Deep dive into character attributes and statistics",
    sections: [
      {
        title: "Core Attributes",
        content: [
          "Strength, Dexterity, and Intelligence scaling",
          "Derived stats from attributes",
          "Attribute requirements and bonuses",
        ],
      },
      {
        title: "Defense Stats",
        content: [
          "Armor and evasion mechanics",
          "Energy shield calculations",
          "Block and dodge mechanics",
        ],
      },
    ],
  },
  combat: {
    title: "Combat Mechanics",
    description: "Advanced combat system mechanics and interactions",
    sections: [
      {
        title: "Attack Mechanics",
        content: [
          "Attack speed and cast speed calculations",
          "Critical strike mechanics",
          "Hit and accuracy calculations",
        ],
      },
      {
        title: "Skill Mechanics",
        content: ["Skill gem interactions", "Support gem mechanics", "Area of effect calculations"],
      },
    ],
  },
};

export const mechanicsWithMeta: MechanicWithMeta[] = [
  { ...mechanics["damage-types"], id: "damage-types", icon: "Zap" },
  { ...mechanics["status-effects"], id: "status-effects", icon: "Activity" },
  { ...mechanics["character-stats"], id: "character-stats", icon: "User" },
  { ...mechanics["combat"], id: "combat", icon: "Swords" },
];
