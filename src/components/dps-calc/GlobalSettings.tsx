import { Text } from "@/components/ui/Text";
import { Slider } from "@/components/ui/Slider";

export interface GlobalSettingsInputs {
  attackSpeed: number;
  attackSpeedIncrease: number;
  totalSkillProjectiles: number;
  damageMultiplier: number;
  critChance: number;
  critDamage: number;
  resPenetration: number;
  shock: boolean;
  electrocution: boolean;
  exposure: boolean;
  lightningInfusion: boolean;
  primalArmament: boolean;
  iceBite: boolean;
}

interface GlobalSettingsProps {
  settings: GlobalSettingsInputs;
  onChange: (updates: Partial<GlobalSettingsInputs>) => void;
}

export function GlobalSettings({ settings, onChange }: GlobalSettingsProps) {
  return (
    <div className="space-y-6">
      <Text className="text-xl font-semibold mb-4">Global Settings</Text>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Text>Attack Speed</Text>
          <Slider
            min={0.1}
            max={5}
            step={0.1}
            value={settings.attackSpeed}
            onChange={(value: number) => onChange({ attackSpeed: value })}
          />
        </div>
        <div>
          <Text>Attack Speed Increase</Text>
          <Slider
            min={0}
            max={200}
            value={settings.attackSpeedIncrease}
            onChange={(value: number) => onChange({ attackSpeedIncrease: value })}
          />
        </div>
        <div>
          <Text>Total Skill Projectiles</Text>
          <Slider
            min={1}
            max={10}
            step={1}
            value={settings.totalSkillProjectiles}
            onChange={(value: number) => onChange({ totalSkillProjectiles: value })}
          />
        </div>
        <div>
          <Text>Damage Multiplier</Text>
          <Slider
            min={1}
            max={5}
            step={0.1}
            value={settings.damageMultiplier}
            onChange={(value: number) => onChange({ damageMultiplier: value })}
          />
        </div>
        <div>
          <Text>Crit Chance</Text>
          <Slider
            min={0}
            max={100}
            value={settings.critChance}
            onChange={(value: number) => onChange({ critChance: value })}
          />
        </div>
        <div>
          <Text>Crit Damage</Text>
          <Slider
            min={100}
            max={500}
            value={settings.critDamage}
            onChange={(value: number) => onChange({ critDamage: value })}
          />
        </div>
        <div>
          <Text>Resistance Penetration</Text>
          <Slider
            min={0}
            max={100}
            value={settings.resPenetration}
            onChange={(value: number) => onChange({ resPenetration: value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { label: "Shock", key: "shock" },
          { label: "Electrocution", key: "electrocution" },
          { label: "Exposure", key: "exposure" },
          { label: "Lightning Infusion", key: "lightningInfusion" },
          { label: "Primal Armament", key: "primalArmament" },
          { label: "Ice Bite", key: "iceBite" },
        ].map(({ label, key }) => (
          <div key={key} className="flex items-center gap-2">
            <input
              type="checkbox"
              id={key}
              checked={settings[key as keyof GlobalSettingsInputs] as boolean}
              onChange={(e) => onChange({ [key]: e.target.checked })}
              className="w-4 h-4"
            />
            <label htmlFor={key}>{label}</label>
          </div>
        ))}
      </div>
    </div>
  );
}