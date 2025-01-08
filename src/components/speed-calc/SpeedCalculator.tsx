"use client";

import { ArmorSelect } from "~/components/speed-calc/ArmorSelect";
import { EffectsList } from "~/components/speed-calc/EffectsList";
import { SpeedResults } from "~/components/speed-calc/SpeedResults";
import { WeaponSelect } from "~/components/speed-calc/WeaponSelect";
import { Card } from "~/components/ui/Card";
import { Text } from "~/components/ui/Text";

import { useSpeedCalculator } from "~/hooks/useSpeedCalculator";

import type { CalculatorState } from "~/types/speed-calc";

export function SpeedCalculator() {
  const { state, result, updateState, toggleEffect, isDualWielding, isTwoHanded } =
    useSpeedCalculator();

  return (
    <div className="space-y-8">
      {/* Equipment Section */}
      <Card className="p-6">
        <Text variant="h3" className="mb-6">
          Equipment
        </Text>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Weapons */}
          <div className="space-y-4">
            <WeaponSelect
              label="Mainhand Weapon"
              value={state.mainhand}
              onChange={(value: string) => updateState({ mainhand: value })}
              disabledCategories={isTwoHanded ? ["One-Handed Melee", "One-Handed Ranged"] : []}
            />
            {!isTwoHanded && (
              <WeaponSelect
                label="Offhand"
                value={state.offhand}
                onChange={(value: string) => updateState({ offhand: value })}
                disabledCategories={["Two-Handed Melee", "Two-Handed Ranged"]}
              />
            )}
          </div>

          {/* Armor */}
          <ArmorSelect
            value={state.armor}
            onChange={(value: string) => updateState({ armor: value })}
            modifiers={state.armorModifiers}
            onModifierChange={(key: keyof CalculatorState["armorModifiers"], value: boolean) =>
              updateState({
                armorModifiers: { ...state.armorModifiers, [key]: value },
              })
            }
          />
        </div>
      </Card>

      {/* Effects Section */}
      <Card className="p-6">
        <Text variant="h3" className="mb-6">
          Buffs & Effects
        </Text>
        <div className="space-y-6">
          {/* Athletics Slider */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Text variant="h4">Athletics</Text>
              <Text variant="body" className="text-primary">
                {state.athletics}
              </Text>
            </div>
            <input
              type="range"
              min={0}
              max={50}
              value={state.athletics}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                updateState({ athletics: Number(e.target.value) })
              }
              className="w-full"
            />
          </div>

          {/* Effects List */}
          <EffectsList
            effects={state.effects}
            onToggleEffect={toggleEffect}
            isRanged={result.mainhand.reload !== undefined}
          />
        </div>
      </Card>

      {/* Results Section */}
      <Card className="p-6">
        <Text variant="h3" className="mb-6">
          Results
        </Text>
        <SpeedResults
          result={result}
          dexterity={state.dexterity}
          onDexterityChange={(value: number) => updateState({ dexterity: value })}
          isDualWielding={isDualWielding}
        />
      </Card>
    </div>
  );
}
