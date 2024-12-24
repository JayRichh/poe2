export type AscendancyClass =
  | "acolyte"
  | "bloodmage"
  | "chronomancer"
  | "deadeye"
  | "gemling"
  | "infernalist"
  | "invoker"
  | "pathfinder"
  | "stormweaver"
  | "titan"
  | "warbringer"
  | "witchhunter";

export interface Ascendancy {
  title: string;
  description: string;
  playstyle: string;
  keyFeatures: string[];
  mechanics: string[];
  buildTypes: string[];
}

export interface AscendancyWithMeta extends Ascendancy {
  id: AscendancyClass;
  image: string;
}

export const ascendancies: Record<AscendancyClass, Ascendancy> = {
  acolyte: {
    title: "Acolyte",
    description:
      "Masters of divine magic and holy powers, Acolytes channel sacred energies to smite foes and protect allies.",
    playstyle: "Versatile caster focusing on holy magic and support abilities",
    keyFeatures: [
      "Divine spell specialization",
      "Holy damage amplification",
      "Support and healing capabilities",
      "Energy shield mastery",
    ],
    mechanics: [
      "Divine damage conversion",
      "Energy shield regeneration",
      "Holy ground effects",
      "Consecrated area bonuses",
    ],
    buildTypes: ["Holy Spell Caster", "Divine Support", "Energy Shield Tank", "Holy Hybrid"],
  },
  bloodmage: {
    title: "Blood Mage",
    description:
      "Dark spellcasters who harness their own vitality to fuel devastating blood magic.",
    playstyle: "High-risk, high-reward caster using health as a resource",
    keyFeatures: [
      "Blood magic mastery",
      "Health-based spellcasting",
      "Life force manipulation",
      "Blood orb generation",
    ],
    mechanics: [
      "Life cost abilities",
      "Blood orb mechanics",
      "Health regeneration",
      "Damage scaling with missing health",
    ],
    buildTypes: ["Pure Blood Mage", "Blood-Life Hybrid", "Blood Tank", "Blood DPS"],
  },
  chronomancer: {
    title: "Chronomancer",
    description: "Time-wielding mages who manipulate the flow of battle through temporal magic.",
    playstyle: "Strategic caster with time manipulation abilities",
    keyFeatures: [
      "Time manipulation",
      "Cooldown reduction",
      "Action speed control",
      "Temporal shields",
    ],
    mechanics: [
      "Time dilation",
      "Temporal bubble creation",
      "Cooldown manipulation",
      "Speed modification",
    ],
    buildTypes: ["Time Weaver", "Temporal Controller", "Speed Manipulator", "Cooldown Master"],
  },
  deadeye: {
    title: "Deadeye",
    description: "Elite marksmen who excel at precision strikes and projectile mastery.",
    playstyle: "Ranged specialist focusing on accuracy and projectile manipulation",
    keyFeatures: [
      "Projectile mastery",
      "Critical strike expertise",
      "Range enhancement",
      "Precision targeting",
    ],
    mechanics: [
      "Projectile manipulation",
      "Chain targeting",
      "Distance damage scaling",
      "Mark system",
    ],
    buildTypes: ["Bow Master", "Projectile Specialist", "Critical Striker", "Chain Expert"],
  },
  gemling: {
    title: "Gemling",
    description: "Technomancers who harness the power of skill gems through direct integration.",
    playstyle: "Versatile gem specialist with unique skill combinations",
    keyFeatures: [
      "Gem empowerment",
      "Skill fusion",
      "Gem slot manipulation",
      "Enhanced gem effects",
    ],
    mechanics: ["Gem linking", "Skill gem enhancement", "Gem slot bonuses", "Fusion mechanics"],
    buildTypes: ["Gem Fusion Master", "Multi-Skill Weaver", "Gem Enhancer", "Skill Combiner"],
  },
  infernalist: {
    title: "Infernalist",
    description: "Masters of hellfire who command devastating fire magic and demonic powers.",
    playstyle: "Aggressive fire caster with damage over time focus",
    keyFeatures: ["Fire mastery", "Ignite specialization", "Demonic empowerment", "Area damage"],
    mechanics: ["Fire conversion", "Ignite proliferation", "Burning damage", "Fire area effects"],
    buildTypes: ["Pure Fire Caster", "Ignite Specialist", "Fire DoT Master", "Area Burner"],
  },
  invoker: {
    title: "Invoker",
    description: "Elemental specialists who combine different elements for devastating effects.",
    playstyle: "Complex caster utilizing elemental combinations",
    keyFeatures: ["Element combination", "Spell weaving", "Elemental mastery", "Combo system"],
    mechanics: ["Element fusion", "Combo points", "Elemental cycling", "Spell enhancement"],
    buildTypes: ["Tri-Elemental", "Combo Caster", "Element Weaver", "Fusion Master"],
  },
  pathfinder: {
    title: "Pathfinder",
    description: "Masters of alchemy who enhance their abilities through magical concoctions.",
    playstyle: "Flask-focused hybrid with strong utility",
    keyFeatures: ["Flask mastery", "Poison expertise", "Nature magic", "Movement skills"],
    mechanics: ["Flask enhancement", "Poison application", "Nature damage", "Movement bonuses"],
    buildTypes: ["Flask Master", "Poison Specialist", "Nature Weaver", "Mobile Fighter"],
  },
  stormweaver: {
    title: "Stormweaver",
    description: "Lightning masters who harness the raw power of storms and electricity.",
    playstyle: "Fast-paced lightning caster with chain effects",
    keyFeatures: ["Lightning mastery", "Chain lightning", "Shock application", "Storm calling"],
    mechanics: ["Lightning conversion", "Chain mechanics", "Shock effects", "Storm generation"],
    buildTypes: ["Chain Lightning", "Storm Caller", "Shock Specialist", "Lightning Master"],
  },
  titan: {
    title: "Titan",
    description: "Mighty warriors who excel in physical combat and defensive capabilities.",
    playstyle: "Tanky melee fighter with strong physical damage",
    keyFeatures: ["Physical mastery", "Defensive prowess", "Endurance", "Weapon expertise"],
    mechanics: ["Physical scaling", "Defense bonuses", "Endurance charges", "Weapon mastery"],
    buildTypes: ["Physical Tank", "Weapon Master", "Defense Specialist", "Endurance Fighter"],
  },
  warbringer: {
    title: "Warbringer",
    description: "Battle commanders who empower themselves and allies through war cries.",
    playstyle: "Support warrior with powerful offensive capabilities",
    keyFeatures: ["War cry mastery", "Rally mechanics", "Ally empowerment", "Combat control"],
    mechanics: ["War cry effects", "Rally point system", "Group buffs", "Combat enhancement"],
    buildTypes: ["War Cry Master", "Rally Support", "Combat Leader", "Group Buffer"],
  },
  witchhunter: {
    title: "Witch Hunter",
    description: "Specialized hunters who excel at tracking and eliminating supernatural threats.",
    playstyle: "Hybrid fighter combining physical and magical abilities",
    keyFeatures: ["Curse expertise", "Mark system", "Supernatural hunting", "Debuff mastery"],
    mechanics: ["Curse application", "Mark mechanics", "Hunt bonuses", "Debuff effects"],
    buildTypes: ["Curse Specialist", "Mark Hunter", "Debuff Master", "Hybrid Hunter"],
  },
};

export const ascendanciesWithMeta: AscendancyWithMeta[] = Object.entries(ascendancies).map(
  ([id, data]) => ({
    ...data,
    id: id as AscendancyClass,
    image: `/ascendancies/${id}.webp`,
  })
);
