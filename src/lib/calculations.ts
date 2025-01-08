/**
 * POE2 DPS Calculator
 * Core logic for calculating and comparing weapon DPS in Path of Exile 2
 *
 * Key Functionality:
 * - Calculates total DPS for two weapons considering all damage types
 * - Compares weapons to show DPS percentage increase
 * - Handles all damage modifiers, conversions, and multipliers
 * - Supports elemental, physical, and chaos damage calculations
 */

export class DPSCalc {
  private i: { [key: string]: number | boolean | string };

  constructor(inputs: { [key: string]: number | boolean | string }) {
    this.i = inputs;
  }

  /**
   * DPS INCREASE - Primary Output
   * Calculates the percentage increase in DPS between weapon 2 and weapon 1
   * This is the main metric used for weapon comparison
   */
  get dpsIncrease(): number {
    return this.totalDpsWeapon2 / this.totalDpsWeapon1 - 1;
  }

  /**
   * Base Damage Calculations
   * Handles initial weapon damage values and averages
   */
  get averageBaseDmgWeapon1(): number {
    return (Number(this.i.weapon1MinBaseDmg) + Number(this.i.weapon1MaxBaseDmg)) / 2;
  }

  get averageBaseDmgWeapon2(): number {
    return (Number(this.i.weapon2MinBaseDmg) + Number(this.i.weapon2MaxBaseDmg)) / 2;
  }

  /**
   * Damage Increase Modifiers
   * Calculates various sources of damage increases
   */
  get totalIncreaseWeapon1(): number {
    const elementalIncrease = this.elementalDamageIncreaseWeapon1;
    const physicalIncrease = this.physicalDamageIncreaseWeapon1;
    const attackIncrease = this.attackDamageIncreaseWeapon1;
    const projectileIncrease = this.projectileDamageIncreaseWeapon1;
    const bowIncrease = this.bowDamageIncreaseWeapon1;

    return elementalIncrease + physicalIncrease + attackIncrease + projectileIncrease + bowIncrease;
  }

  get totalIncreaseWeapon2(): number {
    const elementalIncrease = this.elementalDamageIncreaseWeapon2;
    const physicalIncrease = this.physicalDamageIncreaseWeapon2;
    const attackIncrease = this.attackDamageIncreaseWeapon2;
    const projectileIncrease = this.projectileDamageIncreaseWeapon2;
    const bowIncrease = this.bowDamageIncreaseWeapon2;

    return elementalIncrease + physicalIncrease + attackIncrease + projectileIncrease + bowIncrease;
  }

  /**
   * Elemental Damage Calculations
   * Handles all elemental damage types and their increases
   */
  get elementalDamageIncreaseWeapon1(): number {
    const baseIncrease = Number(this.i.elementalDamageIncrease) / 100;
    const lightningBonus = this.i.lightningInfusion === true ? 0.2 : 0;
    const exposureBonus = this.i.exposure === true ? Number(this.i.exposureMagnitude) / 100 : 0;
    return baseIncrease + lightningBonus + exposureBonus;
  }

  get elementalDamageIncreaseWeapon2(): number {
    const baseIncrease = Number(this.i.elementalDamageIncrease) / 100;
    const lightningBonus = this.i.lightningInfusion === true ? 0.2 : 0;
    const exposureBonus = this.i.exposure === true ? Number(this.i.exposureMagnitude) / 100 : 0;
    return baseIncrease + lightningBonus + exposureBonus;
  }

  /**
   * Physical Damage Calculations
   * Handles physical damage and its modifiers
   */
  get physicalDamageIncreaseWeapon1(): number {
    const baseIncrease = Number(this.i.physicalDamageIncrease) / 100;
    const primalBonus = this.i.primalArmament === true ? 0.2 : 0;
    return baseIncrease + primalBonus;
  }

  get physicalDamageIncreaseWeapon2(): number {
    const baseIncrease = Number(this.i.physicalDamageIncrease) / 100;
    const primalBonus = this.i.primalArmament === true ? 0.2 : 0;
    return baseIncrease + primalBonus;
  }

  /**
   * Weapon Base Calculations
   * Processes base weapon stats
   */
  get averageWeaponBaseDamageWeapon1(): number {
    return (Number(this.i.weapon1MinBase) + Number(this.i.weapon1MaxBase)) / 2;
  }

