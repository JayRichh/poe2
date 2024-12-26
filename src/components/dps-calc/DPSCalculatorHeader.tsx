"use client";

import { RotateCcw, Save, Share2 } from "lucide-react";
import { Button } from "~/components/ui/Button";
import { Card } from "~/components/ui/Card";
import { Select } from "~/components/ui/Select";
import { Text } from "~/components/ui/Text";
import { Tooltip } from "~/components/ui/Tooltip";

const TEST_CASES = [
  { value: "noob", label: "Early Game (1-20): Physical vs Lightning Split" },
  { value: "mid", label: "Mid Game (40-60): Physical vs Elemental Mix" },
  { value: "max", label: "End Game (80+): Pure vs Hybrid Damage" },
  { value: "physical", label: "Physical Compare: High vs Pure Physical" },
  { value: "elemental", label: "Elemental Compare: Lightning vs Mixed" },
  { value: "hybrid", label: "Full Build Compare: Balanced vs Elemental" },
] as const;

interface DPSCalculatorHeaderProps {
  onLoadTestCase: (testCase: string) => void;
  onReset: () => void;
}

export function DPSCalculatorHeader({ onLoadTestCase, onReset }: DPSCalculatorHeaderProps) {
  return (
    <Card className="mb-6">
      <div className="px-4 py-3 border-b border-border/60">
        <div className="flex items-center justify-between">
          <Text className="text-lg font-semibold tracking-tight">Calculator Controls</Text>
          <div className="flex items-center gap-2">
            <Tooltip content="Coming soon">
              <Button variant="outline" size="sm" disabled>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </Tooltip>
            <Tooltip content="Coming soon">
              <Button variant="outline" size="sm" disabled>
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
            </Tooltip>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex flex-wrap items-center gap-4">
          {/* Test Cases */}
          <div className="w-64">
            <span className="sr-only" id="test-case-label">
              Load test case
            </span>
            <Select
              value=""
              onChange={(value) => onLoadTestCase(value)}
              options={[
                { value: "", label: "Load Weapon Comparison..." },
                ...TEST_CASES.map((tc) => ({ value: tc.value, label: tc.label })),
              ]}
              className="w-full"
              aria-labelledby="test-case-label"
            />
          </div>

          {/* Reset Button */}
          <Button
            variant="outline"
            size="md"
            onClick={onReset}
            className="flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Reset All
          </Button>

          {/* Status Badges */}
          <div className="flex items-center gap-2 ml-auto">
            <span className="px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded-full">
              Manual Mode
            </span>
            <span className="px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded-full relative group">
              <span>Import from Game</span>
              <span className="absolute -top-2 -right-2 px-1.5 py-0.5 text-[10px] font-medium bg-primary text-primary-foreground rounded-full">
                Soon
              </span>
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
