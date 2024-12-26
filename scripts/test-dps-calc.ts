import { DPSCalc } from '../src/lib/calculations';

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

// =================================================================
// Test Cases by Character Progression Level
// =================================================================

// NOOB Level (1-20): Grove Bow
// A basic bow that a new player might use
// Based on POE2 early game weapon scaling
console.log('\n=== Test Case: NOOB Level (1-20) Grove Bow ===');
const noobTest = new DPSCalc({
  // Grove Bow - Basic early game bow
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
  
  // Basic settings for new player
  attackSpeed: 1.4,
  attackSpeedIncrease: 0,
  totalSkillProjectiles: 1,
  critChance: 5,
  critDamage: 130,
  resPenetration: 0,
  bowDamage: 0,
  
  // Minimal increases from early passives
  physicalDamageIncrease: 20,
  elementalDamageIncrease: 0,
  attackDamageIncrease: 10,
  projectileDamageIncrease: 0,
  
  // No support gems yet
  martialTempo: false,
  primalArmament: false,
  lightningInfusion: false,
  iceBite: false,

  // Required fields
  weapon1MinBase: 5,
  weapon1MaxBase: 15,
  newPhysicalMinWeapon1: 5,
  newPhysicalMaxWeapon1: 15,
  damageMultiplierWeapon1: 0,
  baseCritChance: 5,
  critChanceIncrease: 0,
  critMultiplier: 1.3,
});

const noobResults = noobTest.getResults();
console.log('Total DPS:', formatNumber(noobResults.totalDpsWeapon1));
console.log('\nDamage Breakdown:');
console.log('Physical:', formatNumber(noobResults.finalPhysicalDamage), `(${noobResults.physicalDmgPercentWeapon1.toFixed(1)}%)`);
console.log('\nStats:');
console.log('Attack Speed:', noobTest.attacksPerSecond.toFixed(2), 'attacks/sec');
console.log('Crit Chance:', (noobResults.critChanceWeapon1 * 100).toFixed(1) + '%');
console.log('Crit Multiplier:', (noobResults.critMultiplierWeapon1 * 100).toFixed(0) + '%');

// MID Level (40-60): Storm Bow
// A decent rare bow with elemental damage
console.log('\n=== Test Case: MID Level (40-60) Storm Bow ===');
const midTest = new DPSCalc({
  // Storm Bow - Mid game rare bow
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
  
  // Mid-game settings
  attackSpeed: 1.5,
  attackSpeedIncrease: 15,
  totalSkillProjectiles: 1,
  critChance: 7,
  critDamage: 180,
  resPenetration: 10,
  bowDamage: 15,
  
  // Some passive tree progress
  physicalDamageIncrease: 80,
  elementalDamageIncrease: 40,
  attackDamageIncrease: 30,
  projectileDamageIncrease: 25,
  
  // Basic support gems
  martialTempo: true,
  primalArmament: false,
  lightningInfusion: false,
  iceBite: false,

  // Required fields
  weapon1MinBase: 20,
  weapon1MaxBase: 60,
  newPhysicalMinWeapon1: 15,
  newPhysicalMaxWeapon1: 45,
  damageMultiplierWeapon1: 0.2,
  baseCritChance: 7,
  critChanceIncrease: 20,
  critMultiplier: 1.8,
});

const midResults = midTest.getResults();
console.log('Total DPS:', formatNumber(midResults.totalDpsWeapon1));
console.log('\nDamage Breakdown:');
console.log('Physical:', formatNumber(midResults.finalPhysicalDamage), `(${midResults.physicalDmgPercentWeapon1.toFixed(1)}%)`);
console.log('Lightning:', formatNumber(midResults.finalLightningDamage), `(${midResults.lightningDmgPercentWeapon1.toFixed(1)}%)`);
console.log('\nStats:');
console.log('Attack Speed:', midTest.attacksPerSecond.toFixed(2), 'attacks/sec');
console.log('Crit Chance:', (midResults.critChanceWeapon1 * 100).toFixed(1) + '%');
console.log('Crit Multiplier:', (midResults.critMultiplierWeapon1 * 100).toFixed(0) + '%');