  get averageWeaponBaseDamageWeapon2(): number {
    return (Number(this.i.weapon2MinBase) + Number(this.i.weapon2MaxBase)) / 2;
  }

  /**
   * Total Physical Damage
   * Sums up all physical damage components
   */
  get attacksPerSecond(): number {
    const baseSpeed = Number(this.i.attackSpeed);
    const increase = Number(this.i.attackSpeedIncrease) / 100;
    return baseSpeed * (1 + increase);
  }

  get effectiveCritChance(): number {
    // Convert crit chance from percentage to decimal (e.g., 5% -> 0.05)
    return Math.min(95, Number(this.i.critChance)) / 100;
  }

  get effectiveCritMultiplier(): number {
    // Convert crit damage from percentage to multiplier (e.g., 150% -> 1.5)
    const critDamage = Number(this.i.critDamage) / 100;
    // Apply crit chance to get effective multiplier
    return 1 + (critDamage - 1) * this.effectiveCritChance;
  }

  get effectiveResistancePenetration(): number {
    return Math.min(100, Number(this.i.resPenetration)) / 100;
  }

  get totalPhysicalDamageWeapon1(): number {
    const base = Number(this.i.weapon1PhysicalMin);
    const withIncrease = base * (1 + (this.i.primalArmament === true ? 0.2 : 0));
    const withCrit = withIncrease * this.effectiveCritMultiplier;
    return withCrit;
  }

  get totalPhysicalDamageWeapon2(): number {
    const base = Number(this.i.weapon2PhysicalMin);
    const withIncrease = base * (1 + (this.i.primalArmament === true ? 0.2 : 0));
    const withCrit = withIncrease * this.effectiveCritMultiplier;
    return withCrit;
  }

  /**
   * Attack and Projectile Modifiers
   * Handles attack speed and projectile-based calculations
   */
  get attackDamageIncreaseWeapon1(): number {
    const baseIncrease = Number(this.i.attackDamageIncrease) / 100;
    const martialBonus = this.i.martialTempo === true ? 0.15 : 0;
    return baseIncrease + martialBonus;
  }

  get attackDamageIncreaseWeapon2(): number {
    const baseIncrease = Number(this.i.attackDamageIncrease) / 100;
    const martialBonus = this.i.martialTempo === true ? 0.15 : 0;
    return baseIncrease + martialBonus;
  }

  get projectileDamageIncreaseWeapon1(): number {
    const baseIncrease = Number(this.i.projectileDamageIncrease) / 100;
    const iceBiteBonus = this.i.iceBite === true ? 0.2 : 0;
    return baseIncrease + iceBiteBonus;
  }

  get projectileDamageIncreaseWeapon2(): number {
    const baseIncrease = Number(this.i.projectileDamageIncrease) / 100;
    const iceBiteBonus = this.i.iceBite === true ? 0.2 : 0;
    return baseIncrease + iceBiteBonus;
  }

  get bowDamageIncreaseWeapon1(): number {
    return Number(this.i.bowDamage) / 100; // Convert from percentage to decimal
  }

  get bowDamageIncreaseWeapon2(): number {
    return Number(this.i.bowDamage) / 100; // Convert from percentage to decimal
  }

  /**
   * Damage Conversion
   * Handles conversion between damage types
   */
  get damageConversionWeapon1(): number {
    return 1 + Number(this.i.damageMultiplierWeapon1);
  }

  get damageConversionWeapon2(): number {
    return 1 + Number(this.i.damageMultiplierWeapon2);
  }

  /**
   * Magnitude Calculations
   * Processes magnitude-based effects
   */
  get magnitudePercentWeapon1(): number {
    const min = Number(this.i.newPhysicalMinWeapon1) || 0;
    const max = Number(this.i.newPhysicalMaxWeapon1) || 0;

    // Avoid division by zero
    if (min === 0 && max === 0) return 0;

    const avgDamage = (min + max) / 2;
    const effectiveDamage = min + (max - min) * (2 / 3);

    // Calculate magnitude as percentage difference
    return Math.max(0, (effectiveDamage - avgDamage) / avgDamage);
  }

