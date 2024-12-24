"use client";

import { useState } from "react";

import { BuildPlannerLayout } from "~/components/build-planner/BuildPlannerLayout";
import { Button } from "~/components/ui/Button";
import { Container } from "~/components/ui/Container";
import { Select } from "~/components/ui/Select";
import { Text } from "~/components/ui/Text";

const STAT_GROUPS = [
  {
    name: "Core Attributes",
    stats: [
      { name: "Strength", value: 0, bonus: 0 },
      { name: "Dexterity", value: 0, bonus: 0 },
      { name: "Intelligence", value: 0, bonus: 0 },
    ],
  },
  {
    name: "Defenses",
    stats: [
      { name: "Life", value: 0, bonus: 0 },
      { name: "Mana", value: 0, bonus: 0 },
      { name: "Energy Shield", value: 0, bonus: 0 },
      { name: "Armour", value: 0, bonus: 0 },
      { name: "Evasion", value: 0, bonus: 0 },
    ],
  },
  {
    name: "Offense",
    stats: [
      { name: "Physical DPS", value: 0, bonus: 0 },
      { name: "Elemental DPS", value: 0, bonus: 0 },
      { name: "Critical Strike Chance", value: 0, bonus: 0 },
      { name: "Critical Strike Multiplier", value: 0, bonus: 0 },
      { name: "Attack Speed", value: 0, bonus: 0 },
      { name: "Cast Speed", value: 0, bonus: 0 },
    ],
  },
  {
    name: "Resistances",
    stats: [
      { name: "Fire Resistance", value: 0, bonus: 0 },
      { name: "Cold Resistance", value: 0, bonus: 0 },
      { name: "Lightning Resistance", value: 0, bonus: 0 },
      { name: "Chaos Resistance", value: 0, bonus: 0 },
    ],
  },
] as const;

interface StatAllocation {
  value: number;
  points: number;
}

