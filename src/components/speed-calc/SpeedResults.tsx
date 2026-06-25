"use client";

import { Card } from "~/components/ui/Card";
import { Text } from "~/components/ui/Text";

import type { ActionSpeedResult, MovementSpeedResult } from "~/lib/speed";

interface MovementResultsProps {
  movement: MovementSpeedResult;
}

const fmtPct = (factor: number) => `${(factor * 100).toFixed(1)}%`;
const fmtSigned = (percent: number) => `${percent >= 0 ? "+" : ""}${percent}%`;

export function MovementResults({ movement }: MovementResultsProps) {
  return (
    <Card className="p-5 space-y-4">
      <div className="flex items-center justify-between">
        <Text variant="h4">Effective movement speed</Text>
        <Text variant="h4" color="primary" className="tabular-nums">
          {fmtPct(movement.effectiveMultiplier)}
        </Text>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Text variant="body-sm" color="secondary">
            Sum of increased/reduced
          </Text>
          <Text variant="body" className="tabular-nums">
            {fmtSigned(movement.sumIncreasedPercent)}
          </Text>
        </div>
        <div>
          <Text variant="body-sm" color="secondary">
            Effective run speed
          </Text>
          <Text variant="body" className="tabular-nums">
            {movement.effectiveRunSpeed.toFixed(1)}
            <span className="text-muted-foreground"> / {movement.baseRunSpeed} base</span>
          </Text>
        </div>
      </div>

      {movement.breakdown.length > 0 && (
        <div className="space-y-1 border-t border-border/40 pt-3">
          <Text variant="body-sm" color="secondary">
            Additive bucket — base × (1 + Σ%)
          </Text>
          {movement.breakdown.map((m, i) => (
            <div key={i} className="flex items-center justify-between text-sm">
              <span className="truncate text-foreground/80">{m.label}</span>
              <span
                className={`tabular-nums ${m.percent < 0 ? "text-error" : "text-foreground/70"}`}
              >
                {fmtSigned(m.percent)}
              </span>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

interface ActionResultsProps {
  action: ActionSpeedResult;
  actionLabel: "attack" | "cast";
}

export function ActionResults({ action, actionLabel }: ActionResultsProps) {
  const noun = actionLabel === "cast" ? "cast" : "attack";
  return (
    <Card className="p-5 space-y-4">
      <div className="flex items-center justify-between">
        <Text variant="h4">Effective {noun} speed</Text>
        <Text variant="h4" color="primary" className="tabular-nums">
          {action.effectiveAps.toFixed(2)} APS
        </Text>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Text variant="body-sm" color="secondary">
            Time per {noun}
          </Text>
          <Text variant="body" className="tabular-nums">
            {Number.isFinite(action.timePerAction) ? `${action.timePerAction.toFixed(3)}s` : "—"}
          </Text>
        </div>
        <div>
          <Text variant="body-sm" color="secondary">
            Increased bucket
          </Text>
          <Text variant="body" className="tabular-nums">
            {fmtSigned(action.sumIncreasedPercent)} → ×{action.increasedFactor.toFixed(2)}
          </Text>
        </div>
      </div>

      <div className="border-t border-border/40 pt-3">
        <Text variant="body-sm" color="secondary">
          base {action.baseAps} APS × (1 + Σ increased%)
          {action.moreFactor !== 1 ? ` × ${action.moreFactor.toFixed(2)} more` : ""}
        </Text>
      </div>
    </Card>
  );
}