  get magnitudePercentWeapon2(): number {
    const min = Number(this.i.newPhysicalMinWeapon2) || 0;
    const max = Number(this.i.newPhysicalMaxWeapon2) || 0;

    // Avoid division by zero
    if (min === 0 && max === 0) return 0;

    const avgDamage = (min + max) / 2;
    const effectiveDamage = min + (max - min) * (2 / 3);

    // Calculate magnitude as percentage difference
    return Math.max(0, (effectiveDamage - avgDamage) / avgDamage);
  }

  /**
   * Duration Effects
   * Calculates duration-based modifiers and effects
   */
  get durationPercentWeapon1(): number {
    let duration = 1;

    // Lightning infusion effect
    if (this.i.lightningInfusionWeapon1 === true) {
      const lightningBonus = 0.2 * this.averageWeaponBaseDamageWeapon1;
      duration *= 1 + lightningBonus * (1 + Number(this.i.attackSpeedIncrease || 0) / 100);
    }

    // Primal armament effect
    if (this.i.primalArmamentWeapon1 === true) {
      const primalBonus = 0.2 * this.attackDamageIncreaseWeapon1;
      duration *= 1 + primalBonus * (1 + this.totalPhysicalDamageWeapon1);
    }

    // Ice bite effect
    if (this.i.iceBiteWeapon1 === true) {
      const iceBonus = 0.2 * this.projectileDamageIncreaseWeapon1;
      duration *= 1 + iceBonus * (1 + this.attackDamageIncreaseWeapon1);
    }

    // Shock effect (without recursion)
    if (this.i.shockWeapon1 === true) {
      const shockEffect = Number(this.i.shockMagnitude || 0) / 100;
      duration *= 1 + shockEffect;
    }

    // Other multipliers (capped)
    const otherMult = Math.min(Number(this.i.otherSkillDmgWeapon1 || 0), 10);
    duration *= 1 + otherMult * otherMult * (1 + otherMult);

    return Math.max(1, duration); // Duration should never be less than 1
  }

  get durationPercentWeapon2(): number {
    let duration = 1;

    // Lightning infusion effect
    if (this.i.lightningInfusionWeapon2 === true) {
      const lightningBonus = 0.2 * this.averageWeaponBaseDamageWeapon2;
      duration *= 1 + lightningBonus * (1 + Number(this.i.attackSpeedIncrease || 0) / 100);
    }

    // Primal armament effect
    if (this.i.primalArmamentWeapon2 === true) {
      const primalBonus = 0.2 * this.attackDamageIncreaseWeapon2;
      duration *= 1 + primalBonus * (1 + this.totalPhysicalDamageWeapon2);
    }

    // Ice bite effect
    if (this.i.iceBiteWeapon2 === true) {
      const iceBonus = 0.2 * this.projectileDamageIncreaseWeapon2;
      duration *= 1 + iceBonus * (1 + this.attackDamageIncreaseWeapon2);
    }

    // Shock effect (without recursion)
    if (this.i.shockWeapon2 === true) {
      const shockEffect = Number(this.i.shockMagnitude || 0) / 100;
      duration *= 1 + shockEffect;
    }

    // Other multipliers (capped)
    const otherMult = Math.min(Number(this.i.otherSkillDmgWeapon2 || 0), 10);
    duration *= 1 + otherMult * otherMult * (1 + otherMult);

    return Math.max(1, duration); // Duration should never be less than 1
  }

  /**
   * Other Multipliers
   * Handles miscellaneous damage multipliers
   */
  get otherMultiplierWeapon1(): number {
    return Number(this.i.otherSkillDmgWeapon1);
  }

  get otherMultiplierWeapon2(): number {
    return Number(this.i.otherSkillDmgWeapon2);
  }

  get otherMultiplier2Weapon1(): number {
    return Number(this.i.otherSkillDmgWeapon1);
  }

  get otherMultiplier2Weapon2(): number {
    return Number(this.i.otherSkillDmgWeapon2);
  }

  /**
   * Attack Speed Calculations
   * Processes attack speed and its modifiers
   */
  get attackSpeedWeapon1(): number {
    return Number(this.i.attackSpeed);
  }

