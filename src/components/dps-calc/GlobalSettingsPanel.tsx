"use client";

import { Card } from "~/components/ui/Card";
import { Slider } from "~/components/ui/Slider";
import { Text } from "~/components/ui/Text";
import { Tooltip } from "~/components/ui/Tooltip";

import type { GlobalSettings } from "~/hooks/useDPSCalculator";

interface GlobalSettingsPanelProps {
  settings: GlobalSettings;
  onChange: (updates: Partial<GlobalSettings>) => void;
}

interface NumericSetting {
  key: keyof GlobalSettings;
  label: string;
  min: number;
  max: number;
  step?: number;
  tooltip: string;
  formatValue?: (value: number) => string;
}

interface ToggleSetting {
  key: keyof GlobalSettings;
  label: string;
  tooltip: string;
}

// Ensure numeric values are valid and within bounds
const sanitizeNumber = (value: number, min: number, max: number, step = 1): number => {
  if (typeof value !== "number" || isNaN(value)) return min;
  return Math.min(Math.max(Math.round(value / step) * step, min), max);
};

export function GlobalSettingsPanel({ settings, onChange }: GlobalSettingsPanelProps) {
  const handleSliderChange = (
    key: keyof GlobalSettings,
    value: number,
    min: number,
    max: number,
    step = 1
  ) => {
    const sanitizedValue = sanitizeNumber(value, min, max, step);
    if (sanitizedValue !== settings[key]) {
      onChange({ [key]: sanitizedValue });
    }
  };

  const handleToggleChange = (key: keyof GlobalSettings, checked: boolean) => {
    if (checked !== settings[key]) {
      onChange({ [key]: checked });
    }
  };

  const renderNumericSetting = ({
    key,
    label,
    min,
    max,
    step = 1,
    tooltip,
    formatValue,
  }: NumericSetting) => {
    const currentValue = sanitizeNumber(settings[key] as number, min, max, step);
    const displayValue = formatValue ? formatValue(currentValue) : currentValue.toString();

    return (
      <Tooltip key={key} content={tooltip}>
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <Text className="text-sm font-medium">{label}</Text>
            <Text className="text-sm font-medium text-foreground/70">{displayValue}</Text>
          </div>
          <Slider
            min={min}
            max={max}
            step={step}
            value={currentValue}
            onChange={(value: number) => handleSliderChange(key, value, min, max, step)}
          />
        </div>
      </Tooltip>
    );
  };

  const attackSettings: NumericSetting[] = [
    {
      key: "attackSpeed",
      label: "Attack Speed",
      min: 0.1,
      max: 5,
      step: 0.1,
      tooltip: "Base attacks per second",
      formatValue: (value) => `${value.toFixed(2)} APS`,
    },
    {
      key: "attackSpeedIncrease",
      label: "Attack Speed Increase",
      min: 0,
      max: 200,
      tooltip: "Increased attack speed from all sources",
      formatValue: (value) => `${value}%`,
    },
    {
      key: "totalSkillProjectiles",
      label: "Skill Projectiles",
      min: 1,
      max: 10,
      step: 1,
      tooltip: "Total number of projectiles per attack",
    },
  ];

  const critSettings: NumericSetting[] = [
    {
      key: "critChance",
      label: "Crit Chance",
      min: 0,
      max: 100,
      tooltip: "Chance to deal critical strikes",
      formatValue: (value) => `${value}%`,
    },
    {
      key: "critDamage",
      label: "Crit Multiplier",
      min: 100,
      max: 500,
      tooltip: "Critical strike damage multiplier",
      formatValue: (value) => `${value}%`,
    },
    {
      key: "resPenetration",
      label: "Resistance Penetration",
      min: 0,
      max: 100,
      tooltip: "Enemy resistance reduction",
      formatValue: (value) => `${value}%`,
    },
  ];

  const toggleSettings: ToggleSetting[] = [
    { key: "shock", label: "Shock", tooltip: "Enemy takes 50% increased damage" },
    {
      key: "electrocution",
      label: "Electrocution",
      tooltip: "25% increased damage to shocked enemies",
    },
    { key: "exposure", label: "Exposure", tooltip: "-25% to enemy resistances" },
    { key: "lightningInfusion", label: "Lightning Infusion", tooltip: "20% more lightning damage" },
    { key: "primalArmament", label: "Primal Armament", tooltip: "20% more physical damage" },
    { key: "iceBite", label: "Ice Bite", tooltip: "20% more cold damage" },
  ];

  return (
    <Card>
      <div className="px-4 py-3 border-b border-border/60">
        <Text className="text-lg font-semibold tracking-tight">Global Settings</Text>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-x divide-border/60">
        <div key="attack" className="px-4 py-4">
          <Text className="text-sm font-medium text-foreground-secondary mb-6">
            Attack Settings
          </Text>
          <div className="space-y-6">
            {attackSettings.map((setting) => renderNumericSetting(setting))}
          </div>
        </div>

        <div key="crit" className="px-4 py-4">
          <Text className="text-sm font-medium text-foreground-secondary mb-6">
            Critical Strike
          </Text>
          <div className="space-y-6">
            {critSettings.map((setting) => renderNumericSetting(setting))}
          </div>
        </div>

        <div key="status" className="px-4 py-4">
          <Text className="text-sm font-medium text-foreground-secondary mb-6">Status Effects</Text>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {toggleSettings.map(({ key, label, tooltip }) => (
              <Tooltip key={key} content={tooltip}>
                <label className="flex items-center gap-2 cursor-pointer py-1.5 px-2.5 rounded-md hover:bg-background-secondary transition-colors">
                  <input
                    type="checkbox"
                    checked={!!settings[key]}
                    onChange={(e) => handleToggleChange(key, e.target.checked)}
                    className="h-4 w-4 rounded border-border bg-background checked:bg-primary checked:border-primary focus:ring-2 focus:ring-primary/25 transition-colors"
                  />
                  <Text className="text-sm font-medium truncate flex-grow">{label}</Text>
                </label>
              </Tooltip>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
