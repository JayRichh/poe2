import { Text } from "@/components/ui/Text";
import { Slider } from "@/components/ui/Slider";
import { TabGroup } from "@/components/ui/TabGroup";

export interface WeaponInputs {
  minBaseDmg: number;
  maxBaseDmg: number;
  physicalMin: number;
  physicalMax: number;
  lightningMin: number;
  lightningMax: number;
  fireMin: number;
  fireMax: number;
  coldMin: number;
  coldMax: number;
  chaosMin: number;
  chaosMax: number;
}

interface WeaponFormProps {
  weapon: WeaponInputs;
  onChange: (updates: Partial<WeaponInputs>) => void;
  label: string;
}

export function WeaponForm({ weapon, onChange, label }: WeaponFormProps) {
  return (
    <div className="space-y-4">
      <Text className="text-xl font-semibold mb-4">{label}</Text>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Text>Base Damage Min</Text>
          <Slider
            min={0}
            max={100}
            value={weapon.minBaseDmg}
            onChange={(value: number) => onChange({ minBaseDmg: value })}
          />
        </div>
        <div>
          <Text>Base Damage Max</Text>
          <Slider
            min={0}
            max={100}
            value={weapon.maxBaseDmg}
            onChange={(value: number) => onChange({ maxBaseDmg: value })}
          />
        </div>
      </div>

      <TabGroup
        tabs={[
          {
            id: "physical",
            label: "Physical",
            content: (
              <div className="grid grid-cols-2 gap-4 p-4">
                <div>
                  <Text>Min</Text>
                  <Slider
                    min={0}
                    max={100}
                    value={weapon.physicalMin}
                    onChange={(value: number) => onChange({ physicalMin: value })}
                  />
                </div>
                <div>
                  <Text>Max</Text>
                  <Slider
                    min={0}
                    max={100}
                    value={weapon.physicalMax}
                    onChange={(value: number) => onChange({ physicalMax: value })}
                  />
                </div>
              </div>
            ),
          },
          {
            id: "lightning",
            label: "Lightning",
            content: (
              <div className="grid grid-cols-2 gap-4 p-4">
                <div>
                  <Text>Min</Text>
                  <Slider
                    min={0}
                    max={100}
                    value={weapon.lightningMin}
                    onChange={(value: number) => onChange({ lightningMin: value })}
                  />
                </div>
                <div>
                  <Text>Max</Text>
                  <Slider
                    min={0}
                    max={100}
                    value={weapon.lightningMax}
                    onChange={(value: number) => onChange({ lightningMax: value })}
                  />
                </div>
              </div>
            ),
          },
          {
            id: "fire",
            label: "Fire",
            content: (
              <div className="grid grid-cols-2 gap-4 p-4">
                <div>
                  <Text>Min</Text>
                  <Slider
                    min={0}
                    max={100}
                    value={weapon.fireMin}
                    onChange={(value: number) => onChange({ fireMin: value })}
                  />
                </div>
                <div>
                  <Text>Max</Text>
                  <Slider
                    min={0}
                    max={100}
                    value={weapon.fireMax}
                    onChange={(value: number) => onChange({ fireMax: value })}
                  />
                </div>
              </div>
            ),
          },
          {
            id: "cold",
            label: "Cold",
            content: (
              <div className="grid grid-cols-2 gap-4 p-4">
                <div>
                  <Text>Min</Text>
                  <Slider
                    min={0}
                    max={100}
                    value={weapon.coldMin}
                    onChange={(value: number) => onChange({ coldMin: value })}
                  />
                </div>
                <div>
                  <Text>Max</Text>
                  <Slider
                    min={0}
                    max={100}
                    value={weapon.coldMax}
                    onChange={(value: number) => onChange({ coldMax: value })}
                  />
                </div>
              </div>
            ),
          },
          {
            id: "chaos",
            label: "Chaos",
            content: (
              <div className="grid grid-cols-2 gap-4 p-4">
                <div>
                  <Text>Min</Text>
                  <Slider
                    min={0}
                    max={100}
                    value={weapon.chaosMin}
                    onChange={(value: number) => onChange({ chaosMin: value })}
                  />
                </div>
                <div>
                  <Text>Max</Text>
                  <Slider
                    min={0}
                    max={100}
                    value={weapon.chaosMax}
                    onChange={(value: number) => onChange({ chaosMax: value })}
                  />
                </div>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}