  get attackSpeedWeapon2(): number {
    return Number(this.i.attackSpeed);
  }

  get attackSpeedIncreaseWeapon1(): number {
    return Number(this.i.attackSpeedIncrease);
  }

  get attackSpeedIncreaseWeapon2(): number {
    return Number(this.i.attackSpeedIncrease);
  }

  /**
   * Resistance and Penetration
   * Handles resistance penetration calculations
   */
  get resPenetrationWeapon1(): number {
    // Convert penetration from percentage to decimal (e.g., 20% -> 0.2)
    const pen = Math.min(75, Number(this.i.resPenetration)) / 100;
    // Return penetration multiplier (higher penetration = more damage)
    return 1 - pen;
  }

  get resPenetrationWeapon2(): number {
    const pen = Math.min(75, Number(this.i.resPenetration)) / 100;
    return 1 - pen;
  }

  /**
   * Critical Strike Calculations
   * Processes crit chance and damage
   */
  get critChanceWeapon1(): number {
    // Convert base crit chance from percentage to decimal (e.g., 5% -> 0.05)
    const baseCrit = Number(this.i.baseCritChance) / 100;
    // Convert crit chance increase from percentage to decimal
    const critIncrease = Number(this.i.critChanceIncrease) / 100;
    // Calculate final crit chance with increases
    return Math.min(0.95, baseCrit * (1 + critIncrease));
  }

  get critChanceWeapon2(): number {
    const baseCrit = Number(this.i.baseCritChance2) / 100;
    const critIncrease = Number(this.i.critChanceIncrease2) / 100;
    return Math.min(0.95, baseCrit * (1 + critIncrease));
  }

  get critDamageWeapon1(): number {
    // Convert crit damage from percentage to multiplier (e.g., 150% -> 1.5)
    return Number(this.i.critDamage) / 100;
  }

  get critDamageWeapon2(): number {
    return Number(this.i.critDamage2) / 100;
  }

  get critMultiplierWeapon1(): number {
    // Base multiplier of 1 (100% damage)
    // Plus the crit damage multiplier times the crit chance
    return 1 + (this.critDamageWeapon1 - 1) * this.critChanceWeapon1;
  }

  get critMultiplierWeapon2(): number {
    return 1 + (this.critDamageWeapon2 - 1) * this.critChanceWeapon2;
  }

  /**
   * Elemental Damage Percentages
   * Calculates percentage-based elemental damage
   */
  get elementalDmgPercentWeapon1(): number {
    // Calculate average damage for each element
    const lightning =
      ((Number(this.i.weapon1LightningMin) || 0) + (Number(this.i.weapon1LightningMax) || 0)) / 2;
    const fire = ((Number(this.i.weapon1FireMin) || 0) + (Number(this.i.weapon1FireMax) || 0)) / 2;
    const cold = ((Number(this.i.weapon1ColdMin) || 0) + (Number(this.i.weapon1ColdMax) || 0)) / 2;

    // Sum all elemental damage
    const totalElemental = lightning + fire + cold;

    // Get total base damage
    const totalDamage = this.averageBaseDmgWeapon1;

    // Calculate percentage, ensuring no division by zero
    return totalDamage > 0 ? Math.min(100, (totalElemental / totalDamage) * 100) : 0;
  }

  get elementalDmgPercentWeapon2(): number {
    // Calculate average damage for each element
    const lightning =
      ((Number(this.i.weapon2LightningMin) || 0) + (Number(this.i.weapon2LightningMax) || 0)) / 2;
    const fire = ((Number(this.i.weapon2FireMin) || 0) + (Number(this.i.weapon2FireMax) || 0)) / 2;
    const cold = ((Number(this.i.weapon2ColdMin) || 0) + (Number(this.i.weapon2ColdMax) || 0)) / 2;

    // Sum all elemental damage
    const totalElemental = lightning + fire + cold;

    // Get total base damage
    const totalDamage = this.averageBaseDmgWeapon2;

    // Calculate percentage, ensuring no division by zero
    return totalDamage > 0 ? Math.min(100, (totalElemental / totalDamage) * 100) : 0;
  }

