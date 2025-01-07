import { useCallback, useMemo, useState } from "react";
import { ARMOR_TYPES, EFFECTS, WEAPONS } from "~/lib/constants/speed-calc";
import type { CalculatorState, SpeedResult, Weapon } from "~/types/speed-calc";

const DEFAULT_STATE: CalculatorState = {
  mainhand: "sword",
  offhand: "nothing",
  armor: "naked",
  dexterity: 10,
  athletics: 0,
  effects: {
    allPhases: [],
    recoveryAndReload: [],
    reload: [],
  },
  armorModifiers: {
    armoredGrace: false,
    cutthroatCosmo: false,
    nalvi: false,
  },
};

export function useSpeedCalculator() {
  const [state, setState] = useState<CalculatorState>(DEFAULT_STATE);

  const mainhandWeapon = useMemo(() => 
    WEAPONS.find(w => w.id === state.mainhand), [state.mainhand]);
  
  const offhandWeapon = useMemo(() => 
    WEAPONS.find(w => w.id === state.offhand), [state.offhand]);
  
  const armor = useMemo(() => 
    ARMOR_TYPES.find(a => a.id === state.armor), [state.armor]);

  const isDualWielding = useMemo(() => {
    if (!mainhandWeapon || !offhandWeapon) return false;
    return offhandWeapon.category !== "Shields" && offhandWeapon.category !== "Empty Hand";
  }, [mainhandWeapon, offhandWeapon]);

  const isTwoHanded = useMemo(() => {
    if (!mainhandWeapon) return false;
    return mainhandWeapon.category.startsWith("Two-Handed");
  }, [mainhandWeapon]);

  const calculateSpeedResult = useCallback((): SpeedResult => {
    if (!mainhandWeapon || !armor) return {
      mainhand: { attack: 0 },
      total: 0,
      dexModifier: 1,
      armorPenalty: 0,
    };

    // Calculate DEX modifier
    const dexModifier = 1 + (state.dexterity - 10) / 33.3;

    // Calculate armor penalty and modifiers
    let armorPenalty = armor.recoveryPenalty;
    if (state.armorModifiers.armoredGrace) armorPenalty -= 0.10;
    if (state.armorModifiers.cutthroatCosmo) armorPenalty -= 0.10;
    if (state.armorModifiers.nalvi) armorPenalty -= 0.08;
    armorPenalty = Math.max(0, armorPenalty);

    // Calculate effect multipliers
    const allPhasesMultiplier = state.effects.allPhases.reduce((acc, effectId) => {
      const effect = EFFECTS.ALL_PHASES.find(e => e.id === effectId);
      if (!effect) return acc;
      if (effect.rangedOnly && !isRangedWeapon(mainhandWeapon)) return acc;
      return acc * effect.value;
    }, 1);

    const recoveryReloadMultiplier = state.effects.recoveryAndReload.reduce((acc, effectId) => {
      const effect = EFFECTS.RECOVERY_AND_RELOAD.find(e => e.id === effectId);
      if (!effect) return acc;
      if (effect.rangedOnly && !isRangedWeapon(mainhandWeapon)) return acc;
      if (effect.athleticsBonus) {
        return acc * (1 + effect.athleticsBonus * state.athletics);
      }
      return acc * effect.value;
    }, 1);

    const reloadMultiplier = state.effects.reload.reduce((acc, effectId) => {
      const effect = EFFECTS.RELOAD.find(e => e.id === effectId);
      if (!effect) return acc;
      if (effect.rangedOnly && !isRangedWeapon(mainhandWeapon)) return acc;
      return acc * effect.value;
    }, 1);

    // Calculate mainhand speeds
    const mainhandResult = {
      attack: mainhandWeapon.attackDuration || 0,
      recovery: mainhandWeapon.recoveryDuration,
      reload: mainhandWeapon.reloadDuration,
    };

    // Apply modifiers
    if (mainhandResult.attack) {
      mainhandResult.attack /= (dexModifier * allPhasesMultiplier);
    }
    if (mainhandResult.recovery) {
      mainhandResult.recovery /= (dexModifier * allPhasesMultiplier * recoveryReloadMultiplier * (1 - armorPenalty));
      if (isDualWielding) mainhandResult.recovery *= 0.7; // Dual wielding penalty
    }
    if (mainhandResult.reload) {
      mainhandResult.reload /= (dexModifier * allPhasesMultiplier * recoveryReloadMultiplier * reloadMultiplier * (1 - armorPenalty));
      if (isDualWielding) mainhandResult.reload *= 0.7; // Dual wielding penalty
    }

    // Calculate offhand speeds if dual wielding
    let offhandResult;
    if (isDualWielding && offhandWeapon) {
      offhandResult = {
        attack: offhandWeapon.attackDuration || 0,
        recovery: offhandWeapon.recoveryDuration,
        reload: offhandWeapon.reloadDuration,
      };

      if (offhandResult.attack) {
        offhandResult.attack /= (dexModifier * allPhasesMultiplier);
      }
      if (offhandResult.recovery) {
        offhandResult.recovery /= (dexModifier * allPhasesMultiplier * recoveryReloadMultiplier * (1 - armorPenalty));
        offhandResult.recovery *= 0.7; // Dual wielding penalty
      }
      if (offhandResult.reload) {
        offhandResult.reload /= (dexModifier * allPhasesMultiplier * recoveryReloadMultiplier * reloadMultiplier * (1 - armorPenalty));
        offhandResult.reload *= 0.7; // Dual wielding penalty
      }
    }

    // Calculate total frames
    const delay = isTwoHanded ? 5 : 4;
    let total = delay + mainhandResult.attack;
    if (mainhandResult.recovery) total += mainhandResult.recovery;
    if (mainhandResult.reload) total += mainhandResult.reload;
    if (offhandResult) {
      total += delay + offhandResult.attack;
      if (offhandResult.recovery) total += offhandResult.recovery;
      if (offhandResult.reload) total += offhandResult.reload;
    }

    return {
      mainhand: mainhandResult,
      ...(offhandResult && { offhand: offhandResult }),
      total,
      dexModifier,
      armorPenalty,
    };
  }, [state, mainhandWeapon, offhandWeapon, armor, isDualWielding, isTwoHanded]);

  const result = useMemo(() => calculateSpeedResult(), [calculateSpeedResult]);

  const updateState = useCallback((updates: Partial<CalculatorState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  const toggleEffect = useCallback((category: keyof CalculatorState["effects"], effectId: string) => {
    setState(prev => ({
      ...prev,
      effects: {
        ...prev.effects,
        [category]: prev.effects[category].includes(effectId)
          ? prev.effects[category].filter(id => id !== effectId)
          : [...prev.effects[category], effectId]
      }
    }));
  }, []);

  return {
    state,
    result,
    updateState,
    toggleEffect,
    isDualWielding,
    isTwoHanded,
  };
}

function isRangedWeapon(weapon: Weapon) {
  return weapon.category === "One-Handed Ranged" || weapon.category === "Two-Handed Ranged";
}
