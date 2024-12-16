"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { DPSCalc } from "@/lib/calculations";
import { WeaponForm, type WeaponInputs } from "./WeaponForm";
import { GlobalSettings, type GlobalSettingsInputs } from "./GlobalSettings";
import { Results } from "./Results";

interface CalculatorInputs extends GlobalSettingsInputs {
  weapon1: WeaponInputs;
  weapon2: WeaponInputs;
}

const defaultWeapon: WeaponInputs = {
  minBaseDmg: 0,
  maxBaseDmg: 0,
  physicalMin: 0,
  physicalMax: 0,
  lightningMin: 0,
  lightningMax: 0,
  fireMin: 0,
  fireMax: 0,
  coldMin: 0,
  coldMax: 0,
  chaosMin: 0,
  chaosMax: 0,
};

export function DPSCalculator() {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    weapon1: defaultWeapon,
    weapon2: defaultWeapon,
    attackSpeed: 1,
    attackSpeedIncrease: 0,
    totalSkillProjectiles: 1,
    damageMultiplier: 1,
    critChance: 5,
    critDamage: 150,
    resPenetration: 0,
    shock: false,
    electrocution: false,
    exposure: false,
    lightningInfusion: false,
    primalArmament: false,
    iceBite: false,
  });

  const [results, setResults] = useState<ReturnType<DPSCalc["getResults"]> | null>(null);

  const updateWeapon1 = (updates: Partial<WeaponInputs>) => {
    setInputs((prev) => ({
      ...prev,
      weapon1: { ...prev.weapon1, ...updates },
    }));
  };

  const updateWeapon2 = (updates: Partial<WeaponInputs>) => {
    setInputs((prev) => ({
      ...prev,
      weapon2: { ...prev.weapon2, ...updates },
    }));
  };

  const updateGlobalSettings = (updates: Partial<GlobalSettingsInputs>) => {
    setInputs((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  const calculateDPS = () => {
    const calc = new DPSCalc({
      weapon1MinBaseDmg: inputs.weapon1.minBaseDmg,
      weapon1MaxBaseDmg: inputs.weapon1.maxBaseDmg,
      weapon1PhysicalMin: inputs.weapon1.physicalMin,
      weapon1PhysicalMax: inputs.weapon1.physicalMax,
      weapon1LightningMin: inputs.weapon1.lightningMin,
      weapon1LightningMax: inputs.weapon1.lightningMax,
      weapon1FireMin: inputs.weapon1.fireMin,
      weapon1FireMax: inputs.weapon1.fireMax,
      weapon1ColdMin: inputs.weapon1.coldMin,
      weapon1ColdMax: inputs.weapon1.coldMax,
      weapon1ChaosMin: inputs.weapon1.chaosMin,
      weapon1ChaosMax: inputs.weapon1.chaosMax,

      weapon2MinBaseDmg: inputs.weapon2.minBaseDmg,
      weapon2MaxBaseDmg: inputs.weapon2.maxBaseDmg,
      weapon2PhysicalMin: inputs.weapon2.physicalMin,
      weapon2PhysicalMax: inputs.weapon2.physicalMax,
      weapon2LightningMin: inputs.weapon2.lightningMin,
      weapon2LightningMax: inputs.weapon2.lightningMax,
      weapon2FireMin: inputs.weapon2.fireMin,
      weapon2FireMax: inputs.weapon2.fireMax,
      weapon2ColdMin: inputs.weapon2.coldMin,
      weapon2ColdMax: inputs.weapon2.coldMax,
      weapon2ChaosMin: inputs.weapon2.chaosMin,
      weapon2ChaosMax: inputs.weapon2.chaosMax,

      attackSpeed: inputs.attackSpeed,
      attackSpeedIncrease: inputs.attackSpeedIncrease,
      totalSkillProjectiles: inputs.totalSkillProjectiles,
      damageMultiplier: inputs.damageMultiplier,
      critChance: inputs.critChance,
      critDamage: inputs.critDamage,
      resPenetration: inputs.resPenetration,

      shockWeapon1: inputs.shock,
      shockWeapon2: inputs.shock,
      electrocutionWeapon1: inputs.electrocution,
      electrocutionWeapon2: inputs.electrocution,
      exposureWeapon1: inputs.exposure,
      exposureWeapon2: inputs.exposure,
      lightningInfusionWeapon1: inputs.lightningInfusion,
      lightningInfusionWeapon2: inputs.lightningInfusion,
      primalArmamentWeapon1: inputs.primalArmament,
      primalArmamentWeapon2: inputs.primalArmament,
      iceBiteWeapon1: inputs.iceBite,
      iceBiteWeapon2: inputs.iceBite,
    });

    setResults(calc.getResults());
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <WeaponForm 
            weapon={inputs.weapon1} 
            onChange={updateWeapon1}
            label="Weapon 1"
          />
        </Card>

        <Card className="p-6">
          <WeaponForm 
            weapon={inputs.weapon2} 
            onChange={updateWeapon2}
            label="Weapon 2"
          />
        </Card>
      </div>

      <Card className="p-6">
        <GlobalSettings
          settings={inputs}
          onChange={updateGlobalSettings}
        />
        <div className="flex justify-end mt-6">
          <Button onClick={calculateDPS}>Calculate DPS</Button>
        </div>
      </Card>

      {results && <Results results={results} />}
    </div>
  );
}