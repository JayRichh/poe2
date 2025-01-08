"use client";

import { Card } from "~/components/ui/Card";
import { Checkbox } from "~/components/ui/Checkbox";
import { Text } from "~/components/ui/Text";

import { EFFECTS } from "~/lib/constants/speed-calc";
import type { CalculatorState } from "~/types/speed-calc";

interface EffectsListProps {
  effects: CalculatorState["effects"];
  onToggleEffect: (category: keyof CalculatorState["effects"], effectId: string) => void;
  isRanged: boolean;
}

export function EffectsList({ effects, onToggleEffect, isRanged }: EffectsListProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-8">
        {/* All Phases Effects */}
        <Card className="p-6">
          <Text variant="h4" className="mb-4">
            Affects All Phases
          </Text>
          <div className="space-y-2">
            {EFFECTS.ALL_PHASES.map((effect) => (
              <Checkbox
                key={effect.id}
                id={effect.id}
                label={effect.name}
                checked={effects.allPhases.includes(effect.id)}
                onCheckedChange={() => onToggleEffect("allPhases", effect.id)}
                disabled={effect.rangedOnly && !isRanged}
              />
            ))}
          </div>
        </Card>

        {/* Recovery and Reload Effects */}
        <Card className="p-6">
          <Text variant="h4" className="mb-4">
            Affects Recovery and Reload
          </Text>
          <div className="space-y-2">
            {EFFECTS.RECOVERY_AND_RELOAD.map((effect) => (
              <Checkbox
                key={effect.id}
                id={effect.id}
                label={effect.name}
                checked={effects.recoveryAndReload.includes(effect.id)}
                onCheckedChange={() => onToggleEffect("recoveryAndReload", effect.id)}
                disabled={effect.rangedOnly && !isRanged}
              />
            ))}
          </div>
        </Card>
      </div>

      <div className="space-y-8">
        {/* Reload Effects */}
        <Card className="p-6">
          <Text variant="h4" className="mb-4">
            Affects Reload
          </Text>
          <div className="space-y-3">
            {EFFECTS.RELOAD.map((effect) => (
              <Checkbox
                key={effect.id}
                id={effect.id}
                label={effect.name}
                checked={effects.reload.includes(effect.id)}
                onCheckedChange={() => onToggleEffect("reload", effect.id)}
                disabled={effect.rangedOnly && !isRanged}
              />
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