  /**
   * Physical and Elemental Percentages
   * Calculates percentage-based physical and elemental contributions
   */
  get physicalDmgPercentWeapon1(): number {
    const basePhysical =
      (Number(this.i.weapon1PhysicalMin) + Number(this.i.weapon1PhysicalMax)) / 2;
    const totalDamage = this.averageBaseDmgWeapon1;
    return totalDamage > 0 ? Math.min(100, (basePhysical / totalDamage) * 100) : 0;
  }

  get physicalDmgPercentWeapon2(): number {
    const basePhysical =
      (Number(this.i.weapon2PhysicalMin) + Number(this.i.weapon2PhysicalMax)) / 2;
    const totalDamage = this.averageBaseDmgWeapon2;
    return totalDamage > 0 ? Math.min(100, (basePhysical / totalDamage) * 100) : 0;
  }

  get lightningDmgPercentWeapon1(): number {
    const baseLightning =
      (Number(this.i.weapon1LightningMin) + Number(this.i.weapon1LightningMax)) / 2;
    const totalDamage = this.averageBaseDmgWeapon1;
    return totalDamage > 0 ? Math.min(100, (baseLightning / totalDamage) * 100) : 0;
  }

  get lightningDmgPercentWeapon2(): number {
    const baseLightning =
      (Number(this.i.weapon2LightningMin) + Number(this.i.weapon2LightningMax)) / 2;
    const totalDamage = this.averageBaseDmgWeapon2;
    return totalDamage > 0 ? Math.min(100, (baseLightning / totalDamage) * 100) : 0;
  }

  get fireDmgPercentWeapon1(): number {
    const baseFire = (Number(this.i.weapon1FireMin) + Number(this.i.weapon1FireMax)) / 2;
    const totalDamage = this.averageBaseDmgWeapon1;
    return totalDamage > 0 ? Math.min(100, (baseFire / totalDamage) * 100) : 0;
  }

  get fireDmgPercentWeapon2(): number {
    const baseFire = (Number(this.i.weapon2FireMin) + Number(this.i.weapon2FireMax)) / 2;
    const totalDamage = this.averageBaseDmgWeapon2;
    return totalDamage > 0 ? Math.min(100, (baseFire / totalDamage) * 100) : 0;
  }

  get coldDmgPercentWeapon1(): number {
    const baseCold = (Number(this.i.weapon1ColdMin) + Number(this.i.weapon1ColdMax)) / 2;
    const totalDamage = this.averageBaseDmgWeapon1;
    return totalDamage > 0 ? Math.min(100, (baseCold / totalDamage) * 100) : 0;
  }

  get coldDmgPercentWeapon2(): number {
    const baseCold = (Number(this.i.weapon2ColdMin) + Number(this.i.weapon2ColdMax)) / 2;
    const totalDamage = this.averageBaseDmgWeapon2;
    return totalDamage > 0 ? Math.min(100, (baseCold / totalDamage) * 100) : 0;
  }

  get chaosDmgPercentWeapon1(): number {
    const baseChaos = (Number(this.i.weapon1ChaosMin) + Number(this.i.weapon1ChaosMax)) / 2;
    const totalDamage = this.averageBaseDmgWeapon1;
    return totalDamage > 0 ? Math.min(100, (baseChaos / totalDamage) * 100) : 0;
  }

  get chaosDmgPercentWeapon2(): number {
    const baseChaos = (Number(this.i.weapon2ChaosMin) + Number(this.i.weapon2ChaosMax)) / 2;
    const totalDamage = this.averageBaseDmgWeapon2;
    return totalDamage > 0 ? Math.min(100, (baseChaos / totalDamage) * 100) : 0;
  }