export default function StatsPage() {
  const [isCalculating, setIsCalculating] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState("");
  const [selectedWeapon, setSelectedWeapon] = useState("");
  const [allocation, setAllocation] = useState<Record<string, StatAllocation>>({
    Strength: { value: 0, points: 0 },
    Dexterity: { value: 0, points: 0 },
    Intelligence: { value: 0, points: 0 },
  });

  const handleAllocation = (stat: string, change: number) => {
    if (change > 0 && availablePoints <= 0) return;

    setAllocation((prev) => ({
      ...prev,
      [stat]: {
        value: prev[stat].value + change * 5,
        points: prev[stat].points + change,
      },
    }));
    setIsCalculating(true);
    // Simulate calculation delay
    setTimeout(() => setIsCalculating(false), 300);
  };

  const availablePoints =
    123 - Object.values(allocation).reduce((sum, stat) => sum + stat.points, 0);

  return (
    <BuildPlannerLayout
      title="Character Stats"
      description="View and analyze your character's statistics"
      actions={
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setAllocation({
                Strength: { value: 0, points: 0 },
                Dexterity: { value: 0, points: 0 },
                Intelligence: { value: 0, points: 0 },
              });
              setIsCalculating(true);
              setTimeout(() => setIsCalculating(false), 300);
            }}
          >
            Reset
          </Button>
          <Button variant="primary" size="sm">
            Save
          </Button>
        </div>
      }
      sidebar={
        <div className="p-4 space-y-4">
          <Text className="font-medium">Stat Allocation</Text>
          <div className="space-y-4">
            {Object.entries(allocation).map(([stat, data]) => (
              <div key={stat} className="space-y-2">
                <div className="flex items-center justify-between">
                  <Text className="text-sm">{stat}</Text>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleAllocation(stat, -1)}
                      disabled={data.points <= 0}
                      className="w-6 h-6 rounded flex items-center justify-center hover:bg-muted/50 disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label={`Decrease ${stat}`}
                    >
                      -
                    </button>
                    <Text className="text-sm w-12 text-center">{data.value}</Text>
                    <button
                      onClick={() => handleAllocation(stat, 1)}
                      disabled={availablePoints <= 0}
                      className="w-6 h-6 rounded flex items-center justify-center hover:bg-muted/50 disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label={`Increase ${stat}`}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${(data.value / 500) * 100}%` }}
                    role="progressbar"
                    aria-valuenow={data.value}
                    aria-valuemin={0}
                    aria-valuemax={500}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-border/50 my-4" />

          <div className="space-y-4">
            <Text className="font-medium">Available Points</Text>
            <div className="grid grid-cols-2 gap-4">
              <div
                className={`p-3 rounded-lg border transition-colors ${
                  availablePoints > 0 ? "border-primary/50 bg-primary/5" : "border-border/50"
                }`}
              >
                <Text className="text-sm text-foreground/60">Passive Points</Text>
                <Text className="text-2xl font-bold">{availablePoints}</Text>
              </div>
              <div className="p-3 rounded-lg border border-border/50">
                <Text className="text-sm text-foreground/60">Ascendancy Points</Text>
                <Text className="text-2xl font-bold">0</Text>
              </div>
            </div>
          </div>
        </div>
      }
    >
      <div className="grid sm:grid-cols-2 gap-8">
        {/* Main Stats */}
        <div className="space-y-6">
          {STAT_GROUPS.map((group) => (
            <div
              key={group.name}
              className={`p-4 rounded-lg border space-y-4 transition-colors ${
                isCalculating ? "border-primary/50 bg-primary/5" : "border-border/50"
              }`}
            >
              <Text className="font-medium">{group.name}</Text>
              <div className="space-y-2">
                {group.stats.map((stat) => (
                  <div key={stat.name} className="flex items-center justify-between">
                    <Text className="text-sm text-foreground/60">{stat.name}</Text>
                    <div className="flex items-center gap-2">
                      <Text
                        className={`text-sm transition-opacity duration-200 ${
                          isCalculating ? "opacity-50" : "opacity-100"
                        }`}
                      >
                        {stat.value}
                      </Text>
                      {stat.bonus > 0 && (
                        <Text className="text-sm text-emerald-500">+{stat.bonus}</Text>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* DPS Calculator */}
        <div className="space-y-6">
          <div className="p-4 rounded-lg border border-border/50 space-y-4">
            <Text className="font-medium">DPS Calculator</Text>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Text className="text-sm text-foreground/60 mb-2">Main Skill</Text>
                  <Select
                    value={selectedSkill}
                    onChange={(value) => {
                      setSelectedSkill(value);
                      setIsCalculating(true);
                      setTimeout(() => setIsCalculating(false), 300);
                    }}
                    options={[
                      { value: "", label: "Select Skill" },
                      { value: "skill1", label: "Skill 1" },
                      { value: "skill2", label: "Skill 2" },
                    ]}
                    className="w-full"
                  />
                </div>
                <div>
                  <Text className="text-sm text-foreground/60 mb-2">Weapon</Text>
                  <Select
                    value={selectedWeapon}
                    onChange={(value) => {
                      setSelectedWeapon(value);
                      setIsCalculating(true);
                      setTimeout(() => setIsCalculating(false), 300);
                    }}
                    options={[
                      { value: "", label: "Select Weapon" },
                      { value: "weapon1", label: "Weapon 1" },
                      { value: "weapon2", label: "Weapon 2" },
                    ]}
                    className="w-full"
                  />
                </div>
              </div>

              <div
                className={`p-4 rounded-lg transition-colors ${
                  isCalculating ? "bg-primary/5" : "bg-muted/30"
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Text className="text-sm text-foreground/60">Total DPS</Text>
                    <Text
                      className={`text-lg font-bold transition-opacity duration-200 ${
                        isCalculating ? "opacity-50" : "opacity-100"
                      }`}
                    >
                      0
                    </Text>
                  </div>
                  <div className="flex items-center justify-between">
                    <Text className="text-sm text-foreground/60">Physical DPS</Text>
                    <Text
                      className={`text-sm transition-opacity duration-200 ${
                        isCalculating ? "opacity-50" : "opacity-100"
                      }`}
                    >
                      0
                    </Text>
                  </div>
                  <div className="flex items-center justify-between">
                    <Text className="text-sm text-foreground/60">Elemental DPS</Text>
                    <Text
                      className={`text-sm transition-opacity duration-200 ${
                        isCalculating ? "opacity-50" : "opacity-100"
                      }`}
                    >
                      0
                    </Text>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg border border-border/50 space-y-4">
            <Text className="font-medium">Effective Health Pool</Text>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Text className="text-sm text-foreground/60">Life</Text>
                <Text
                  className={`text-sm transition-opacity duration-200 ${
                    isCalculating ? "opacity-50" : "opacity-100"
                  }`}
                >
                  0
                </Text>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-red-500 transition-all duration-300 w-0"
                  role="progressbar"
                  aria-valuenow={0}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
              <div className="flex items-center justify-between">
                <Text className="text-sm text-foreground/60">Energy Shield</Text>
                <Text
                  className={`text-sm transition-opacity duration-200 ${
                    isCalculating ? "opacity-50" : "opacity-100"
                  }`}
                >
                  0
                </Text>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-blue-500 transition-all duration-300 w-0"
                  role="progressbar"
                  aria-valuenow={0}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg border border-border/50 space-y-4">
            <Text className="font-medium">Mitigation</Text>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Text className="text-sm text-foreground/60">Physical Damage Reduction</Text>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-300 w-0"
                    role="progressbar"
                    aria-valuenow={0}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
                <Text
                  className={`text-sm text-right transition-opacity duration-200 ${
                    isCalculating ? "opacity-50" : "opacity-100"
                  }`}
                >
                  0%
                </Text>
              </div>
              <div className="space-y-2">
                <Text className="text-sm text-foreground/60">Evade Chance</Text>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-300 w-0"
                    role="progressbar"
                    aria-valuenow={0}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
                <Text
                  className={`text-sm text-right transition-opacity duration-200 ${
                    isCalculating ? "opacity-50" : "opacity-100"
                  }`}
                >
                  0%
                </Text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BuildPlannerLayout>
  );
}