// MAX Level (80+): Tempest Bow
// Endgame unique bow with full modifiers
console.log('\n=== Test Case: MAX Level (80+) Tempest Bow ===');
const maxTest = new DPSCalc({
  // Tempest Bow - Endgame unique
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
  
  // Endgame settings
  attackSpeed: 1.7,
  attackSpeedIncrease: 45,
  totalSkillProjectiles: 2,
  critChance: 8,
  critDamage: 350,
  resPenetration: 30,
  bowDamage: 35,
  
  // Full passive tree
  physicalDamageIncrease: 150,
  elementalDamageIncrease: 120,
  attackDamageIncrease: 80,
  projectileDamageIncrease: 65,
  
  // All support gems
  martialTempo: true,
  primalArmament: true,
  lightningInfusion: true,
  iceBite: true,

  // Required fields
  weapon1MinBase: 50,
  weapon1MaxBase: 150,
  newPhysicalMinWeapon1: 25,
  newPhysicalMaxWeapon1: 75,
  damageMultiplierWeapon1: 0.4,
  baseCritChance: 8,
  critChanceIncrease: 100,
  critMultiplier: 3.5,
  
  // Status effects
  shock: true,
  shockMagnitude: 50,
  electrocution: true,
  electrocutionDuration: 65,
  exposure: true,
  exposureMagnitude: 30,
});

const maxResults = maxTest.getResults();
console.log('Total DPS:', formatNumber(maxResults.totalDpsWeapon1));
console.log('\nDamage Breakdown:');
console.log('Physical:', formatNumber(maxResults.finalPhysicalDamage), `(${maxResults.physicalDmgPercentWeapon1.toFixed(1)}%)`);
console.log('Lightning:', formatNumber(maxResults.finalLightningDamage), `(${maxResults.lightningDmgPercentWeapon1.toFixed(1)}%)`);
console.log('Fire:', formatNumber(maxResults.finalFireDamage), `(${maxResults.fireDmgPercentWeapon1.toFixed(1)}%)`);
console.log('\nStats:');
console.log('Attack Speed:', maxTest.attacksPerSecond.toFixed(2), 'attacks/sec');
console.log('Crit Chance:', (maxResults.critChanceWeapon1 * 100).toFixed(1) + '%');
console.log('Crit Multiplier:', (maxResults.critMultiplierWeapon1 * 100).toFixed(0) + '%');
console.log('Projectiles:', 2);

// Test case 1: Basic Physical Weapon
console.log('\n=== Test Case 1: Basic Physical Weapon ===');
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


const basicResults = basicPhysicalTest.getResults();
console.log('Basic Physical DPS:', formatNumber(basicResults.totalDpsWeapon1));
console.log('Physical Damage:', formatNumber(basicResults.finalPhysicalDamage));
console.log('Attack Speed:', basicPhysicalTest.attacksPerSecond.toFixed(2), 'attacks/sec');
console.log('Physical %:', basicResults.physicalDmgPercentWeapon1.toFixed(1) + '%');
console.log('Crit Chance:', (basicResults.critChanceWeapon1 * 100).toFixed(1) + '%');
console.log('Crit Multiplier:', (basicResults.critMultiplierWeapon1 * 100).toFixed(0) + '%');

// Test case 2: Elemental Weapon with Status Effects
console.log('\n=== Test Case 2: Elemental Weapon with Status Effects ===');
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
console.log('Elemental DPS:', formatNumber(elementalResults.totalDpsWeapon1));
console.log('Physical Damage:', formatNumber(elementalResults.finalPhysicalDamage));
console.log('Lightning Damage:', formatNumber(elementalResults.finalLightningDamage));
console.log('Physical %:', elementalResults.physicalDmgPercentWeapon1.toFixed(1) + '%');
console.log('Lightning %:', elementalResults.lightningDmgPercentWeapon1.toFixed(1) + '%');
console.log('Attack Speed:', elementalTest.attacksPerSecond.toFixed(2), 'attacks/sec');
console.log('Shock Effect:', elementalResults.magnitudePercentWeapon1.toFixed(1) + '%');

// Test case 3: Full Configuration
console.log('\n=== Test Case 3: Full Configuration with All Support Gems ===');
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
console.log('Total DPS:', formatNumber(fullResults.totalDpsWeapon1));
console.log('\nDamage Breakdown:');
console.log('Physical:', formatNumber(fullResults.finalPhysicalDamage), `(${fullResults.physicalDmgPercentWeapon1.toFixed(1)}%)`);
console.log('Lightning:', formatNumber(fullResults.finalLightningDamage), `(${fullResults.lightningDmgPercentWeapon1.toFixed(1)}%)`);
console.log('Fire:', formatNumber(fullResults.finalFireDamage), `(${fullResults.fireDmgPercentWeapon1.toFixed(1)}%)`);
console.log('Cold:', formatNumber(fullResults.finalColdDamage), `(${fullResults.coldDmgPercentWeapon1.toFixed(1)}%)`);
console.log('\nStats:');
console.log('Attack Speed:', fullConfigTest.attacksPerSecond.toFixed(2), 'attacks/sec');
console.log('Crit Chance:', (fullResults.critChanceWeapon1 * 100).toFixed(1) + '%');
console.log('Crit Multiplier:', (fullResults.critMultiplierWeapon1 * 100).toFixed(0) + '%');
console.log('Projectiles:', 2);

