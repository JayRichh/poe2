"use client";

import { Select } from "~/components/ui/Select";
import { Text } from "~/components/ui/Text";

import { WEAPONS, WEAPON_CATEGORIES } from "~/lib/constants/speed-calc";
import type { WeaponCategory } from "~/types/speed-calc";

interface WeaponSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  disabledCategories?: WeaponCategory[];
}

export function WeaponSelect({
  label,
  value,
  onChange,
  disabledCategories = [],
}: WeaponSelectProps) {
  const options = WEAPONS.reduce(
    (acc, weapon) => {
      // Add category header if it's not already added
      if (!acc.find((opt) => opt.value === weapon.category)) {
        acc.push({
          value: weapon.category,
          label: weapon.category,
          disabled: true,
        });
      }

      // Add weapon option
      acc.push({
        value: weapon.id,
        label: weapon.name,
        disabled: disabledCategories.includes(weapon.category),
      });

      return acc;
    },
    [] as { value: string; label: string; disabled?: boolean }[]
  );

  return (
    <div className="space-y-2">
      <Text variant="body" weight="medium">
        {label}
      </Text>
      <Select value={value} onChange={onChange} options={options} />
    </div>
  );
}
