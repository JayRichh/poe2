"use client";

import { Card } from "~/components/ui/Card";
import { Text } from "~/components/ui/Text";
import { Progress } from "~/components/ui/Progress";
import type { SpeedResult } from "~/types/speed-calc";

interface SpeedResultsProps {
  result: SpeedResult;
  dexterity: number;
  onDexterityChange: (value: number) => void;
  isDualWielding: boolean;
}

function formatFrames(frames: number): string {
  const seconds = frames / 30;
  return `${frames.toFixed(1)}f (${seconds.toFixed(2)}s)`;
}

export function SpeedResults({ result, dexterity, onDexterityChange, isDualWielding }: SpeedResultsProps) {
  const maxDuration = Math.max(
    result.mainhand.attack + (result.mainhand.recovery || 0) + (result.mainhand.reload || 0),
    isDualWielding && result.offhand
      ? result.offhand.attack + (result.offhand.recovery || 0) + (result.offhand.reload || 0)
      : 0
  );

  return (
    <div className="space-y-6">
      {/* Dexterity Slider */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Text variant="body">Dexterity</Text>
          <Text variant="body" className="text-primary">{dexterity}</Text>
        </div>
        <input
          type="range"
          min={2}
          max={43}
          value={dexterity}
          onChange={(e) => onDexterityChange(Number(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Mainhand Results */}
      <Card className="p-4">
        <Text variant="h4" className="mb-4">Mainhand</Text>
        <div className="space-y-4">
          <Progress
            value={(result.mainhand.attack / maxDuration) * 100}
            size="md"
            variant="default"
            color="primary"
            className="bg-background/10"
          />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Text variant="body-sm" color="secondary">Attack</Text>
              <Text variant="body">{formatFrames(result.mainhand.attack)}</Text>
            </div>
            {result.mainhand.recovery && (
              <div>
                <Text variant="body-sm" color="secondary">Recovery</Text>
                <Text variant="body">{formatFrames(result.mainhand.recovery)}</Text>
              </div>
            )}
            {result.mainhand.reload && (
              <div>
                <Text variant="body-sm" color="secondary">Reload</Text>
                <Text variant="body">{formatFrames(result.mainhand.reload)}</Text>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Offhand Results */}
      {isDualWielding && result.offhand && (
        <Card className="p-4">
          <Text variant="h4" className="mb-4">Offhand</Text>
          <div className="space-y-4">
            <Progress
              value={(result.offhand.attack / maxDuration) * 100}
              size="md"
              variant="default"
              color="primary"
              className="bg-background/10"
            />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Text variant="body-sm" color="secondary">Attack</Text>
                <Text variant="body">{formatFrames(result.offhand.attack)}</Text>
              </div>
              {result.offhand.recovery && (
                <div>
                  <Text variant="body-sm" color="secondary">Recovery</Text>
                  <Text variant="body">{formatFrames(result.offhand.recovery)}</Text>
                </div>
              )}
              {result.offhand.reload && (
                <div>
                  <Text variant="body-sm" color="secondary">Reload</Text>
                  <Text variant="body">{formatFrames(result.offhand.reload)}</Text>
                </div>
              )}
            </div>
          </div>
        </Card>
      )}

      {/* Total Results */}
      <Card className="p-4">
        <div className="flex justify-between items-center mb-2">
          <Text variant="h4">Total Duration</Text>
          <Text variant="h4" color="primary">{formatFrames(result.total)}</Text>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Text variant="body-sm" color="secondary">DEX Modifier</Text>
            <Text variant="body">{(result.dexModifier * 100).toFixed(1)}%</Text>
          </div>
          <div>
            <Text variant="body-sm" color="secondary">Armor Penalty</Text>
            <Text variant="body">{(result.armorPenalty * 100).toFixed(1)}%</Text>
          </div>
        </div>
      </Card>
    </div>
  );
}