  /**
   * Final DPS Calculations
   * Combines all modifiers to calculate total DPS
   */
  get totalDpsWeapon1(): number {
    // Get all required values with null checks
    const attackSpeed = Number(this.attackSpeedWeapon1) || 0;
    const damageConversion = Number(this.damageConversionWeapon1) || 1;
    const magnitude = Number(this.magnitudePercentWeapon1) || 0;
    const duration = Number(this.durationPercentWeapon1) || 1;
    const critMultiplier = Number(this.critMultiplierWeapon1) || 1;
    const projectiles = Number(this.i.totalSkillProjectiles) || 1;
    const bowDamage = 1 + Number(this.i.bowDamage || 0) / 100;
    const resistancePen = Number(this.resPenetrationWeapon1) || 1;
    const physicalPercent = Number(this.physicalDmgPercentWeapon1) || 0;

    // Calculate physical modifier with bounds
    const physicalMod = Math.min(Math.max(0, 1 - 0.75 + physicalPercent), 1);

    // Calculate total damage per hit with null checks
    const totalDamagePerHit =
      (Number(this.finalPhysicalDamage) || 0) +
      (Number(this.finalLightningDamage) || 0) +
      (Number(this.finalFireDamage) || 0) +
      (Number(this.finalColdDamage) || 0) +
      (Number(this.finalChaosDamage) || 0);

    // Ensure all multipliers are valid numbers
    if (
      isNaN(attackSpeed) ||
      isNaN(damageConversion) ||
      isNaN(magnitude) ||
      isNaN(duration) ||
      isNaN(critMultiplier) ||
      isNaN(projectiles) ||
      isNaN(bowDamage) ||
      isNaN(resistancePen) ||
      isNaN(physicalMod) ||
      isNaN(totalDamagePerHit)
    ) {
      return 0;
    }

    // Calculate DPS with all multipliers
    const dps =
      attackSpeed *
      damageConversion *
      (1 + magnitude) * // Magnitude is an increase, not a multiplier
      duration *
      critMultiplier *
      projectiles *
      bowDamage *
      resistancePen *
      physicalMod *
      totalDamagePerHit;

    return Math.max(0, dps); // Ensure DPS is never negative
  }

  get totalDpsWeapon2(): number {
    // Get all required values with null checks
    const attackSpeed = Number(this.attackSpeedWeapon2) || 0;
    const damageConversion = Number(this.damageConversionWeapon2) || 1;
    const magnitude = Number(this.magnitudePercentWeapon2) || 0;
    const duration = Number(this.durationPercentWeapon2) || 1;
    const critMultiplier = Number(this.critMultiplierWeapon2) || 1;
    const projectiles = Number(this.i.totalSkillProjectiles) || 1;
    const bowDamage = 1 + Number(this.i.bowDamage || 0) / 100;
    const resistancePen = Number(this.resPenetrationWeapon2) || 1;
    const physicalPercent = Number(this.physicalDmgPercentWeapon2) || 0;

    // Calculate physical modifier with bounds
    const physicalMod = Math.min(Math.max(0, 1 - 0.75 + physicalPercent), 1);

    // Calculate total damage per hit with null checks
    const totalDamagePerHit =
      (Number(this.finalPhysicalDamage2) || 0) +
      (Number(this.finalLightningDamage2) || 0) +
      (Number(this.finalFireDamage2) || 0) +
      (Number(this.finalColdDamage2) || 0) +
      (Number(this.finalChaosDamage2) || 0);

    // Ensure all multipliers are valid numbers
    if (
      isNaN(attackSpeed) ||
      isNaN(damageConversion) ||
      isNaN(magnitude) ||
      isNaN(duration) ||
      isNaN(critMultiplier) ||
      isNaN(projectiles) ||
      isNaN(bowDamage) ||
      isNaN(resistancePen) ||
      isNaN(physicalMod) ||
      isNaN(totalDamagePerHit)
    ) {
      return 0;
    }

    // Calculate DPS with all multipliers
    const dps =
      attackSpeed *
      damageConversion *
      (1 + magnitude) * // Magnitude is an increase, not a multiplier
      duration *
      critMultiplier *
      projectiles *
      bowDamage *
      resistancePen *
      physicalMod *
      totalDamagePerHit;

    return Math.max(0, dps); // Ensure DPS is never negative
  }

  /**
   * Final Damage Type Calculations
   * Calculates final damage values for each damage type
   */
  get finalPhysicalDamage(): number {
    const basePhysical = Number(this.i.weapon1PhysicalMin);
    const conversionBonus = this.damageConversionWeapon1 * this.averageWeaponBaseDamageWeapon1;

    // Apply shock effect with proper magnitude
    const shockMagnitude = this.i.shockWeapon1 === true ? Number(this.i.shockMagnitude) / 100 : 0;
    const shockBonus = shockMagnitude * this.averageBaseDmgWeapon1;

    // Apply electrocution with proper duration
    const electrocutionDuration =
      this.i.electrocutionWeapon1 === true ? Number(this.i.electrocutionDuration) / 100 : 0;
    const electrocutionMultiplier = 1 + electrocutionDuration;

    return (basePhysical + conversionBonus + shockBonus) * electrocutionMultiplier;
  }