// Test case 4: Weapon Comparison
console.log('\n=== Test Case 4: Weapon Comparison ===');
const comparisonTest = new DPSCalc({
  // Weapon 1 - Physical Focus
  weapon1MinBaseDmg: 100,
  weapon1MaxBaseDmg: 150,
  weapon1PhysicalMin: 80,
  weapon1PhysicalMax: 120,
  weapon1LightningMin: 20,
  weapon1LightningMax: 30,
  weapon1FireMin: 0,
  weapon1FireMax: 0,
  weapon1ColdMin: 0,
  weapon1ColdMax: 0,
  weapon1ChaosMin: 0,
  weapon1ChaosMax: 0,
  
  // Weapon 2 - Elemental Focus
  weapon2MinBaseDmg: 100,
  weapon2MaxBaseDmg: 150,
  weapon2PhysicalMin: 40,
  weapon2PhysicalMax: 60,
  weapon2LightningMin: 30,
  weapon2LightningMax: 45,
  weapon2FireMin: 20,
  weapon2FireMax: 30,
  weapon2ColdMin: 10,
  weapon2ColdMax: 15,
  weapon2ChaosMin: 0,
  weapon2ChaosMax: 0,
  
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
  martialTempo: true,
  primalArmament: true,

  // Required fields for calculations
  weapon1MinBase: 100,
  weapon1MaxBase: 150,
  weapon2MinBase: 100,
  weapon2MaxBase: 150,
  newPhysicalMinWeapon1: 80,
  newPhysicalMaxWeapon1: 120,
  newPhysicalMinWeapon2: 40,
  newPhysicalMaxWeapon2: 60,
  damageMultiplierWeapon1: 0.4,
  damageMultiplierWeapon2: 0.4,
  baseCritChance: 15,
  baseCritChance2: 15,
  critChanceIncrease: 0,
  critChanceIncrease2: 0,
  critMultiplier: 2.0,
  critMultiplier2: 2.0,
});

const comparisonResults = comparisonTest.getResults();
console.log('Weapon 1 DPS:', formatNumber(comparisonResults.totalDpsWeapon1));
console.log('Weapon 2 DPS:', formatNumber(comparisonResults.totalDpsWeapon2));
console.log('DPS Increase:', (comparisonResults.dpsIncrease * 100).toFixed(1) + '%');

console.log('\nWeapon 1 Breakdown:');
console.log('Physical:', formatNumber(comparisonResults.finalPhysicalDamage), `(${comparisonResults.physicalDmgPercentWeapon1.toFixed(1)}%)`);
console.log('Lightning:', formatNumber(comparisonResults.finalLightningDamage), `(${comparisonResults.lightningDmgPercentWeapon1.toFixed(1)}%)`);

console.log('\nWeapon 2 Breakdown:');
console.log('Physical:', formatNumber(comparisonResults.finalPhysicalDamage2), `(${comparisonResults.physicalDmgPercentWeapon2.toFixed(1)}%)`);
console.log('Lightning:', formatNumber(comparisonResults.finalLightningDamage2), `(${comparisonResults.lightningDmgPercentWeapon2.toFixed(1)}%)`);
console.log('Fire:', formatNumber(comparisonResults.finalFireDamage2), `(${comparisonResults.fireDmgPercentWeapon2.toFixed(1)}%)`);
console.log('Cold:', formatNumber(comparisonResults.finalColdDamage2), `(${comparisonResults.coldDmgPercentWeapon2.toFixed(1)}%)`);

console.log('\nStats:');
console.log('Attack Speed:', comparisonTest.attacksPerSecond.toFixed(2), 'attacks/sec');
console.log('Crit Chance:', (comparisonResults.critChanceWeapon1 * 100).toFixed(1) + '%');
console.log('Crit Multiplier:', (comparisonResults.critMultiplierWeapon1 * 100).toFixed(0) + '%');
