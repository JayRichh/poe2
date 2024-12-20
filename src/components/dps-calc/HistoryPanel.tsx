"use client";

import { Card } from "~/components/ui/Card";
import { Text } from "~/components/ui/Text";

import type { DPSState } from "~/hooks/useDPSCalculator";

interface HistoryPanelProps {
  history: DPSState[];
}

export function HistoryPanel({ history }: HistoryPanelProps) {
  if (!history.length) return null;

  return (
    <Card className="overflow-hidden h-full">
      <div className="px-4 py-3 border-b border-border/60">
        <Text className="text-lg font-semibold tracking-tight">History</Text>
      </div>

      <div className="max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-background-secondary">
        <div className="p-4 space-y-2">
          {history
            .slice()
            .reverse()
            .map((entry, index) => {
              if (!entry.results) return null;

              return (
                <div
                  key={index}
                  className="flex flex-col gap-2 p-3 rounded-lg bg-background-secondary/50 hover:bg-background-secondary/70 transition-colors"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <Text className="text-sm font-medium tabular-nums truncate">
                        {Math.round(entry.results.totalDpsWeapon1).toLocaleString()}
                      </Text>
                      <Text className="text-sm text-foreground-secondary">→</Text>
                      <Text className="text-sm font-medium tabular-nums truncate">
                        {Math.round(entry.results.totalDpsWeapon2).toLocaleString()}
                      </Text>
                    </div>
                    <Text
                      className={`text-sm font-semibold tabular-nums whitespace-nowrap ${
                        entry.results.dpsIncrease >= 0 ? "text-success" : "text-error"
                      }`}
                    >
                      {entry.results.dpsIncrease >= 0 ? "+" : ""}
                      {(entry.results.dpsIncrease * 100).toFixed(1)}%
                    </Text>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <Text className="text-xs text-foreground-secondary">APS:</Text>
                      <Text className="text-xs font-medium tabular-nums">
                        {entry.settings.attackSpeed.toFixed(1)}
                      </Text>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Text className="text-xs text-foreground-secondary">Crit:</Text>
                      <Text className="text-xs font-medium tabular-nums">
                        {entry.settings.critChance}%
                      </Text>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </Card>
  );
}
