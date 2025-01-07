import { WEAPON_CATEGORIES } from "~/lib/constants/speed-calc";

export type WeaponCategory = typeof WEAPON_CATEGORIES[keyof typeof WEAPON_CATEGORIES];

export interface Weapon {
  id: string;
  name: string;
  category: WeaponCategory;
  attackDuration?: number;
  recoveryDuration?: number;
  reloadDuration?: number;
}

export interface ArmorType {
  id: string;
  name: string;
  recoveryPenalty: number;
  category: string;
}

export interface Effect {
  id: string;
  name: string;
  value: number;
  rangedOnly?: boolean;
  athleticsBonus?: number;
}

export interface SpeedResult {
  mainhand: {
    attack: number;
    recovery?: number;
    reload?: number;
  };
  offhand?: {
    attack: number;
    recovery?: number;
    reload?: number;
  };
  total: number;
  dexModifier: number;
  armorPenalty: number;
}

export interface CalculatorState {
  mainhand: string;
  offhand: string;
  armor: string;
  dexterity: number;
  athletics: number;
  effects: {
    allPhases: string[];
    recoveryAndReload: string[];
    reload: string[];
  };
  armorModifiers: {
    armoredGrace: boolean;
    cutthroatCosmo: boolean;
    nalvi: boolean;
  };
}