  get finalLightningDamage(): number {
    const baseLightning = Number(this.i.weapon1LightningMin);
    const shockMultiplier = this.i.shockWeapon1 === true ? 0.5 : 1;
    const electrocutionMultiplier = this.i.electrocutionWeapon1 === true ? 1.25 : 1;

    return baseLightning * shockMultiplier * electrocutionMultiplier;
  }

  get finalFireDamage(): number {
    const baseFire = Number(this.i.weapon1FireMin);
    const exposureBonus = this.i.exposureWeapon1 === true ? 0.35 * this.averageBaseDmgWeapon1 : 0;
    const shockMultiplier = this.i.shockWeapon1 === true ? 0.5 : 1;
    const electrocutionMultiplier = this.i.electrocutionWeapon1 === true ? 1.25 : 1;

    return (baseFire + exposureBonus) * shockMultiplier * electrocutionMultiplier;
  }

  get finalColdDamage(): number {
    const baseCold = Number(this.i.weapon1ColdMin);
    const shockMultiplier = this.i.shockWeapon1 === true ? 0.5 : 1;
    const electrocutionMultiplier = this.i.electrocutionWeapon1 === true ? 1.25 : 1;

    return baseCold * shockMultiplier * electrocutionMultiplier;
  }

  get finalChaosDamage(): number {
    const baseChaos = Number(this.i.weapon1ChaosMin);
    return baseChaos;
  }

  get finalPhysicalDamage2(): number {
    const basePhysical = Number(this.i.weapon2PhysicalMin);
    const conversionBonus = this.damageConversionWeapon2 * this.averageWeaponBaseDamageWeapon2;

    // Apply shock effect with proper magnitude
    const shockMagnitude = this.i.shockWeapon2 === true ? Number(this.i.shockMagnitude) / 100 : 0;
    const shockBonus = shockMagnitude * this.averageBaseDmgWeapon2;

    // Apply electrocution with proper duration
    const electrocutionDuration =
      this.i.electrocutionWeapon2 === true ? Number(this.i.electrocutionDuration) / 100 : 0;
    const electrocutionMultiplier = 1 + electrocutionDuration;

    return (basePhysical + conversionBonus + shockBonus) * electrocutionMultiplier;
  }

  get finalLightningDamage2(): number {
    const baseLightning = Number(this.i.weapon2LightningMin);
    const shockMultiplier = this.i.shockWeapon2 === true ? 0.5 : 1;
    const electrocutionMultiplier = this.i.electrocutionWeapon2 === true ? 1.25 : 1;

    return baseLightning * shockMultiplier * electrocutionMultiplier;
  }

  get finalFireDamage2(): number {
    const baseFire = Number(this.i.weapon2FireMin);
    const exposureBonus = this.i.exposureWeapon2 === true ? 0.35 * this.averageBaseDmgWeapon2 : 0;
    const shockMultiplier = this.i.shockWeapon2 === true ? 0.5 : 1;
    const electrocutionMultiplier = this.i.electrocutionWeapon2 === true ? 1.25 : 1;

    return (baseFire + exposureBonus) * shockMultiplier * electrocutionMultiplier;
  }

  get finalColdDamage2(): number {
    const baseCold = Number(this.i.weapon2ColdMin);
    const shockMultiplier = this.i.shockWeapon2 === true ? 0.5 : 1;
    const electrocutionMultiplier = this.i.electrocutionWeapon2 === true ? 1.25 : 1;

    return baseCold * shockMultiplier * electrocutionMultiplier;
  }

  get finalChaosDamage2(): number {
    const baseChaos = Number(this.i.weapon2ChaosMin);
    return baseChaos;
  }

