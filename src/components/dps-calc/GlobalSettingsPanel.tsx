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
  key: keyof GlobalSettings | `supportGems.${keyof GlobalSettings['supportGems']}`;
  label: string;
  tooltip: string;
}

// Ensure numeric values are valid and within bounds
const sanitizeNumber = (value: number, min: number, max: number, step = 1): number => {
  if (typeof value !== "number" || isNaN(value)) return min;
  return Math.min(Math.max(Math.round(value / step) * step, min), max);
};

export function GlobalSettingsPanel({ settings, onChange }: GlobalSettingsPanelProps) {
  const handleSupportGemChange = (gemName: keyof GlobalSettings['supportGems'], checked: boolean) => {
    onChange({
      supportGems: {
        ...settings.supportGems,
        [gemName]: checked,
      },
    });
  };
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

  const handleToggleChange = (key: ToggleSetting['key'], checked: boolean) => {
    if (key.startsWith('supportGems.')) {
      const gemName = key.split('.')[1] as keyof GlobalSettings['supportGems'];
      handleSupportGemChange(gemName, checked);
    } else {
      const settingKey = key as keyof GlobalSettings;
      if (checked !== settings[settingKey]) {
        onChange({ [settingKey]: checked });
      }
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
      min: 0.8,
      max: 3.0,
      step: 0.05,
      tooltip: "Base attacks per second (typical range 0.8-3.0)",
      formatValue: (value) => `${value.toFixed(2)} APS`,
    },
    {
      key: "attackSpeedIncrease",
      label: "Attack Speed Increase",
      min: 0,
      max: 150,
      step: 5,
      tooltip: "Increased attack speed from all sources (0-150%)",
      formatValue: (value) => `${value}%`,
    },
    {
      key: "totalSkillProjectiles",
      label: "Skill Projectiles",
      min: 1,
      max: 8,
      step: 1,
      tooltip: "Total number of projectiles per attack (1-8)",
    },
  ];

  const critSettings: NumericSetting[] = [
    {
      key: "critChance",
      label: "Crit Chance",
      min: 5,
      max: 95,
      step: 5,
      tooltip: "Chance to deal critical strikes (5-95%)",
      formatValue: (value) => `${value}%`,
    },
    {
      key: "critDamage",
      label: "Crit Multiplier",
      min: 150,
      max: 600,
      step: 10,
      tooltip: "Critical strike damage multiplier (150-600%)",
      formatValue: (value) => `${value}%`,
    },
    {
      key: "resPenetration",
      label: "Resistance Penetration",
      min: 0,
      max: 75,
      step: 5,
      tooltip: "Enemy resistance reduction (0-75%)",
      formatValue: (value) => `${value}%`,
    },
  ];

const supportGemSettings: ToggleSetting[] = [
    { 
      key: "supportGems.martialTempo", 
      label: "Martial Tempo", 
      tooltip: "Increases attack speed and damage" 
    },
    {
      key: "supportGems.primalArmament",
      label: "Primal Armament",
      tooltip: "20% more physical damage",
    },
    {
      key: "supportGems.lightningInfusion",
      label: "Lightning Infusion",
      tooltip: "20% more lightning damage",
    },
    {
      key: "supportGems.iceBite",
      label: "Ice Bite",
      tooltip: "20% more cold damage",
    },
  ];

  const statusSettings: ToggleSetting[] = [
    { key: "shock", label: "Shock", tooltip: "Enemy takes increased damage" },
    {
      key: "electrocution",
      label: "Electrocution",
      tooltip: "Increased damage to shocked enemies",
    },
    { key: "exposure", label: "Exposure", tooltip: "Reduces enemy resistances" },
  ];

  const damageSettings: NumericSetting[] = [
    {
      key: "bowDamage",
      label: "Bow Damage",
      min: 0,
      max: 100,
      tooltip: "Increased bow damage",
      formatValue: (value) => `${value}%`,
    },
  ];

  const statusEffectSettings: NumericSetting[] = [
    {
      key: "shockMagnitude",
      label: "Shock Magnitude",
      min: 15,
      max: 50,
      step: 5,
      tooltip: "Shock effect magnitude (15-50%)",
      formatValue: (value) => `${value}%`,
    },
    {
      key: "shockDuration",
      label: "Shock Duration",
      min: 20,
      max: 200,
      step: 10,
      tooltip: "Shock effect duration (20-200%)",
      formatValue: (value) => `${value}%`,
    },
    {
      key: "electrocutionDuration",
      label: "Electrocution Duration",
      min: 20,
      max: 100,
      step: 5,
      tooltip: "Electrocution effect duration (20-100%)",
      formatValue: (value) => `${value}%`,
    },
    {
      key: "exposureMagnitude",
      label: "Exposure Magnitude",
      min: 10,
      max: 40,
      step: 5,
      tooltip: "Exposure effect magnitude (10-40%)",
      formatValue: (value) => `${value}%`,
    },
    {
      key: "exposureDuration",
      label: "Exposure Duration",
      min: 50,
      max: 200,
      step: 10,
      tooltip: "Exposure effect duration (50-200%)",
      formatValue: (value) => `${value}%`,
    },
  ];

  return (
    <Card>
      <div className="px-4 py-3 border-b border-border/60">
        <Text className="text-lg font-semibold tracking-tight">Global Settings</Text>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-x divide-border/60">
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

        <div key="damage" className="px-4 py-4">
          <Text className="text-sm font-medium text-foreground-secondary mb-6">
            Damage Modifiers
          </Text>
          <div className="space-y-6">
            {damageSettings.map((setting) => renderNumericSetting(setting))}
          </div>
        </div>

        <div key="support" className="px-4 py-4">
          <Text className="text-sm font-medium text-foreground-secondary mb-6">
            Support Gems
          </Text>
          <div className="grid grid-cols-1 gap-2">
            {supportGemSettings.map(({ key, label, tooltip }) => (
              <Tooltip key={key} content={tooltip}>
                <label className="flex items-center gap-2 cursor-pointer py-1.5 px-2.5 rounded-md hover:bg-background-secondary transition-colors">
                  <input
                    type="checkbox"
                    checked={key.startsWith("supportGems.") 
                      ? !!settings.supportGems[key.split(".")[1] as keyof typeof settings.supportGems]
                      : !!settings[key as keyof typeof settings]}
                    onChange={(e) => {
                      if (key.startsWith("supportGems.")) {
                        const gemName = key.split(".")[1] as keyof typeof settings.supportGems;
                        handleToggleChange(`supportGems.${gemName}`, e.target.checked);
                      } else {
                        handleToggleChange(key as keyof typeof settings, e.target.checked);
                      }
                    }}
                    className="h-4 w-4 rounded border-border bg-background checked:bg-primary checked:border-primary focus:ring-2 focus:ring-primary/25 transition-colors"
                  />
                  <Text className="text-sm font-medium truncate flex-grow">{label}</Text>
                </label>
              </Tooltip>
            ))}
          </div>
        </div>

        <div key="status" className="px-4 py-4">
          <Text className="text-sm font-medium text-foreground-secondary mb-6">
            Status Effects
          </Text>
          <div className="grid grid-cols-1 gap-2">
            {statusSettings.map(({ key, label, tooltip }) => (
              <Tooltip key={key} content={tooltip}>
                <label className="flex items-center gap-2 cursor-pointer py-1.5 px-2.5 rounded-md hover:bg-background-secondary transition-colors">
                  <input
                    type="checkbox"
                    checked={!!settings[key as keyof typeof settings]}
                    onChange={(e) => handleToggleChange(key as keyof typeof settings, e.target.checked)}
                    className="h-4 w-4 rounded border-border bg-background checked:bg-primary checked:border-primary focus:ring-2 focus:ring-primary/25 transition-colors"
                  />
                  <Text className="text-sm font-medium truncate flex-grow">{label}</Text>
                </label>
              </Tooltip>
            ))}
          </div>
          <div className="mt-4 space-y-6">
            {statusEffectSettings.map((setting) => renderNumericSetting(setting))}
          </div>
        </div>
      </div>
    </Card>
  );
}
