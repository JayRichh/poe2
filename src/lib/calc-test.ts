import { DPSCalc } from "./calculations";

// Test case 1: Basic Physical Weapon
console.log("\n=== Test Case 1: Basic Physical Weapon ===");
const basicPhysicalTest = new DPSCalc({
  // Weapon 1 - Basic Physical Bow
  weapon1MinBaseDmg: 100,
  weapon1MaxBaseDmg: 150,
  weapon1PhysicalMin: 80,
  weapon1PhysicalMax: 120,
  weapon1LightningMin: 0,
  weapon1LightningMax: 0,
  weapon1FireMin: 0,
  weapon1FireMax: 0,
  weapon1ColdMin: 0,
  weapon1ColdMax: 0,
  weapon1ChaosMin: 0,
  weapon1ChaosMax: 0,

  // Global Settings
  attackSpeed: 1.2,
  attackSpeedIncrease: 20,
  totalSkillProjectiles: 1,
  critChance: 5,
  critDamage: 150,
  resPenetration: 0,
  bowDamage: 22,

  // Base increases
  physicalDamageIncrease: 43,
  elementalDamageIncrease: 0,
  attackDamageIncrease: 43,
  projectileDamageIncrease: 0,

  // Support gems all disabled
  martialTempo: false,
  primalArmament: false,
  lightningInfusion: false,
  iceBite: false,

  // Required fields for calculations
  weapon1MinBase: 100,
  weapon1MaxBase: 150,
  newPhysicalMinWeapon1: 80,
  newPhysicalMaxWeapon1: 120,
  damageMultiplierWeapon1: 0.4,
  baseCritChance: 5,
  critChanceIncrease: 0,
  critMultiplier: 1.5,
});

