// Path of Exile 2 ascendancy data — verified against the 0.5.x ("Return of the
// Ancients") roster. Live game has 8 base classes and 23 distinct ascendancies.
// Source of truth: docs/poe2-2026-reference.md (cross-checked vs maxroll,
// poe2db, official patch notes). Templar was never shipped and is excluded.

export const POE2_DATA_VERSION = "0.5.x";

export type BaseClassId =
  | "warrior"
  | "witch"
  | "ranger"
  | "mercenary"
  | "monk"
  | "sorceress"
  | "huntress"
  | "druid";

export type AscendancyClass =
  // Warrior
  | "warbringer"
  | "titan"
  | "smith-of-kitava"
  // Witch
  | "infernalist"
  | "bloodmage"
  | "lich"
  // Ranger
  | "deadeye"
  | "pathfinder"
  // Mercenary
  | "witchhunter"
  | "gemling"
  | "tactician"
  // Monk
  | "invoker"
  | "acolyte"
  | "martial-artist"
  // Sorceress
  | "stormweaver"
  | "chronomancer"
  | "disciple-of-varashta"
  // Huntress
  | "amazon"
  | "ritualist"
  | "spirit-walker"
  // Druid
  | "shaman"
  | "oracle";

export interface BaseClass {
  id: BaseClassId;
  name: string;
  attributes: string;
  description: string;
}

export interface Ascendancy {
  title: string;
  baseClass: BaseClassId;
  /** Patch the ascendancy first became available, e.g. "0.1.0". */
  introduced: string;
  description: string;
  playstyle: string;
  keyFeatures: string[];
  mechanics: string[];
  buildTypes: string[];
}

export interface AscendancyWithMeta extends Ascendancy {
  id: AscendancyClass;
  /** Optional hero image; only the launch (0.1.0) ascendancies have art assets. */
  image?: string;
}

export const baseClasses: Record<BaseClassId, BaseClass> = {
  warrior: {
    id: "warrior",
    name: "Warrior",
    attributes: "Strength",
    description:
      "A heavy melee bruiser that relies on Strength, big two-handed weapons, slams and armour to fight up close.",
  },
  witch: {
    id: "witch",
    name: "Witch",
    attributes: "Intelligence",
    description:
      "An Intelligence spellcaster and summoner who commands minions, fire, chaos and energy shield.",
  },
  ranger: {
    id: "ranger",
    name: "Ranger",
    attributes: "Dexterity",
    description:
      "A Dexterity bow specialist built around mobility, accuracy and projectile damage.",
  },
  mercenary: {
    id: "mercenary",
    name: "Mercenary",
    attributes: "Strength / Dexterity",
    description:
      "A crossbow-wielding hybrid that swaps ammunition types and grenades, scaling on Strength and Dexterity.",
  },
  monk: {
    id: "monk",
    name: "Monk",
    attributes: "Dexterity / Intelligence",
    description:
      "A fast Dexterity/Intelligence martial fighter using quarterstaves, combo strikes and elemental power charges.",
  },
  sorceress: {
    id: "sorceress",
    name: "Sorceress",
    attributes: "Intelligence",
    description:
      "An Intelligence elementalist focused on lightning, cold and fire spellcasting with strong area control.",
  },
  huntress: {
    id: "huntress",
    name: "Huntress",
    attributes: "Dexterity",
    description:
      "A Dexterity spear-and-buckler skirmisher added in 0.2.0 (Dawn of the Hunt), blending melee throws and parries.",
  },
  druid: {
    id: "druid",
    name: "Druid",
    attributes: "Strength / Intelligence",
    description:
      "A Strength/Intelligence shapeshifter added in 0.4.0 (The Last of the Druids) who transforms into Bear, Wolf and Wyvern forms. PoE2's first STR/INT hybrid class.",
  },
};

