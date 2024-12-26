// Test case configurations for the DPS Calculator
// Each case represents a different progression level or build type

export const TEST_CASES = {
  noob: {
    // Grove Bow - Basic early game bow
    weapon1: {
      minBaseDmg: 5,
      maxBaseDmg: 15,
      physicalMin: 5,
      physicalMax: 15,
      lightningMin: 0,
      lightningMax: 0,
      fireMin: 0,
      fireMax: 0,
      coldMin: 0,
      coldMax: 0,
      chaosMin: 0,
      chaosMax: 0,
    },
    weapon2: {
      minBaseDmg: 6,
      maxBaseDmg: 18,
      physicalMin: 4,
      physicalMax: 12,
      lightningMin: 2,
      lightningMax: 6,
      fireMin: 0,
      fireMax: 0,
      coldMin: 0,
      coldMax: 0,
      chaosMin: 0,
      chaosMax: 0,
    },
    settings: {
      // Basic settings for new player
      attackSpeed: 1.4,
      attackSpeedIncrease: 0,
      totalSkillProjectiles: 1,
      damageMultiplier: 1.0,
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
      supportGems: {
        martialTempo: false,
        primalArmament: false,
        lightningInfusion: false,
        iceBite: false,
      },
      
      // No status effects
      shock: false,
      shockMagnitude: 0,
      shockDuration: 0,
      electrocution: false,
      electrocutionDuration: 0,
      exposure: false,
      exposureMagnitude: 0,
      exposureDuration: 0,
    }
  },

  mid: {
    // Storm Bow - Mid game rare bow
    weapon1: {
      minBaseDmg: 20,
      maxBaseDmg: 60,
      physicalMin: 15,
      physicalMax: 45,
      lightningMin: 5,
      lightningMax: 15,
      fireMin: 0,
      fireMax: 0,
      coldMin: 0,
      coldMax: 0,
      chaosMin: 0,
      chaosMax: 0,
    },
    weapon2: {
      minBaseDmg: 25,
      maxBaseDmg: 75,
      physicalMin: 10,
      physicalMax: 30,
      lightningMin: 10,
      lightningMax: 30,
      fireMin: 5,
      fireMax: 15,
      coldMin: 0,
      coldMax: 0,
      chaosMin: 0,
      chaosMax: 0,
    },
    settings: {
      // Mid-game settings
      attackSpeed: 1.5,
      attackSpeedIncrease: 15,
      totalSkillProjectiles: 1,
      damageMultiplier: 1.2,
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
      supportGems: {
        martialTempo: true,
        primalArmament: false,
        lightningInfusion: false,
        iceBite: false,
      },
      
      // Basic status effects
      shock: true,
      shockMagnitude: 20,
      shockDuration: 100,
      electrocution: false,
      electrocutionDuration: 0,
      exposure: false,
      exposureMagnitude: 0,
      exposureDuration: 0,
    }
  },

  max: {
    // Tempest Bow - Endgame unique
    weapon1: {
      minBaseDmg: 50,
      maxBaseDmg: 150,
      physicalMin: 25,
      physicalMax: 75,
      lightningMin: 15,
      lightningMax: 45,
      fireMin: 10,
      fireMax: 30,
      coldMin: 0,
      coldMax: 0,
      chaosMin: 0,
      chaosMax: 0,
    },
    weapon2: {
      minBaseDmg: 60,
      maxBaseDmg: 180,
      physicalMin: 20,
      physicalMax: 60,
      lightningMin: 20,
      lightningMax: 60,
      fireMin: 15,
      fireMax: 45,
      coldMin: 5,
      coldMax: 15,
      chaosMin: 0,
      chaosMax: 0,
    },
    settings: {
      // Endgame settings
      attackSpeed: 1.7,
      attackSpeedIncrease: 45,
      totalSkillProjectiles: 2,
      damageMultiplier: 1.4,
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
      supportGems: {
        martialTempo: true,
        primalArmament: true,
        lightningInfusion: true,
        iceBite: true,
      },
      
      // Full status effects
      shock: true,
      shockMagnitude: 50,
      shockDuration: 100,
      electrocution: true,
      electrocutionDuration: 65,
      exposure: true,
      exposureMagnitude: 30,
      exposureDuration: 100,
    }
  },

  physical: {
    // Basic Physical Weapon
    weapon1: {
      minBaseDmg: 100,
      maxBaseDmg: 150,
      physicalMin: 80,
      physicalMax: 120,
      lightningMin: 0,
      lightningMax: 0,
      fireMin: 0,
      fireMax: 0,
      coldMin: 0,
      coldMax: 0,
      chaosMin: 0,
      chaosMax: 0,
    },
    weapon2: {
      minBaseDmg: 90,
      maxBaseDmg: 135,
      physicalMin: 90,
      physicalMax: 135,
      lightningMin: 0,
      lightningMax: 0,
      fireMin: 0,
      fireMax: 0,
      coldMin: 0,
      coldMax: 0,
      chaosMin: 0,
      chaosMax: 0,
    },
    settings: {
      attackSpeed: 1.2,
      attackSpeedIncrease: 20,
      totalSkillProjectiles: 1,
      damageMultiplier: 1.0,
      critChance: 5,
      critDamage: 150,
      resPenetration: 0,
      bowDamage: 22,
      
      physicalDamageIncrease: 43,
      elementalDamageIncrease: 0,
      attackDamageIncrease: 43,
      projectileDamageIncrease: 0,
      
      supportGems: {
        martialTempo: false,
        primalArmament: false,
        lightningInfusion: false,
        iceBite: false,
      },
      
      shock: false,
      shockMagnitude: 0,
      shockDuration: 0,
      electrocution: false,
      electrocutionDuration: 0,
      exposure: false,
      exposureMagnitude: 0,
      exposureDuration: 0,
    }
  },

  elemental: {
    // Elemental Weapon with Status Effects
    weapon1: {
      minBaseDmg: 80,
      maxBaseDmg: 120,
      physicalMin: 30,
      physicalMax: 45,
      lightningMin: 50,
      lightningMax: 75,
      fireMin: 0,
      fireMax: 0,
      coldMin: 0,
      coldMax: 0,
      chaosMin: 0,
      chaosMax: 0,
    },
    weapon2: {
      minBaseDmg: 85,
      maxBaseDmg: 125,
      physicalMin: 25,
      physicalMax: 40,
      lightningMin: 45,
      lightningMax: 65,
      fireMin: 15,
      fireMax: 20,
      coldMin: 0,
      coldMax: 0,
      chaosMin: 0,
      chaosMax: 0,
    },
    settings: {
      attackSpeed: 1.5,
      attackSpeedIncrease: 30,
      totalSkillProjectiles: 1,
      damageMultiplier: 1.2,
      critChance: 15,
      critDamage: 200,
      resPenetration: 20,
      bowDamage: 22,
      
      physicalDamageIncrease: 43,
      elementalDamageIncrease: 150,
      attackDamageIncrease: 43,
      projectileDamageIncrease: 75,
      
      supportGems: {
        martialTempo: false,
        primalArmament: false,
        lightningInfusion: true,
        iceBite: false,
      },
      
      shock: true,
      shockMagnitude: 40,
      shockDuration: 100,
      electrocution: true,
      electrocutionDuration: 50,
      exposure: false,
      exposureMagnitude: 0,
      exposureDuration: 0,
    }
  },

  hybrid: {
    // Full Configuration with All Support Gems
    weapon1: {
      minBaseDmg: 120,
      maxBaseDmg: 180,
      physicalMin: 60,
      physicalMax: 90,
      lightningMin: 30,
      lightningMax: 45,
      fireMin: 20,
      fireMax: 30,
      coldMin: 10,
      coldMax: 15,
      chaosMin: 0,
      chaosMax: 0,
    },
    weapon2: {
      minBaseDmg: 130,
      maxBaseDmg: 195,
      physicalMin: 50,
      physicalMax: 75,
      lightningMin: 40,
      lightningMax: 60,
      fireMin: 25,
      fireMax: 40,
      coldMin: 15,
      coldMax: 20,
      chaosMin: 0,
      chaosMax: 0,
    },
    settings: {
      attackSpeed: 1.8,
      attackSpeedIncrease: 50,
      totalSkillProjectiles: 2,
      damageMultiplier: 1.4,
      critChance: 25,
      critDamage: 250,
      resPenetration: 35,
      bowDamage: 22,
      
      physicalDamageIncrease: 43,
      elementalDamageIncrease: 150,
      attackDamageIncrease: 43,
      projectileDamageIncrease: 75,
      
      supportGems: {
        martialTempo: true,
        primalArmament: true,
        lightningInfusion: true,
        iceBite: true,
      },
      
      shock: true,
      shockMagnitude: 40,
      shockDuration: 100,
      electrocution: true,
      electrocutionDuration: 50,
      exposure: true,
      exposureMagnitude: 25,
      exposureDuration: 100,
    }
  }
} as const;