// Format number with K/M suffix
const formatNumber = (num: number): string => {
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(2)}M`;
  }
  if (num >= 1_000) {
    return `${(num / 1_000).toFixed(1)}K`;
  }
  return Math.round(num).toLocaleString();
};

const basicResults = basicPhysicalTest.getResults();
console.log("Basic Physical DPS:", formatNumber(basicResults.totalDpsWeapon1));
console.log("Physical Damage:", formatNumber(basicResults.finalPhysicalDamage));
console.log("Attack Speed:", basicPhysicalTest.attacksPerSecond.toFixed(2), "attacks/sec");
console.log("Physical %:", basicResults.physicalDmgPercentWeapon1.toFixed(1) + "%");
console.log("Crit Chance:", (basicResults.critChanceWeapon1 * 100).toFixed(1) + "%");
console.log("Crit Multiplier:", (basicResults.critMultiplierWeapon1 * 100).toFixed(0) + "%");

// Test case 2: Elemental Weapon with Status Effects
console.log("\n=== Test Case 2: Elemental Weapon with Status Effects ===");
const elementalTest = new DPSCalc({
  // Weapon 1 - Lightning Bow
  weapon1MinBaseDmg: 80,
  weapon1MaxBaseDmg: 120,
  weapon1PhysicalMin: 30,
  weapon1PhysicalMax: 45,
  weapon1LightningMin: 50,
  weapon1LightningMax: 75,
  weapon1FireMin: 0,
  weapon1FireMax: 0,
  weapon1ColdMin: 0,
  weapon1ColdMax: 0,
  weapon1ChaosMin: 0,
  weapon1ChaosMax: 0,

  // Global Settings
  attackSpeed: 1.5,
  attackSpeedIncrease: 30,
  totalSkillProjectiles: 1,
  critChance: 15,
  critDamage: 200,
  resPenetration: 20,
  bowDamage: 22,

  // Status Effects
  shock: true,
  shockMagnitude: 40,
  electrocution: true,
  electrocutionDuration: 50,

  // Base increases
  physicalDamageIncrease: 43,
  elementalDamageIncrease: 150,
  attackDamageIncrease: 43,
  projectileDamageIncrease: 75,

  // Support gems
  lightningInfusion: true,

  // Required fields for calculations
  weapon1MinBase: 80,
  weapon1MaxBase: 120,
  newPhysicalMinWeapon1: 30,
  newPhysicalMaxWeapon1: 45,
  damageMultiplierWeapon1: 0.4,
  baseCritChance: 15,
  critChanceIncrease: 0,
  critMultiplier: 2.0,
});

const elementalResults = elementalTest.getResults();
console.log("Elemental DPS:", formatNumber(elementalResults.totalDpsWeapon1));
console.log("Physical Damage:", formatNumber(elementalResults.finalPhysicalDamage));
console.log("Lightning Damage:", formatNumber(elementalResults.finalLightningDamage));
console.log("Physical %:", elementalResults.physicalDmgPercentWeapon1.toFixed(1) + "%");
console.log("Lightning %:", elementalResults.lightningDmgPercentWeapon1.toFixed(1) + "%");
console.log("Attack Speed:", elementalTest.attacksPerSecond.toFixed(2), "attacks/sec");
console.log("Shock Effect:", elementalResults.magnitudePercentWeapon1.toFixed(1) + "%");

// Test case 3: Full Configuration
console.log("\n=== Test Case 3: Full Configuration with All Support Gems ===");
const fullConfigTest = new DPSCalc({
  // Weapon 1 - Hybrid Bow
  weapon1MinBaseDmg: 120,
  weapon1MaxBaseDmg: 180,
  weapon1PhysicalMin: 60,
  weapon1PhysicalMax: 90,
  weapon1LightningMin: 30,
  weapon1LightningMax: 45,
  weapon1FireMin: 20,
  weapon1FireMax: 30,
  weapon1ColdMin: 10,
  weapon1ColdMax: 15,
  weapon1ChaosMin: 0,
  weapon1ChaosMax: 0,

  // Global Settings
  attackSpeed: 1.8,
  attackSpeedIncrease: 50,
  totalSkillProjectiles: 2,
  critChance: 25,
  critDamage: 250,
  resPenetration: 35,
  bowDamage: 22,

  // Status Effects
  shock: true,
  shockMagnitude: 40,
  electrocution: true,
  electrocutionDuration: 50,
  exposure: true,
  exposureMagnitude: 25,

  // Base increases
  physicalDamageIncrease: 43,
  elementalDamageIncrease: 150,
  attackDamageIncrease: 43,
  projectileDamageIncrease: 75,

  // All support gems enabled
  martialTempo: true,
  primalArmament: true,
  lightningInfusion: true,
  iceBite: true,

  // Required fields for calculations
  weapon1MinBase: 120,
  weapon1MaxBase: 180,
  newPhysicalMinWeapon1: 60,
  newPhysicalMaxWeapon1: 90,
  damageMultiplierWeapon1: 0.4,
  baseCritChance: 25,
  critChanceIncrease: 0,
  critMultiplier: 2.5,
});

const fullResults = fullConfigTest.getResults();
console.log("Total DPS:", formatNumber(fullResults.totalDpsWeapon1));
console.log("\nDamage Breakdown:");
console.log(
  "Physical:",
  formatNumber(fullResults.finalPhysicalDamage),
  `(${fullResults.physicalDmgPercentWeapon1.toFixed(1)}%)`
);
console.log(
  "Lightning:",
  formatNumber(fullResults.finalLightningDamage),
  `(${fullResults.lightningDmgPercentWeapon1.toFixed(1)}%)`
);
console.log(
  "Fire:",
  formatNumber(fullResults.finalFireDamage),
  `(${fullResults.fireDmgPercentWeapon1.toFixed(1)}%)`
);
console.log(
  "Cold:",
  formatNumber(fullResults.finalColdDamage),
  `(${fullResults.coldDmgPercentWeapon1.toFixed(1)}%)`
);
console.log("\nStats:");
console.log("Attack Speed:", fullConfigTest.attacksPerSecond.toFixed(2), "attacks/sec");
console.log("Crit Chance:", (fullResults.critChanceWeapon1 * 100).toFixed(1) + "%");
console.log("Crit Multiplier:", (fullResults.critMultiplierWeapon1 * 100).toFixed(0) + "%");
console.log("Projectiles:", 2); // Using the input value directly since it's constant in this test

// Test all progression and build type comparisons
console.log("\n=== Early Game Comparison (1-20) ===");
const earlyGameTest = new DPSCalc({
  // Early game weapons from test cases
  weapon1MinBaseDmg: 5,
  weapon1MaxBaseDmg: 15,
  weapon1PhysicalMin: 5,
  weapon1PhysicalMax: 15,
  weapon1LightningMin: 0,
  weapon1LightningMax: 0,
  weapon1FireMin: 0,
  weapon1FireMax: 0,
  weapon1ColdMin: 0,
  weapon1ColdMax: 0,
  weapon1ChaosMin: 0,
  weapon1ChaosMax: 0,

  weapon2MinBaseDmg: 6,
  weapon2MaxBaseDmg: 18,
  weapon2PhysicalMin: 4,
  weapon2PhysicalMax: 12,
  weapon2LightningMin: 2,
  weapon2LightningMax: 6,
  weapon2FireMin: 0,
  weapon2FireMax: 0,
  weapon2ColdMin: 0,
  weapon2ColdMax: 0,
  weapon2ChaosMin: 0,
  weapon2ChaosMax: 0,

  // Early game settings from test cases
  attackSpeed: 1.4,
  attackSpeedIncrease: 0,
  totalSkillProjectiles: 1,
  damageMultiplier: 1.0,
  critChance: 5,
  critDamage: 130,
  resPenetration: 0,
  bowDamage: 0,

  physicalDamageIncrease: 20,
  elementalDamageIncrease: 0,
  attackDamageIncrease: 10,
  projectileDamageIncrease: 0,

  martialTempo: false,
  primalArmament: false,
  lightningInfusion: false,
  iceBite: false,

  shock: false,
  shockMagnitude: 0,
  shockDuration: 0,
  electrocution: false,
  electrocutionDuration: 0,
  exposure: false,
  exposureMagnitude: 0,
  exposureDuration: 0,

  // Required fields
  weapon1MinBase: 5,
  weapon1MaxBase: 15,
  weapon2MinBase: 6,
  weapon2MaxBase: 18,
  newPhysicalMinWeapon1: 5,
  newPhysicalMaxWeapon1: 15,
  newPhysicalMinWeapon2: 4,
  newPhysicalMaxWeapon2: 12,
  damageMultiplierWeapon1: 0.4,
  damageMultiplierWeapon2: 0.4,
  baseCritChance: 5,
  baseCritChance2: 5,
  critChanceIncrease: 0,
  critChanceIncrease2: 0,
  critMultiplier: 1.3,
  critMultiplier2: 1.3,
});

const earlyResults = earlyGameTest.getResults();
console.log("Early Game Comparison:");
console.log("Pure Physical DPS:", formatNumber(earlyResults.totalDpsWeapon1));
console.log("Split Damage DPS:", formatNumber(earlyResults.totalDpsWeapon2));
console.log("DPS Difference:", (earlyResults.dpsIncrease * 100).toFixed(1) + "%");

console.log("\nWeapon 1 (Pure Physical):");
console.log(
  "Physical:",
  formatNumber(earlyResults.finalPhysicalDamage),
  `(${earlyResults.physicalDmgPercentWeapon1.toFixed(1)}%)`
);

console.log("\nWeapon 2 (Split Damage):");
console.log(
  "Physical:",
  formatNumber(earlyResults.finalPhysicalDamage2),
  `(${earlyResults.physicalDmgPercentWeapon2.toFixed(1)}%)`
);
console.log(
  "Lightning:",
  formatNumber(earlyResults.finalLightningDamage2),
  `(${earlyResults.lightningDmgPercentWeapon2.toFixed(1)}%)`
);

console.log("\nStats:");
console.log("Attack Speed:", earlyGameTest.attacksPerSecond.toFixed(2), "attacks/sec");
console.log("Crit Chance:", (earlyResults.critChanceWeapon1 * 100).toFixed(1) + "%");
console.log("Crit Multiplier:", (earlyResults.critMultiplierWeapon1 * 100).toFixed(0) + "%");

// Mid Game Comparison
console.log("\n=== Mid Game Comparison (40-60) ===");
const midGameTest = new DPSCalc({
  // Mid game weapons from test cases
  weapon1MinBaseDmg: 20,
  weapon1MaxBaseDmg: 60,
  weapon1PhysicalMin: 15,
  weapon1PhysicalMax: 45,
  weapon1LightningMin: 5,
  weapon1LightningMax: 15,
  weapon1FireMin: 0,
  weapon1FireMax: 0,
  weapon1ColdMin: 0,
  weapon1ColdMax: 0,
  weapon1ChaosMin: 0,
  weapon1ChaosMax: 0,

  weapon2MinBaseDmg: 25,
  weapon2MaxBaseDmg: 75,
  weapon2PhysicalMin: 10,
  weapon2PhysicalMax: 30,
  weapon2LightningMin: 10,
  weapon2LightningMax: 30,
  weapon2FireMin: 5,
  weapon2FireMax: 15,
  weapon2ColdMin: 0,
  weapon2ColdMax: 0,
  weapon2ChaosMin: 0,
  weapon2ChaosMax: 0,

  // Mid game settings
  attackSpeed: 1.5,
  attackSpeedIncrease: 15,
  totalSkillProjectiles: 1,
  damageMultiplier: 1.2,
  critChance: 7,
  critDamage: 180,
  resPenetration: 10,
  bowDamage: 15,

  physicalDamageIncrease: 80,
  elementalDamageIncrease: 40,
  attackDamageIncrease: 30,
  projectileDamageIncrease: 25,

  martialTempo: true,
  primalArmament: false,
  lightningInfusion: false,
  iceBite: false,

  shock: true,
  shockMagnitude: 20,
  shockDuration: 100,
  electrocution: false,
  electrocutionDuration: 0,
  exposure: false,
  exposureMagnitude: 0,
  exposureDuration: 0,

  // Required fields
  weapon1MinBase: 20,
  weapon1MaxBase: 60,
  weapon2MinBase: 25,
  weapon2MaxBase: 75,
  newPhysicalMinWeapon1: 15,
  newPhysicalMaxWeapon1: 45,
  newPhysicalMinWeapon2: 10,
  newPhysicalMaxWeapon2: 30,
  damageMultiplierWeapon1: 0.4,
  damageMultiplierWeapon2: 0.4,
  baseCritChance: 7,
  baseCritChance2: 7,
  critChanceIncrease: 0,
  critChanceIncrease2: 0,
  critMultiplier: 1.8,
  critMultiplier2: 1.8,
});

const midResults = midGameTest.getResults();
console.log("Mid Game Comparison:");
console.log("Physical Focus DPS:", formatNumber(midResults.totalDpsWeapon1));
console.log("Elemental Mix DPS:", formatNumber(midResults.totalDpsWeapon2));
console.log("DPS Difference:", (midResults.dpsIncrease * 100).toFixed(1) + "%");

console.log("\nWeapon 1 (Physical Focus):");
console.log(
  "Physical:",
  formatNumber(midResults.finalPhysicalDamage),
  `(${midResults.physicalDmgPercentWeapon1.toFixed(1)}%)`
);
console.log(
  "Lightning:",
  formatNumber(midResults.finalLightningDamage),
  `(${midResults.lightningDmgPercentWeapon1.toFixed(1)}%)`
);

console.log("\nWeapon 2 (Elemental Mix):");
console.log(
  "Physical:",
  formatNumber(midResults.finalPhysicalDamage2),
  `(${midResults.physicalDmgPercentWeapon2.toFixed(1)}%)`
);
console.log(
  "Lightning:",
  formatNumber(midResults.finalLightningDamage2),
  `(${midResults.lightningDmgPercentWeapon2.toFixed(1)}%)`
);
console.log(
  "Fire:",
  formatNumber(midResults.finalFireDamage2),
  `(${midResults.fireDmgPercentWeapon2.toFixed(1)}%)`
);

console.log("\nStats:");
console.log("Attack Speed:", midGameTest.attacksPerSecond.toFixed(2), "attacks/sec");
console.log("Crit Chance:", (midResults.critChanceWeapon1 * 100).toFixed(1) + "%");
console.log("Crit Multiplier:", (midResults.critMultiplierWeapon1 * 100).toFixed(0) + "%");

// End Game Comparison
console.log("\n=== End Game Comparison (80+) ===");
const endGameTest = new DPSCalc({
  // End game weapons from test cases
  weapon1MinBaseDmg: 50,
  weapon1MaxBaseDmg: 150,
  weapon1PhysicalMin: 25,
  weapon1PhysicalMax: 75,
  weapon1LightningMin: 15,
  weapon1LightningMax: 45,
  weapon1FireMin: 10,
  weapon1FireMax: 30,
  weapon1ColdMin: 0,
  weapon1ColdMax: 0,
  weapon1ChaosMin: 0,
  weapon1ChaosMax: 0,

  weapon2MinBaseDmg: 60,
  weapon2MaxBaseDmg: 180,
  weapon2PhysicalMin: 20,
  weapon2PhysicalMax: 60,
  weapon2LightningMin: 20,
  weapon2LightningMax: 60,
  weapon2FireMin: 15,
  weapon2FireMax: 45,
  weapon2ColdMin: 5,
  weapon2ColdMax: 15,
  weapon2ChaosMin: 0,
  weapon2ChaosMax: 0,

  // End game settings
  attackSpeed: 1.7,
  attackSpeedIncrease: 45,
  totalSkillProjectiles: 2,
  damageMultiplier: 1.4,
  critChance: 8,
  critDamage: 350,
  resPenetration: 30,
  bowDamage: 35,

  physicalDamageIncrease: 150,
  elementalDamageIncrease: 120,
  attackDamageIncrease: 80,
  projectileDamageIncrease: 65,

  martialTempo: true,
  primalArmament: true,
  lightningInfusion: true,
  iceBite: true,

  shock: true,
  shockMagnitude: 50,
  shockDuration: 100,
  electrocution: true,
  electrocutionDuration: 65,
  exposure: true,
  exposureMagnitude: 30,
  exposureDuration: 100,

  // Required fields
  weapon1MinBase: 50,
  weapon1MaxBase: 150,
  weapon2MinBase: 60,
  weapon2MaxBase: 180,
  newPhysicalMinWeapon1: 25,
  newPhysicalMaxWeapon1: 75,
  newPhysicalMinWeapon2: 20,
  newPhysicalMaxWeapon2: 60,
  damageMultiplierWeapon1: 0.4,
  damageMultiplierWeapon2: 0.4,
  baseCritChance: 8,
  baseCritChance2: 8,
  critChanceIncrease: 0,
  critChanceIncrease2: 0,
  critMultiplier: 3.5,
  critMultiplier2: 3.5,
});

const endResults = endGameTest.getResults();
console.log("End Game Comparison:");
console.log("Pure Build DPS:", formatNumber(endResults.totalDpsWeapon1));
console.log("Hybrid Build DPS:", formatNumber(endResults.totalDpsWeapon2));
console.log("DPS Difference:", (endResults.dpsIncrease * 100).toFixed(1) + "%");

console.log("\nWeapon 1 (Pure Build):");
console.log(
  "Physical:",
  formatNumber(endResults.finalPhysicalDamage),
  `(${endResults.physicalDmgPercentWeapon1.toFixed(1)}%)`
);
console.log(
  "Lightning:",
  formatNumber(endResults.finalLightningDamage),
  `(${endResults.lightningDmgPercentWeapon1.toFixed(1)}%)`
);
console.log(
  "Fire:",
  formatNumber(endResults.finalFireDamage),
  `(${endResults.fireDmgPercentWeapon1.toFixed(1)}%)`
);

console.log("\nWeapon 2 (Hybrid Build):");
console.log(
  "Physical:",
  formatNumber(endResults.finalPhysicalDamage2),
  `(${endResults.physicalDmgPercentWeapon2.toFixed(1)}%)`
);
console.log(
  "Lightning:",
  formatNumber(endResults.finalLightningDamage2),
  `(${endResults.lightningDmgPercentWeapon2.toFixed(1)}%)`
);
console.log(
  "Fire:",
  formatNumber(endResults.finalFireDamage2),
  `(${endResults.fireDmgPercentWeapon2.toFixed(1)}%)`
);
console.log(
  "Cold:",
  formatNumber(endResults.finalColdDamage2),
  `(${endResults.coldDmgPercentWeapon2.toFixed(1)}%)`
);

console.log("\nStats:");
console.log("Attack Speed:", endGameTest.attacksPerSecond.toFixed(2), "attacks/sec");
console.log("Crit Chance:", (endResults.critChanceWeapon1 * 100).toFixed(1) + "%");
console.log("Crit Multiplier:", (endResults.critMultiplierWeapon1 * 100).toFixed(0) + "%");
console.log("Projectiles:", 2);