export const ascendancies: Record<AscendancyClass, Ascendancy> = {
  // ----- Warrior -----
  warbringer: {
    title: "Warbringer",
    baseClass: "warrior",
    introduced: "0.1.0",
    description:
      "A totem and warcry Warrior who buffs themselves and the battlefield, channelling ancestral power into heavy melee combat.",
    playstyle: "Warcry- and totem-supported melee bruiser",
    keyFeatures: ["Warcry empowerment", "Totem support", "Strength-based durability", "Melee slams"],
    mechanics: ["Warcry effects", "Totem placement", "Armour and life scaling"],
    buildTypes: ["Warcry Slammer", "Totem Warrior", "Tanky Melee"],
  },
  titan: {
    title: "Titan",
    baseClass: "warrior",
    introduced: "0.1.0",
    description:
      "A defensive juggernaut Warrior built around armour, stun and raw physical force, excelling at face-tanking and heavy weapon strikes.",
    playstyle: "Tanky physical melee with strong defences",
    keyFeatures: ["Armour stacking", "Physical damage", "Stun and knockback", "High survivability"],
    mechanics: ["Armour-based mitigation", "Stun buildup", "Heavy hits"],
    buildTypes: ["Armour Tank", "Two-Handed Slammer", "Stun Build"],
  },
  "smith-of-kitava": {
    title: "Smith of Kitava",
    baseClass: "warrior",
    introduced: "0.2.0",
    description:
      "A Warrior ascendancy added in Dawn of the Hunt, themed around forging and animating gear, with a focus on weapon-smithing synergies and durable melee combat.",
    playstyle: "Crafting-themed durable melee Warrior",
    keyFeatures: ["Equipment-focused bonuses", "Strength-based defence", "Melee weapon scaling"],
    mechanics: ["Gear-driven modifiers", "Armour and life synergies"],
    buildTypes: ["Weapon Smith", "Defensive Melee"],
  },

  // ----- Witch -----
  infernalist: {
    title: "Infernalist",
    baseClass: "witch",
    introduced: "0.1.0",
    description:
      "A fire- and demon-themed Witch who summons an Infernal Hound and channels hellfire, trading life management for powerful burning and chaos damage.",
    playstyle: "Aggressive fire/chaos caster and summoner",
    keyFeatures: ["Fire and chaos damage", "Infernal Hound minion", "Demonic empowerment", "Life-as-fuel mechanics"],
    mechanics: ["Fire damage scaling", "Minion synergy", "Ignite and burning"],
    buildTypes: ["Fire Caster", "Minion Summoner", "Ignite DoT"],
  },
  bloodmage: {
    title: "Blood Mage",
    baseClass: "witch",
    introduced: "0.1.0",
    description:
      "A high-risk Witch who pays for spells with life instead of mana via the Sanguimancy mechanic, leaning into life-cost casting and blood-themed bonuses.",
    playstyle: "Life-cost spellcaster trading safety for power",
    keyFeatures: ["Life-cost casting (Sanguimancy)", "Spell damage scaling", "Blood-themed bonuses"],
    mechanics: ["Life paid for skills", "Recovery management", "Spell power scaling"],
    buildTypes: ["Life-Cost Caster", "Crit Spellcaster"],
  },
  lich: {
    title: "Lich",
    baseClass: "witch",
    introduced: "0.2.0",
    description:
      "A Witch ascendancy added in Dawn of the Hunt focused on chaos, energy shield and undeath. An unlockable Abyssal Lich variant swaps several notables for a darker, Abyss-themed playstyle (it is a variant, not a separate ascendancy).",
    playstyle: "Energy-shield and chaos-focused caster",
    keyFeatures: ["Energy shield scaling", "Chaos damage", "Abyssal Lich variant"],
    mechanics: ["Energy shield synergies", "Chaos and DoT scaling"],
    buildTypes: ["Energy Shield Caster", "Chaos DoT"],
  },

  // ----- Ranger -----
  deadeye: {
    title: "Deadeye",
    baseClass: "ranger",
    introduced: "0.1.0",
    description:
      "A precision bow Ranger specialising in projectiles, accuracy and mobility, shredding packs and bosses from range.",
    playstyle: "Mobile ranged projectile specialist",
    keyFeatures: ["Projectile mastery", "Accuracy and crit", "High mobility", "Bow scaling"],
    mechanics: ["Projectile behaviour", "Distance scaling", "Movement speed"],
    buildTypes: ["Bow Crit", "Projectile Clearer", "Lightning Arrow"],
  },
  pathfinder: {
    title: "Pathfinder",
    baseClass: "ranger",
    introduced: "0.1.0",
    description:
      "A flask- and poison-focused Ranger who turns flasks into a sustained engine of damage and utility, excelling with chaos and elemental ailments.",
    playstyle: "Flask-driven hybrid with poison/ailment focus",
    keyFeatures: ["Flask mastery", "Poison and ailments", "Sustained utility"],
    mechanics: ["Flask uptime", "Poison scaling", "Ailment application"],
    buildTypes: ["Poison Build", "Flask Sustain", "Ailment Stacker"],
  },

  // ----- Mercenary -----
  witchhunter: {
    title: "Witchhunter",
    baseClass: "mercenary",
    introduced: "0.1.0",
    description:
      "A Mercenary who hunts casters and the supernatural, mixing crossbow fire with anti-magic and suppression tools for strong single-target and survivability.",
    playstyle: "Crossbow hybrid with anti-caster utility",
    keyFeatures: ["Crossbow damage", "Suppression and debuffs", "Physical and elemental scaling"],
    mechanics: ["Crossbow ammunition", "Debuff application"],
    buildTypes: ["Crossbow DPS", "Suppression Build"],
  },
  gemling: {
    title: "Gemling Legionnaire",
    baseClass: "mercenary",
    introduced: "0.1.0",
    description:
      "A Mercenary fused with skill gems, gaining enhanced gem quality and attribute flexibility that lets builds push gem-driven scaling and meet tough requirements.",
    playstyle: "Gem-scaling, attribute-flexible hybrid",
    keyFeatures: ["Enhanced gem quality", "Attribute flexibility", "Versatile scaling"],
    mechanics: ["Gem bonuses", "Attribute conversion"],
    buildTypes: ["Gem-Scaling Attacker", "Hybrid Caster"],
  },
  tactician: {
    title: "Tactician",
    baseClass: "mercenary",
    introduced: "0.2.0",
    description:
      "A Mercenary ascendancy added in Dawn of the Hunt focused on team-fight tactics, banners and battlefield control alongside crossbow combat.",
    playstyle: "Support-leaning crossbow Mercenary",
    keyFeatures: ["Battlefield control", "Crossbow combat", "Utility buffs"],
    mechanics: ["Tactical buffs", "Crossbow ammunition"],
    buildTypes: ["Crossbow Support", "Control Build"],
  },

  // ----- Monk -----
  invoker: {
    title: "Invoker",
    baseClass: "monk",
    introduced: "0.1.0",
    description:
      "A Monk who channels elemental power and power charges through quarterstaff combos, converting damage and weaving fast elemental melee strikes.",
    playstyle: "Fast elemental quarterstaff combatant",
    keyFeatures: ["Power charges", "Elemental conversion", "Combo strikes", "High attack speed"],
    mechanics: ["Charge generation", "Damage conversion", "Combo skills"],
    buildTypes: ["Elemental Monk", "Power-Charge Striker"],
  },
  acolyte: {
    title: "Acolyte of Chayula",
    baseClass: "monk",
    introduced: "0.1.0",
    description:
      "A Monk devoted to the Beast Chayula, leaning into chaos damage, darkness and Chayula's blessings to convert and sustain through dangerous fights.",
    playstyle: "Chaos-focused martial caster-hybrid",
    keyFeatures: ["Chaos damage", "Darkness as a defensive resource", "Chayula's blessings"],
    mechanics: ["Chaos scaling", "Darkness sustain"],
    buildTypes: ["Chaos Monk", "Darkness Tank"],
  },
  "martial-artist": {
    title: "Martial Artist",
    baseClass: "monk",
    introduced: "0.5.0",
    description:
      "A Monk ascendancy added in Return of the Ancients (0.5.0) centred on unarmed and quarterstaff martial combat, combos and rapid melee execution.",
    playstyle: "Combo-driven melee Monk",
    keyFeatures: ["Combo melee scaling", "High attack speed", "Martial-arts mechanics"],
    mechanics: ["Combo chains", "Melee strike synergies"],
    buildTypes: ["Combo Striker", "Unarmed/Staff Melee"],
  },

  // ----- Sorceress -----
  stormweaver: {
    title: "Stormweaver",
    baseClass: "sorceress",
    introduced: "0.1.0",
    description:
      "A Sorceress who masters lightning and cold, chaining shocks and freezes for high-tempo elemental spellcasting and strong crowd control.",
    playstyle: "High-tempo lightning/cold spellcaster",
    keyFeatures: ["Lightning and cold mastery", "Shock and chill", "Chain effects"],
    mechanics: ["Shock scaling", "Spell chaining", "Ailment application"],
    buildTypes: ["Lightning Caster", "Cold Caster", "Ailment Build"],
  },
  chronomancer: {
    title: "Chronomancer",
    baseClass: "sorceress",
    introduced: "0.1.0",
    description:
      "A Sorceress who manipulates time, rewinding, recovering and bending cooldowns to control the pace of combat and recover from danger.",
    playstyle: "Time-manipulation control caster",
    keyFeatures: ["Time manipulation", "Cooldown recovery", "Defensive rewinds"],
    mechanics: ["Temporal effects", "Cooldown reduction"],
    buildTypes: ["Control Caster", "Defensive Spellcaster"],
  },
  "disciple-of-varashta": {
    title: "Disciple of Varashta",
    baseClass: "sorceress",
    introduced: "0.2.0",
    description:
      "A Sorceress ascendancy added in Dawn of the Hunt with a spirit/nature-magic theme. Details remain limited in current sources; treat specifics as provisional pending the live skill list.",
    playstyle: "Spirit/nature-themed spellcaster",
    keyFeatures: ["Spell damage scaling", "Thematic spirit bonuses"],
    mechanics: ["Spell scaling"],
    buildTypes: ["Spellcaster"],
  },

  // ----- Huntress -----
  amazon: {
    title: "Amazon",
    baseClass: "huntress",
    introduced: "0.2.0",
    description:
      "A Huntress ascendancy from Dawn of the Hunt built around spear combat, accuracy and martial prowess, rewarding precise melee and thrown-spear play.",
    playstyle: "Spear-focused martial skirmisher",
    keyFeatures: ["Spear combat", "Accuracy and crit", "Mobility"],
    mechanics: ["Spear skills", "Accuracy scaling"],
    buildTypes: ["Spear Melee", "Thrown Spear"],
  },
  ritualist: {
    title: "Ritualist",
    baseClass: "huntress",
    introduced: "0.2.0",
    description:
      "A Huntress ascendancy from Dawn of the Hunt with a ritual and ailment theme, leaning into damage-over-time, sacrifice mechanics and sustained spear combat.",
    playstyle: "Ailment- and ritual-themed Huntress",
    keyFeatures: ["Ailment scaling", "Ritual/sacrifice mechanics", "Spear combat"],
    mechanics: ["Damage over time", "Ailment application"],
    buildTypes: ["Ailment Spear", "DoT Build"],
  },
  "spirit-walker": {
    title: "Spirit Walker",
    baseClass: "huntress",
    introduced: "0.5.0",
    description:
      "A Huntress ascendancy added in Return of the Ancients (0.5.0) with a spirit-themed kit. Public detail is limited so far; treat specifics as provisional pending the live skill list.",
    playstyle: "Spirit-themed Huntress (details emerging)",
    keyFeatures: ["Spirit-themed bonuses", "Spear combat"],
    mechanics: ["Thematic spirit mechanics"],
    buildTypes: ["Spear Melee"],
  },

  // ----- Druid -----
  shaman: {
    title: "Shaman",
    baseClass: "druid",
    introduced: "0.4.0",
    description:
      "A Druid ascendancy from The Last of the Druids leaning into shapeshifting and primal/elemental power, blending beast forms with Strength/Intelligence scaling.",
    playstyle: "Shapeshifting primal-elemental Druid",
    keyFeatures: ["Shapeshift forms (Bear/Wolf/Wyvern)", "Elemental and physical power", "STR/INT hybrid scaling"],
    mechanics: ["Form transformation", "Elemental scaling"],
    buildTypes: ["Shapeshifter", "Primal Caster"],
  },
  oracle: {
    title: "Oracle",
    baseClass: "druid",
    introduced: "0.4.0",
    description:
      "A Druid ascendancy from The Last of the Druids with a more mystic, prophetic theme. Public detail is limited; treat specifics as provisional pending the live skill list.",
    playstyle: "Mystic shapeshifting Druid (details emerging)",
    keyFeatures: ["Shapeshift forms", "Thematic mystic bonuses"],
    mechanics: ["Form transformation"],
    buildTypes: ["Shapeshifter"],
  },
};

// Only the eight launch (0.1.0) ascendancies ship with hero art under
// /public/ascendancies; newer ascendancies fall back to a placeholder in the UI.
const ASCENDANCIES_WITH_ART = new Set<AscendancyClass>([
  "warbringer",
  "titan",
  "infernalist",
  "bloodmage",
  "deadeye",
  "pathfinder",
  "witchhunter",
  "gemling",
  "invoker",
  "acolyte",
  "stormweaver",
  "chronomancer",
]);

export const ascendanciesWithMeta: AscendancyWithMeta[] = (
  Object.entries(ascendancies) as [AscendancyClass, Ascendancy][]
).map(([id, data]) => ({
  ...data,
  id,
  image: ASCENDANCIES_WITH_ART.has(id) ? `/ascendancies/${id}.webp` : undefined,
}));

export const ascendanciesByBaseClass: { base: BaseClass; ascendancies: AscendancyWithMeta[] }[] =
  (Object.keys(baseClasses) as BaseClassId[]).map((baseId) => ({
    base: baseClasses[baseId],
    ascendancies: ascendanciesWithMeta.filter((a) => a.baseClass === baseId),
  }));
