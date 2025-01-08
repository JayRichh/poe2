"use client";

import { Select } from "~/components/ui/Select";
import { Text } from "~/components/ui/Text";

import { ARMOR_TYPES } from "~/lib/constants/speed-calc";
import type { CalculatorState } from "~/types/speed-calc";

import { Checkbox } from "../ui/Checkbox";

type ArmorModifierKey = keyof CalculatorState["armorModifiers"];

interface ArmorSelectProps {
  value: string;
  onChange: (value: string) => void;
  modifiers: CalculatorState["armorModifiers"];
  onModifierChange: (key: keyof CalculatorState["armorModifiers"], value: boolean) => void;
}

export function ArmorSelect({ value, onChange, modifiers, onModifierChange }: ArmorSelectProps) {
  const armorsByCategory = ARMOR_TYPES.reduce(
    (acc, armor) => {
      if (!acc.find((opt) => opt.value === armor.category)) {
        acc.push({
          value: armor.category,
          label: armor.category,
          disabled: true,
        });
      }

      acc.push({
        value: armor.id,
        label: armor.name,
      });

      return acc;
    },
    [] as { value: string; label: string; disabled?: boolean }[]
  );

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Text variant="body" weight="medium">
          Armor Type
        </Text>
        <Select value={value} onChange={onChange} options={armorsByCategory} />
      </div>

      <div className="space-y-2">
        <Text variant="body" weight="medium">
          Armor Modifiers
        </Text>
        <div className="space-y-3">
          <Checkbox
            id="armored-grace"
            checked={modifiers.armoredGrace}
            onCheckedChange={() => onModifierChange("armoredGrace", !modifiers.armoredGrace)}
            label="Armored Grace"
          />
          <Checkbox
            id="cutthroat-cosmo"
            checked={modifiers.cutthroatCosmo}
            onCheckedChange={() => onModifierChange("cutthroatCosmo", !modifiers.cutthroatCosmo)}
            label="Abraham / Epsilon / Cosmo"
          />
          <Checkbox
            id="nalvi"
            checked={modifiers.nalvi}
            onCheckedChange={() => onModifierChange("nalvi", !modifiers.nalvi)}
            label="Nalvi"
          />
        </div>
      </div>
    </div>
  );
}
