import type {
  BaseContent,
  ContentCategory,
  ContentIcon,
  ContentWithMeta,
} from "~/lib/shared/types";

// Mechanics reference for Path of Exile 2, verified against live 0.5.x
// ("Return of the Ancients"). Source of truth: docs/poe2-2026-reference.md
// (cross-checked vs maxroll, poe2db, official patch notes, poewiki/poe2wiki).
// Image fields were intentionally removed: they pointed at /public/mechanics/*
// assets that do not exist and rendered as 404s.
//
// Some exact coefficients (several ailment numbers, a couple of defence
// constants, Runic Ward regen) are single-source in the reference and flagged
// there; where that is the case the copy below stays deliberately conservative.
export const MECHANICS_DATA_VERSION = "0.5.x";

export const mechanics: Record<ContentCategory, BaseContent> = {
  "status-effects": {
    title: "Ailments & Status Effects",
    description: "How PoE2's threshold-based ailments and status effects work in 0.5.x",
    sections: [
      {
        title: "Ailment Overview",
        content: [
          "PoE2 uses an ailment-threshold model rather than a flat per-hit chance. Each target has an ailment threshold roughly equal to half of its maximum life, and the size of your hit relative to that threshold determines how much you build toward an ailment.",
          "Non-damaging ailments (Shock, Freeze, Chill, Electrocute, Heavy Stun, Pin) and damaging ailments (Ignite, Poison, Bleed) scale differently. Larger hits relative to the target build ailments faster, which is why bosses with very high thresholds are harder to freeze or shock.",
          "Critical strikes and high single-hit damage make ailment application far more reliable than spreading the same damage across many small hits.",
        ],
        subsections: [
          {
            title: "Damaging Ailments",
            content: [
              "Ignite deals fire damage over time and is built up through the Flammability debuff: roughly each 5% of a target's ailment threshold dealt as fire adds about 1% chance to ignite, and at 100% Flammability all fire hits ignite. This replaces the old flat per-hit ignite chance.",
              "Poison stacks as chaos damage over time. Its base damage is commonly cited as around 20% of the combined physical and chaos damage of the hit per second (this exact coefficient is single-source and should be treated as approximate).",
              "Bleed deals physical damage over time and remains a static chance-based ailment rather than a threshold-scaled one.",
            ],
          },
          {
            title: "Non-Damaging Ailments",
            content: [
              "Shock increases the damage the target takes. Build-up is threshold-scaled (around 1% chance per 4% of the ailment threshold dealt as lightning).",
              "Freeze locks a target in place; Chill slows it. Both scale with cold relative to the target's threshold.",
              "Electrocute, Heavy Stun and Pin are additional build-up ailments. Their exact coefficients are not fully confirmed across sources, so plan around the general 'bigger hits build faster' rule rather than precise numbers.",
            ],
          },
        ],
      },
    ],
    relatedContent: [
      {
        title: "Damage Types",
        description: "How damage types and conversion interact with ailments",
        href: "/mechanics/damage-types",
        type: "mechanic",
      },
      {
        title: "Combat Guide",
        description: "Apply ailments effectively in combat",
        href: "/guides/combat",
        type: "guide",
      },
    ],
  },

  "damage-types": {
    title: "Damage Types & Scaling",
    description: "PoE2's damage calculation order, conversion, crit and resistance rules",
    sections: [
      {
        title: "Damage Calculation Order",
        content: [
          "Damage in PoE2 is built in a fixed order: base damage, plus flat added damage, then multiplied by your total 'increased/reduced' modifiers (added together into one bucket), then multiplied by each separate 'more/less' modifier, then by attack/cast rate, and finally by critical strikes.",
          "'Increased' and 'reduced' modifiers stack additively: 20% increased Fire and 20% increased Elemental combine to x1.4. 'More' and 'less' modifiers are always multiplicative with everything, including each other: two '20% more' modifiers give x1.44, not x1.4.",
          "Because 'more' multipliers compound, a small number of them is often worth more than a large pile of 'increased' modifiers.",
        ],
        subsections: [
          {
            title: "Conversion",
            content: [
              "Conversion always proceeds forward along Physical -> Lightning -> Cold -> Fire -> Chaos, never backward.",
              "Skill-inherent conversion is applied first, then global conversion, normalised so you never convert more than 100% of an original type.",
              "Critical PoE2 rule: after conversion, only modifiers to the resulting type apply. If you fully convert Physical to Cold, 'increased Physical Damage' no longer helps - only Cold modifiers do. 'Gain X% as extra [type]' is different: it adds extra damage without removing the source.",
            ],
          },
          {
            title: "Critical Strikes",
            content: [
              "Base critical chance is per-skill (for example around 9% for Spark).",
              "The base Critical Damage Bonus is +100%, so a critical strike deals 200% of base damage (double). '+#% to Critical Damage Bonus' scales that bonus multiplicatively.",
              "Crit is a unique final multiplier that is applied independently of your other damage multipliers.",
            ],
          },
          {
            title: "Resistance, Exposure & Penetration",
            content: [
              "Exposure applies a flat reduction to a single elemental resistance (commonly -20% for a few seconds). Multiple Exposures of the same element do not stack - only the strongest applies; different elements stack independently.",
              "Exposure and curses such as Elemental Weakness stack additively as resistance reductions and can push a resistance negative. Penetration is applied last, after all other resistance modifiers.",
              "Key PoE2 difference: penetration does nothing once effective resistance is 0 or negative. Use exposure and curses to push resistance toward 0, then penetration to finish the gap.",
            ],
          },
        ],
      },
    ],
    relatedContent: [
      {
        title: "Ailments & Status Effects",
        description: "How damage types feed into ailments",
        href: "/mechanics/status-effects",
        type: "mechanic",
      },
      {
        title: "Combat Guide",
        description: "Master the fundamentals of PoE2 combat",
        href: "/guides/combat",
        type: "guide",
      },
    ],
  },

  "character-stats": {
    title: "Attributes & Defences",
    description: "Core attributes, Spirit, and PoE2's defence layers in 0.5.x",
    sections: [
      {
        title: "Core Attributes",
        content: [
          "PoE2's three core attributes grant only flat bonuses - they do not give the percentage scaling they did in PoE1.",
          "Strength grants +2 Maximum Life per point (a flat bonus, with no melee or other damage). Dexterity grants +5 Accuracy Rating per point and does NOT grant Evasion. Intelligence grants +2 Mana per point and does NOT grant Energy Shield.",
          "Spirit is a separate resource, not a scaled attribute. It pays reservations for persistent effects such as auras, heralds, permanent minions and persistent buffs. Base Spirit comes from late-campaign quest rewards, gear (sceptres in particular) and passives - it does not scale from Strength, Dexterity or Intelligence.",
        ],
        subsections: [
          {
            title: "Life, Mana & Energy Shield",
            content: [
              "Life is your primary defence and scales mainly from your level, Strength (+2 per point) and passive tree life nodes.",
              "Mana powers skills and can be reserved by persistent effects (paid via Spirit in many cases).",
              "Energy Shield is a secondary pool that recharges automatically: base recharge is 12.5% of maximum ES per second, beginning after 4 seconds of taking no ES damage. (The old '20%/sec after 2s' framing is incorrect.)",
            ],
          },
        ],
      },
      {
        title: "Defence Layers",
        content: [
          "PoE2 layers several defences. No single layer is sufficient for endgame - combine them.",
          "Armour reduces physical damage from hits, Evasion avoids attacks entirely, Block stops hits outright, Deflection reduces hits, Energy Shield and Runic Ward act as extra pools, and recovery (life regen, leech, flasks) keeps you topped up.",
        ],
        subsections: [
          {
            title: "Armour & Evasion",
            content: [
              "Armour reduces physical hit damage by Armour / (Armour + 12 x damage taken), capped at 90%. Breakpoints: 50% needs roughly 12x the hit in armour, 75% needs 36x, and 90% needs 108x. (The constant 12 is the best-supported value.)",
              "Evasion gives a chance to avoid attacks. Chance to be hit floors at 5%, so evade caps at 95%. Evasion uses a hidden entropy counter so you are never hit twice in immediate succession nor go unhit for too long.",
              "Spells are not evaded and do not use accuracy - they skip the hit check entirely; accuracy and the distance penalty apply only to attacks.",
            ],
          },
          {
            title: "Block & Deflection",
            content: [
              "Base maximum Block is 50% in 0.5.x (it was 75% at beta). Specific modifiers can raise the cap toward an absolute 90%, but some sources of higher block still let a portion of the hit through.",
              "Deflection is a newer layer. Chance to Deflect = 150 x (1 - A / (A + 0.12 x D)), capped at 95%, where A is the attacker's Accuracy Rating and D is your Deflection Rating. A successful deflect reduces that hit's damage by 40%, and unlike Evasion it works against boss attacks.",
            ],
          },
          {
            title: "Runic Ward & Leech Cap",
            content: [
              "Runic Ward (added in 0.5.0) is a secondary hit pool that activates once your Life reaches 1: incoming damage is then taken from Ward, letting you survive while it depletes. It regenerates independently of Life and does not protect against non-damage life loss. Its source is Runeforging with Verisium.",
              "Leech in 0.5.0 has a per-hit input cap: for leech calculation only, a single hit is treated as dealing at most 40,000 damage. Hits below 40k are unaffected; a larger hit is treated as 40k for leech purposes. This caps leech input per hit, not total leeched life.",
            ],
          },
        ],
      },
    ],
    relatedContent: [
      {
        title: "Character Building",
        description: "Plan attributes and defences for your build",
        href: "/guides/character-building",
        type: "guide",
      },
      {
        title: "Combat System",
        description: "How defences hold up in combat",
        href: "/mechanics/combat",
        type: "mechanic",
      },
    ],
  },

  economy: {
    title: "Currency & Crafting",
    description: "PoE2's currency orbs and crafting systems in 0.5.x",
    sections: [
      {
        title: "Core Currency Orbs",
        content: [
          "PoE2's economy uses crafting orbs as both crafting tools and trade currency. Prices are league-volatile and reset roughly every 3-5 months, so always check the official trade site for live values rather than relying on fixed ratios.",
          "The most important behavioural change vs PoE1: the Chaos Orb removes one random modifier and adds one new random modifier - it is NOT a full reroll. This has been the behaviour since launch.",
        ],
        subsections: [
          {
            title: "Common Orbs",
            content: [
              "Transmutation: Normal -> Magic (1 mod). Augmentation: adds a 2nd mod to a 1-mod Magic item. Alchemy: Normal -> Rare (4 mods). Regal: Magic -> Rare (+1 mod).",
              "Exalted: adds a new random mod to a Rare without touching existing mods. Divine: rerolls the numeric values of existing mods (not which mods). Chaos: removes one random mod and adds one new random mod.",
              "Vaal: permanently corrupts (random outcome). Annulment: removes one random mod. Orb of Chance: Normal -> Unique, or destroys the item. Fracturing Orb: permanently locks one mod on a Rare with 4+ mods. Mirror of Kalandra: perfect duplicate of a non-Unique item (rarest).",
            ],
          },
          {
            title: "Tiers & Newer Currency",
            content: [
              "Since 0.3.0 many orbs come in regular -> Greater -> Perfect tiers, each forcing a higher minimum modifier level. Essences were re-tiered to four (Lesser/Normal/Greater/Perfect) and add a specific mod by tier.",
              "Newer crafting items include Hinekora's Lock (foresee the next currency outcome), Soul Cores (socketable augments), Bones / Desecration crafting from Abyss (0.3.0), and Verisium plus 13 Alloy currencies from 0.5.0.",
              "Verisium also powers Runeforging, which adds Runic Ward to armour at the Runeforging bench.",
            ],
          },
          {
            title: "Removed / Not In Game",
            content: [
              "Orb of Alteration is not in the active game - PoE2 has no currency that rerolls a Magic item's modifiers.",
              "Orb of Scouring was removed - there is no scour-to-white currency.",
              "Many other PoE1 orbs (Blessed, Engineer's, Harbinger's, Binding, Horizon, and so on) are not part of the PoE2 system.",
            ],
          },
        ],
      },
    ],
    relatedContent: [
      {
        title: "Trading Guide",
        description: "Turn currency knowledge into efficient trades",
        href: "/guides/trading",
        type: "guide",
      },
      {
        title: "Equipment & Crafting",
        description: "Apply currency to gear",
        href: "/guides/equipment",
        type: "guide",
      },
    ],
  },

  gameplay: {
    title: "Gameplay Systems",
    description: "Skills, support gems and core PoE2 systems in 0.5.x",
    sections: [
      {
        title: "Skills & Support Gems",
        content: [
          "Active skills come from Uncut Skill Gems, which drop at area level. You 'engrave' an Uncut Skill Gem to pick or upgrade a specific skill.",
          "Support gems modify a linked skill. As of 0.3.0 the one-copy-per-character restriction was removed, and supports now carry tiers (for example Brink I/II) that set their stat ranges. Higher support tiers are gated by your Uncut Support Gem level (1, 2 or 3).",
          "There is no '5-tier' support system: the number 5 is the socket limit - the maximum number of support gems you can link to a single skill. You add support sockets with Jeweller's Orbs (Lesser -> 3, Greater -> 4, Perfect -> 5 sockets).",
        ],
        subsections: [
          {
            title: "Character Development",
            content: [
              "Leveling grants passive skill points and access to higher-level gems and gear.",
              "Each base class unlocks ascendancy specialisations through the Trial of the Sekhemas and the Trial of Chaos.",
              "Equipment provides defensive and offensive stats plus rune sockets; runes add fixed stats such as resistances or life.",
            ],
          },
        ],
      },
    ],
    relatedContent: [
      {
        title: "Combat System",
        description: "Put skills into practice",
        href: "/mechanics/combat",
        type: "mechanic",
      },
      {
        title: "Character Building",
        description: "Plan skills and supports for a build",
        href: "/guides/character-building",
        type: "guide",
      },
    ],
  },

  combat: {
    title: "Combat System",
    description: "Offence, defence and accuracy fundamentals in PoE2 0.5.x",
    sections: [
      {
        title: "Combat Fundamentals",
        content: [
          "PoE2 combat blends fast action with deep scaling. Success comes from combining offence, layered defences, positioning and resource management.",
          "Attacks must hit: your chance to hit depends on your Accuracy versus the target's Evasion, and accuracy also suffers a distance penalty. Spells skip the hit check entirely and cannot be evaded.",
        ],
        subsections: [
          {
            title: "Accuracy & Distance",
            content: [
              "You gain +6 base Accuracy per character level and +6 Accuracy per Dexterity point.",
              "Attacks take a distance penalty: there is no penalty within about 2 metres, scaling up to a maximum of around 90% less Accuracy beyond roughly 9 metres. (Older guides citing a 2-12 m window use a community approximation rather than a confirmed constant.)",
              "Only attacks use accuracy and the distance penalty - spells always hit if in range.",
            ],
          },
          {
            title: "Offence & Defence",
            content: [
              "Main skills are scaled with up to five support gems plus passives and gear. Look for 'more' multipliers and conversion synergies rather than just piling on 'increased' modifiers.",
              "Layer defences: armour or evasion, block or deflection, energy shield or runic ward, and reliable recovery. Relying on a single layer is rarely enough for endgame.",
            ],
          },
        ],
      },
    ],
    relatedContent: [
      {
        title: "Damage Types",
        description: "How your damage is calculated",
        href: "/mechanics/damage-types",
        type: "mechanic",
      },
      {
        title: "Boss Encounters",
        description: "Apply combat skills to bosses",
        href: "/mechanics/boss-fights",
        type: "mechanic",
      },
    ],
  },

  "boss-fights": {
    title: "Boss Encounters",
    description: "Approaching PoE2's campaign and endgame boss fights",
    sections: [
      {
        title: "Boss Mechanics",
        content: [
          "PoE2 bosses use telegraphed attacks, phases and arena hazards that test both your build and your mechanical execution.",
          "Bosses have very high ailment thresholds, so freezing or shocking them reliably requires large hits or heavy investment.",
          "Endgame culminates in pinnacle bosses: the original Arbiter of Ash and the new Arbiter of Divinity added in 0.5.0, plus each league mechanic's own pinnacle boss.",
        ],
        subsections: [
          {
            title: "Preparation",
            content: [
              "Cap your resistances and bring a healthy effective health pool plus reliable recovery before attempting pinnacle content.",
              "Learn telegraphs and phase transitions; many deaths come from unexpected abilities rather than raw damage.",
              "Consider a boss-focused skill and flask setup, since mapping configurations are often suboptimal for single-target fights.",
            ],
          },
        ],
      },
    ],
    relatedContent: [
      {
        title: "Combat System",
        description: "Core combat fundamentals",
        href: "/mechanics/combat",
        type: "mechanic",
      },
      {
        title: "Boss Fight Mechanics",
        description: "Practical boss-fight tips",
        href: "/guides/boss-fights",
        type: "guide",
      },
    ],
  },

  "character-building": {
    title: "Character Building",
    description: "Planning offence, defence and progression for a PoE2 build",
    sections: [
      {
        title: "Build Planning",
        content: [
          "A solid build picks a main skill and damage type, then develops supporting mechanics and defences around it.",
          "Plan your scaling: identify your main 'more' multipliers, your conversion path (if any), and whether you scale ailments or hits. Remember only modifiers to the final damage type apply after conversion.",
          "Plan defences early. Layer armour/evasion with block/deflection, energy shield/runic ward and recovery rather than over-investing in one layer.",
        ],
        subsections: [
          {
            title: "Attributes & Spirit",
            content: [
              "Strength (+2 life each), Dexterity (+5 accuracy each) and Intelligence (+2 mana each) only give flat bonuses, so meet gem and gear requirements without expecting PoE1-style percentage scaling.",
              "Budget Spirit for the auras, heralds and persistent minions you want to run, since it is a limited reservation resource sourced from quests, gear and passives.",
            ],
          },
        ],
      },
    ],
    relatedContent: [
      {
        title: "Attributes & Defences",
        description: "The stats behind every build",
        href: "/mechanics/character-stats",
        type: "mechanic",
      },
      {
        title: "Character Building Guide",
        description: "Practical build tips",
        href: "/guides/character-building",
        type: "guide",
      },
    ],
  },

  equipment: {
    title: "Equipment & Gearing",
    description: "Item rarities, sockets, runes and crafting in PoE2 0.5.x",
    sections: [
      {
        title: "Equipment Basics",
        content: [
          "Items come in Normal, Magic, Rare and Unique rarities, each with different modifier potential. Item level controls which modifiers can appear.",
          "Armour and weapons can have rune sockets; runes add fixed stats such as resistances or maximum life. Skill and support gems are socketed into your skills (not your gear) - supports link to a skill via support sockets added with Jeweller's Orbs (up to 5).",
        ],
        subsections: [
          {
            title: "Crafting Gear",
            content: [
              "Use currency orbs to craft: Transmutation/Augmentation for Magic, Alchemy/Regal for Rares, Exalted to add mods, Divine to reroll values, and Chaos to swap one mod for another.",
              "Deterministic options include Essences (add a specific mod by tier), Alloys (guaranteed exclusive mods, 0.5.0), and Desecration/Bones crafting from Abyss.",
              "Fracturing Orbs lock a desirable mod in place, and Runeforging with Verisium can add Runic Ward to armour.",
            ],
          },
        ],
      },
    ],
    relatedContent: [
      {
        title: "Currency & Crafting",
        description: "The orbs behind gearing",
        href: "/mechanics/economy",
        type: "mechanic",
      },
      {
        title: "Equipment & Crafting Guide",
        description: "Practical gearing tips",
        href: "/guides/equipment",
        type: "guide",
      },
    ],
  },

  progression: {
    title: "Campaign & Progression",
    description: "PoE2's campaign structure and leveling path in 0.5.x",
    sections: [
      {
        title: "Campaign Structure",
        content: [
          "The live campaign is 4 Acts plus 3 Interludes (Curse of Holten, The Stolen Barya, Doryani's Contingency). The old 'Cruel' second playthrough was removed in 0.3.0 - you no longer replay the campaign on a harder difficulty.",
          "The full 1.0 release is planned to be 6 Acts with no Interludes, but that has not shipped yet.",
          "After finishing the Acts and Interludes you unlock the Atlas and endgame mapping at roughly character level 65.",
        ],
        subsections: [
          {
            title: "Leveling",
            content: [
              "Each level grants passive points; pick up resistance and skill-point side quests as you go.",
              "Keep resistances capped and life adequate for the current Act, and upgrade gear and gems regularly.",
              "Unlock your first ascendancy at the Trial of the Sekhemas, and your second at the Trial of Chaos.",
            ],
          },
        ],
      },
    ],
    relatedContent: [
      {
        title: "Endgame Mapping",
        description: "What comes after the campaign",
        href: "/mechanics/mapping",
        type: "mechanic",
      },
      {
        title: "Progression Guide",
        description: "Practical leveling tips",
        href: "/guides/progression",
        type: "guide",
      },
    ],
  },

  mapping: {
    title: "Endgame & Atlas",
    description: "Waystones, the Atlas tree and PoE2's 0.5.0 endgame",
    sections: [
      {
        title: "Atlas & Waystones",
        content: [
          "PoE2's endgame is built on Waystones and the Atlas, not PoE1-style Watchstones. Waystones are map keys consumed in the Map Device and range Tier I-XVI (I-V white, VI-X yellow, XI-XV red; T16 only by corrupting a T15 with a Vaal Orb).",
          "As of 0.5.0, Waystones must be identified before they can be used.",
          "Precursor Towers reveal the surrounding Atlas and let you apply Tablets to inject league mechanics into nearby maps.",
        ],
        subsections: [
          {
            title: "Atlas Tree & Progression",
            content: [
              "The Atlas Passive Tree has 300+ nodes (around 301) and is fully allocatable in 0.5.0 with free re-allocation. It is reorganised so each league mechanic (Breach, Delirium, Abyss, Expedition, Ritual) has its own sub-tree, questline and pinnacle boss.",
              "0.5.0 added the Precursor Fortress (rises after your first Tower; its maps grant Atlas passive points and culminate in the Arbiter of Ash) and Masters of the Atlas (Doryani, Hilda, Jado), each offering 12 nodes of which 4 are selectable.",
              "Citadels are rare maps that yield Crisis Fragments toward the Burning Monolith. 0.5.0 added two new Citadel maps and bosses dropping keys to the new pinnacle, the Arbiter of Divinity.",
            ],
          },
        ],
      },
    ],
    relatedContent: [
      {
        title: "Currency & Crafting",
        description: "Spend your endgame loot",
        href: "/mechanics/economy",
        type: "mechanic",
      },
      {
        title: "Mapping Guide",
        description: "Practical mapping tips",
        href: "/guides/mapping",
        type: "guide",
      },
    ],
  },

  trading: {
    title: "Trading",
    description: "How trading works in PoE2 0.5.x",
    sections: [
      {
        title: "Trading Fundamentals",
        content: [
          "Trade items on the official PoE2 trade site (pathofexile.com/trade/search/poe2), which provides search filters and a contact button that formats whispers for you.",
          "Stackable currency can be traded through the in-game Currency Exchange. A premium stash tab is required to list items for sale.",
          "Prices are player-driven and reset each league, so price-check against current listings rather than fixed ratios.",
        ],
        subsections: [
          {
            title: "Price Checking",
            content: [
              "Compare similar items by matching their key modifiers, item level and base type.",
              "Use pseudo-stat searches (such as total resistance) to find equivalent gear quickly.",
              "Account for near-perfect rolls and demand when pricing high-end items, and use live search for rare or high-value targets.",
            ],
          },
        ],
      },
    ],
    relatedContent: [
      {
        title: "Currency & Crafting",
        description: "Understand what you're trading",
        href: "/mechanics/economy",
        type: "mechanic",
      },
      {
        title: "Trading Guide",
        description: "Practical trading tips",
        href: "/guides/trading",
        type: "guide",
      },
    ],
  },
};

const mechanicIconMap: Record<ContentCategory, ContentIcon> = {
  "damage-types": "Zap",
  "status-effects": "Activity",
  "character-stats": "User",
  economy: "Coins",
  gameplay: "Book",
  trading: "Coins",
  "boss-fights": "Sword",
  "character-building": "User",
  equipment: "Box",
  combat: "Crosshair",
  progression: "ArrowUp",
  mapping: "Map",
};

export const mechanicsWithMeta: ContentWithMeta[] = Object.entries(mechanics).map(
  ([id, mechanic]) => ({
    ...mechanic,
    id: id as ContentCategory,
    icon: mechanicIconMap[id as ContentCategory],
  })
);
