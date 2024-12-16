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
    return (this.totalDpsWeapon2 / this.totalDpsWeapon1) - 1;
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
    return 0.58 + 0.12 + 0.2 + 0.12 + 4 * 0.12;
  }

  get totalIncreaseWeapon2(): number {
     return 0.58 + 0.12 + 0.2 + 0.12 + 4 * 0.12;
  }

  /**
   * Elemental Damage Calculations
   * Handles all elemental damage types and their increases
   */
  get elementalDamageIncreaseWeapon1(): number {
    return 0.1 + 0.12 + 0.12 + 0.13;
  }

  get elementalDamageIncreaseWeapon2(): number {
    return 0.1 + 0.12 + 0.12 + 0.13;
  }

  /**
   * Physical Damage Calculations
   * Handles physical damage and its modifiers
   */
  get physicalDamageIncreaseWeapon1(): number {
    return 0.1 + 0.12;
  }

  get physicalDamageIncreaseWeapon2(): number {
    return 0.1 + 0.12;
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
  get totalPhysicalDamageWeapon1(): number {
    return (
      Number(this.i.weapon1PhysicalMin) +
      Number(this.i.weapon1LightningMin) +
      Number(this.i.weapon1FireMin) +
      Number(this.i.weapon1ColdMin) +
      Number(this.i.weapon1ChaosMin)
    );
  }

  get totalPhysicalDamageWeapon2(): number {
    return (
      Number(this.i.weapon2PhysicalMin) +
      Number(this.i.weapon2LightningMin) +
      Number(this.i.weapon2FireMin) +
      Number(this.i.weapon2ColdMin) +
      Number(this.i.weapon2ChaosMin)
    );
  }

  /**
   * Attack and Projectile Modifiers
   * Handles attack speed and projectile-based calculations
   */
  get attackDamageIncreaseWeapon1(): number {
    return 0.1 + 0.08 + 0.25;
  }

  get attackDamageIncreaseWeapon2(): number {
    return 0.1 + 0.08 + 0.25;
  }

  get projectileDamageIncreaseWeapon1(): number {
    return 0.1 + 0.12;
  }

  get projectileDamageIncreaseWeapon2(): number {
    return 0.1 + 0.12;
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
    return (
      (Number(this.i.newPhysicalMinWeapon1) +
        (Number(this.i.newPhysicalMaxWeapon1) - Number(this.i.newPhysicalMinWeapon1)) * (2 / 3) -
        (Number(this.i.newPhysicalMinWeapon1) + Number(this.i.newPhysicalMaxWeapon1)) / 2) /
      ((Number(this.i.newPhysicalMinWeapon1) + Number(this.i.newPhysicalMaxWeapon1)) / 2)
    );
  }

  get magnitudePercentWeapon2(): number {
    return (
      (Number(this.i.newPhysicalMinWeapon2) +
        (Number(this.i.newPhysicalMaxWeapon2) - Number(this.i.newPhysicalMinWeapon2)) * (2 / 3) -
        (Number(this.i.newPhysicalMinWeapon2) + Number(this.i.newPhysicalMaxWeapon2)) / 2) /
      ((Number(this.i.newPhysicalMinWeapon2) + Number(this.i.newPhysicalMaxWeapon2)) / 2)
    );
  }

  /**
   * Duration Effects
   * Calculates duration-based modifiers and effects
   */
  get durationPercentWeapon1(): number {
    return (
      (1 +
        (this.i.lightningInfusionWeapon1 === true ? 0.2 * Number(this.i.averageWeaponBaseDamageWeapon1) : 0) *
          (1 + Number(this.i.attackSpeedIncreaseWeapon1))) *
      (1 +
        (this.i.primalArmamentWeapon1 === true ? 0.2 * Number(this.i.attackDamageIncreaseWeapon1) : 0) *
          (1 + Number(this.i.totalPhysicalDamageWeapon1))) *
      (1 +
        (this.i.iceBiteWeapon1 === true ? 0.2 * Number(this.i.projectileDamageIncreaseWeapon1) : 0) *
          (1 + Number(this.i.attackDamageIncreaseWeapon1))) *
      (1 +
        (this.i.shockWeapon1 === true ? Number(this.i.durationPercentWeapon1) * Number(this.i.magnitudePercentWeapon1) : 0)) *
      (1 + Number(this.i.otherSkillDmgWeapon1) * Number(this.i.otherSkillDmgWeapon1) * (1 + Number(this.i.otherSkillDmgWeapon1))) *
      (1 + Number(this.i.otherSkillDmgWeapon1) * Number(this.i.otherSkillDmgWeapon1) * (1 + Number(this.i.otherSkillDmgWeapon1)))
    );
  }

  get durationPercentWeapon2(): number {
    return (
      (1 +
        (this.i.lightningInfusionWeapon2 === true ? 0.2 * Number(this.i.averageWeaponBaseDamageWeapon2) : 0) *
          (1 + Number(this.i.attackSpeedIncreaseWeapon2))) *
      (1 +
        (this.i.primalArmamentWeapon2 === true ? 0.2 * Number(this.i.attackDamageIncreaseWeapon2) : 0) *
          (1 + Number(this.i.totalPhysicalDamageWeapon2))) *
      (1 +
        (this.i.iceBiteWeapon2 === true ? 0.2 * Number(this.i.projectileDamageIncreaseWeapon2) : 0) *
          (1 + Number(this.i.attackDamageIncreaseWeapon2))) *
      (1 +
        (this.i.shockWeapon2 === true ? Number(this.i.durationPercentWeapon2) * Number(this.i.magnitudePercentWeapon2) : 0)) *
      (1 + Number(this.i.otherSkillDmgWeapon2) * Number(this.i.otherSkillDmgWeapon2) * (1 + Number(this.i.otherSkillDmgWeapon2))) *
      (1 + Number(this.i.otherSkillDmgWeapon2) * Number(this.i.otherSkillDmgWeapon2) * (1 + Number(this.i.otherSkillDmgWeapon2)))
    );
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
    return Number(this.i.resPenetration) * (1 - Number(this.i.resPenetration));
  }

  get resPenetrationWeapon2(): number {
    return Number(this.i.resPenetration) * (1 - Number(this.i.resPenetration));
  }

  /**
   * Critical Strike Calculations
   * Processes crit chance and damage
   */
  get critChanceWeapon1(): number {
    return Number(this.i.baseCritChance) * (1 + Number(this.i.critChanceIncrease));
  }

  get critChanceWeapon2(): number {
     return Number(this.i.baseCritChance2) * (1 + Number(this.i.critChanceIncrease2));
  }

  get critDamageWeapon1(): number {
    return Number(this.i.critDamage);
  }

  get critDamageWeapon2(): number {
    return Number(this.i.critDamage2);
  }

  get critMultiplierWeapon1(): number {
    return 1 + Number(this.i.critMultiplier) * Number(this.i.resPenetration);
  }

  get critMultiplierWeapon2(): number {
    return 1 + Number(this.i.critMultiplier2) * Number(this.i.resPenetration);
  }

  /**
   * Elemental Damage Percentages
   * Calculates percentage-based elemental damage
   */
  get elementalDmgPercentWeapon1(): number {
    return (
      ((Number(this.i.newPhysicalMinWeapon1) -
        Number(this.i.weapon1PhysicalMin) -
        Number(this.i.weapon1ChaosMin) +
        (Number(this.i.newPhysicalMaxWeapon1) - Number(this.i.weapon1PhysicalMax) - Number(this.i.weapon1ChaosMax))) /
        2) /
      Number(this.i.attacksPerSecond)
    );
  }

  get elementalDmgPercentWeapon2(): number {
    return (
      ((Number(this.i.newPhysicalMinWeapon2) -
        Number(this.i.weapon2PhysicalMin) -
         Number(this.i.weapon2ChaosMin) +
        (Number(this.i.newPhysicalMaxWeapon2) - Number(this.i.weapon2PhysicalMax) - Number(this.i.weapon2ChaosMax))) /
        2) /
      Number(this.i.attacksPerSecond)
    );
  }

  /**
   * Physical and Elemental Percentages
   * Calculates percentage-based physical and elemental contributions
   */
  get physicalDmgPercentWeapon1(): number {
    return 3 * 0.15 + 5 * 0.06;
  }

  get physicalDmgPercentWeapon2(): number {
    return Number(this.i.physicalDmgPercent);
  }

  get lightningDmgPercentWeapon1(): number {
    return (Number(this.i.weapon1LightningMin) + Number(this.i.weapon1LightningMax)) / 2 / Number(this.i.attacksPerSecond);
  }

  get lightningDmgPercentWeapon2(): number {
    return (Number(this.i.weapon2LightningMin) + Number(this.i.weapon2LightningMax)) / 2 / Number(this.i.attacksPerSecond);
  }

  get fireDmgPercentWeapon1(): number {
    return (Number(this.i.weapon1FireMin) + Number(this.i.weapon1FireMax)) / 2 / Number(this.i.attacksPerSecond);
  }

  get fireDmgPercentWeapon2(): number {
    return (Number(this.i.weapon2FireMin) + Number(this.i.weapon2FireMax)) / 2 / Number(this.i.attacksPerSecond);
  }

  get coldDmgPercentWeapon1(): number {
     return (Number(this.i.weapon1ColdMin) + Number(this.i.weapon1ColdMax)) / 2 / Number(this.i.attacksPerSecond);
  }

  get coldDmgPercentWeapon2(): number {
    return (Number(this.i.weapon2ColdMin) + Number(this.i.weapon2ColdMax)) / 2 / Number(this.i.attacksPerSecond);
  }

   get chaosDmgPercentWeapon1(): number {
    return (Number(this.i.weapon1ChaosMin) + Number(this.i.weapon1ChaosMax)) / 2 / Number(this.i.attacksPerSecond);
  }

  get chaosDmgPercentWeapon2(): number {
    return (Number(this.i.weapon2ChaosMin) + Number(this.i.weapon2ChaosMax)) / 2 / Number(this.i.attacksPerSecond);
  }

  /**
   * Final DPS Calculations
   * Combines all modifiers to calculate total DPS
   */
  get totalDpsWeapon1(): number {
    return (
      Number(this.i.attacksPerSecond) *
      Number(this.i.totalSkillProjectiles) *
      Number(this.i.damageConversionWeapon1) *
      Number(this.i.magnitudePercentWeapon1) *
      Number(this.i.durationPercentWeapon1) *
      Number(this.i.critMultiplierWeapon1) *
      (1 - 0.75 + Number(this.i.physicalDmgPercent) > 1 ? 1 : 1 - 0.75 + Number(this.i.physicalDmgPercent))
    );
  }

  get totalDpsWeapon2(): number {
    return (
      Number(this.i.attacksPerSecond) *
      Number(this.i.totalSkillProjectiles) *
      Number(this.i.damageConversionWeapon2) *
      Number(this.i.magnitudePercentWeapon2) *
      Number(this.i.durationPercentWeapon2) *
      Number(this.i.critMultiplierWeapon2) *
      (1 - 0.75 + Number(this.i.physicalDmgPercent) > 1 ? 1 : 1 - 0.75 + Number(this.i.physicalDmgPercent))
    );
  }

  /**
   * Final Damage Type Calculations
   * Calculates final damage values for each damage type
   */
  get finalPhysicalDamage(): number {
    return (
      (this.i.shockWeapon1 === true
        ? Number(this.i.weapon1PhysicalMin) + Number(this.i.damageConversionWeapon1) * Number(this.i.averageWeaponBaseDamageWeapon1) + 0.25 * Number(this.i.averageBaseDmgWeapon1)
        : Number(this.i.weapon1PhysicalMin) + Number(this.i.damageConversionWeapon1) * Number(this.i.averageWeaponBaseDamageWeapon1)) * (this.i.electrocutionWeapon1 === true ? 1.25 : 1)
    );
  }

  get finalLightningDamage(): number {
    return (
      (this.i.shockWeapon1 === true ? Number(this.i.weapon1LightningMin) * 0.5 : Number(this.i.weapon1LightningMin)) * (this.i.electrocutionWeapon1 === true ? 1.25 : 1)
    );
  }

  get finalFireDamage(): number {
    return (
      (this.i.exposureWeapon1 === true
        ? Number(this.i.weapon1FireMin) + 0.35 * Number(this.i.averageBaseDmgWeapon1)
        : Number(this.i.weapon1FireMin)) *
      (this.i.shockWeapon1 === true ? 0.5 : 1) *
      (this.i.electrocutionWeapon1 === true ? 1.25 : 1)
    );
  }

  get finalColdDamage(): number {
    return Number(this.i.weapon1ColdMin);
  }

  get finalChaosDamage(): number {
    return 0;
  }

  get finalPhysicalDamage2(): number {
    return (
      (this.i.shockWeapon2 === true
        ? Number(this.i.weapon2PhysicalMin) + Number(this.i.damageConversionWeapon2) * Number(this.i.averageWeaponBaseDamageWeapon2) + 0.25 * Number(this.i.averageBaseDmgWeapon2)
        : Number(this.i.weapon2PhysicalMin) + Number(this.i.damageConversionWeapon2) * Number(this.i.averageWeaponBaseDamageWeapon2)) * (this.i.electrocutionWeapon2 === true ? 1.25 : 1)
    );
  }

  get finalLightningDamage2(): number {
    return (
      (this.i.shockWeapon2 === true ? Number(this.i.weapon2LightningMin) * 0.5 : Number(this.i.weapon2LightningMin)) * (this.i.electrocutionWeapon2 === true ? 1.25 : 1)
    );
  }

  get finalFireDamage2(): number {
    return (
      (this.i.exposureWeapon2 === true
        ? Number(this.i.weapon2FireMin) + 0.35 * Number(this.i.averageBaseDmgWeapon2)
        : Number(this.i.weapon2FireMin)) *
      (this.i.shockWeapon2 === true ? 0.5 : 1) *
      (this.i.electrocutionWeapon2 === true ? 1.25 : 1)
    );
  }

  get finalColdDamage2(): number {
    return Number(this.i.weapon2ColdMin);
  }

  get finalChaosDamage2(): number {
    return 0;
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
      
      // Attack Speed
      attackSpeedWeapon1: this.attackSpeedWeapon1,
      attackSpeedWeapon2: this.attackSpeedWeapon2,
      attackSpeedIncreaseWeapon1: this.attackSpeedIncreaseWeapon1,
      attackSpeedIncreaseWeapon2: this.attackSpeedIncreaseWeapon2,
      
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