  /**
   * Results Aggregation
   * Returns all calculated values in a structured format
   */
  getResults() {
    return {
      // Primary Output
      dpsIncrease: this.dpsIncrease,

      // Total DPS Values
      totalDpsWeapon1: this.totalDpsWeapon1,
      totalDpsWeapon2: this.totalDpsWeapon2,

      // Base Damage
      averageBaseDmgWeapon1: this.averageBaseDmgWeapon1,
      averageBaseDmgWeapon2: this.averageBaseDmgWeapon2,

      // Damage Increases
      totalIncreaseWeapon1: this.totalIncreaseWeapon1,
      totalIncreaseWeapon2: this.totalIncreaseWeapon2,

      // Elemental Damage
      elementalDamageIncreaseWeapon1: this.elementalDamageIncreaseWeapon1,
      elementalDamageIncreaseWeapon2: this.elementalDamageIncreaseWeapon2,

      // Physical Damage
      physicalDamageWeapon1: this.totalPhysicalDamageWeapon1,
      physicalDamageWeapon2: this.totalPhysicalDamageWeapon2,

      // Attack and Projectile
      attackDamageIncreaseWeapon1: this.attackDamageIncreaseWeapon1,
      attackDamageIncreaseWeapon2: this.attackDamageIncreaseWeapon2,
      projectileDamageIncreaseWeapon1: this.projectileDamageIncreaseWeapon1,
      projectileDamageIncreaseWeapon2: this.projectileDamageIncreaseWeapon2,

      // Conversion and Magnitude
      damageConversionWeapon1: this.damageConversionWeapon1,
      damageConversionWeapon2: this.damageConversionWeapon2,
      magnitudePercentWeapon1: this.magnitudePercentWeapon1,
      magnitudePercentWeapon2: this.magnitudePercentWeapon2,

      // Duration and Multipliers
      durationPercentWeapon1: this.durationPercentWeapon1,
      durationPercentWeapon2: this.durationPercentWeapon2,
      otherMultiplierWeapon1: this.otherMultiplierWeapon1,
      otherMultiplierWeapon2: this.otherMultiplierWeapon2,
      otherMultiplier2Weapon1: this.otherMultiplier2Weapon1,
      otherMultiplier2Weapon2: this.otherMultiplier2Weapon2,
      // Critical Strike
      critChanceWeapon1: this.critChanceWeapon1,
      critChanceWeapon2: this.critChanceWeapon2,
      critDamageWeapon1: this.critDamageWeapon1,
      critDamageWeapon2: this.critDamageWeapon2,
      critMultiplierWeapon1: this.critMultiplierWeapon1,
      critMultiplierWeapon2: this.critMultiplierWeapon2,

      // Damage Type Percentages
      elementalDmgPercentWeapon1: this.elementalDmgPercentWeapon1,
      elementalDmgPercentWeapon2: this.elementalDmgPercentWeapon2,
      physicalDmgPercentWeapon1: this.physicalDmgPercentWeapon1,
      physicalDmgPercentWeapon2: this.physicalDmgPercentWeapon2,
      lightningDmgPercentWeapon1: this.lightningDmgPercentWeapon1,
      lightningDmgPercentWeapon2: this.lightningDmgPercentWeapon2,
      fireDmgPercentWeapon1: this.fireDmgPercentWeapon1,
      fireDmgPercentWeapon2: this.fireDmgPercentWeapon2,
      coldDmgPercentWeapon1: this.coldDmgPercentWeapon1,
      coldDmgPercentWeapon2: this.coldDmgPercentWeapon2,
      chaosDmgPercentWeapon1: this.chaosDmgPercentWeapon1,
      chaosDmgPercentWeapon2: this.chaosDmgPercentWeapon2,

      // Final Damage Values
      finalPhysicalDamage: this.finalPhysicalDamage,
      finalLightningDamage: this.finalLightningDamage,
      finalFireDamage: this.finalFireDamage,
      finalColdDamage: this.finalColdDamage,
      finalChaosDamage: this.finalChaosDamage,
      finalPhysicalDamage2: this.finalPhysicalDamage2,
      finalLightningDamage2: this.finalLightningDamage2,
      finalFireDamage2: this.finalFireDamage2,
      finalColdDamage2: this.finalColdDamage2,
      finalChaosDamage2: this.finalChaosDamage2,
    };
  }
}
