"use client";

import { Search } from "lucide-react";

import { useCallback, useState } from "react";

import { BuildPlannerLayout } from "~/components/build-planner/BuildPlannerLayout";
import { Button } from "~/components/ui/Button";
import { Container } from "~/components/ui/Container";
import { Input } from "~/components/ui/Input";
import { Text } from "~/components/ui/Text";

const SKILL_GROUPS = [
  { name: "Attack Skills", count: 0 },
  { name: "Spell Skills", count: 0 },
  { name: "Aura Skills", count: 0 },
  { name: "Movement Skills", count: 0 },
  { name: "Support Gems", count: 0 },
  { name: "Spirit Gems", count: 0 },
] as const;

const GEM_SLOTS = [
  { name: "Weapon", slots: 3 },
  { name: "Body Armour", slots: 6 },
  { name: "Helmet", slots: 4 },
  { name: "Gloves", slots: 4 },
  { name: "Boots", slots: 4 },
] as const;

type SkillGroup = (typeof SKILL_GROUPS)[number]["name"];
type GemSlot = { itemId: string | null; name: string | null };

export default function SkillsPage() {
  const [selectedGroup, setSelectedGroup] = useState<SkillGroup | null>(null);
  const [selectedSocket, setSelectedSocket] = useState<{ item: string; slot: number } | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [gemSlots, setGemSlots] = useState<Record<string, GemSlot[]>>(() =>
    GEM_SLOTS.reduce(
      (acc, item) => ({
        ...acc,
        [item.name]: Array(item.slots).fill({ itemId: null, name: null }),
      }),
      {}
    )
  );

  const handleSearch = useCallback(
    debounce((value: string) => {
      setIsSearching(false);
    }, 300),
    []
  );

  return (
    <BuildPlannerLayout
      title="Skills"
      description="Configure your character's skills and gem setup"
      actions={
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Import
          </Button>
          <Button variant="outline" size="sm">
            Export
          </Button>
          <Button variant="primary" size="sm">
            Save
          </Button>
        </div>
      }
      sidebar={
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <Text className="font-medium">Skills</Text>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setGemSlots(
                  GEM_SLOTS.reduce(
                    (acc, item) => ({
                      ...acc,
                      [item.name]: Array(item.slots).fill({ itemId: null, name: null }),
                    }),
                    {}
                  )
                );
                setSelectedSocket(null);
              }}
            >
              Clear All
            </Button>
          </div>

          {/* Skill Categories */}
          <div className="space-y-2">
            {SKILL_GROUPS.map((group) => (
              <button
                key={group.name}
                onClick={() => setSelectedGroup(group.name)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center justify-between transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                  selectedGroup === group.name
                    ? "bg-primary/10 text-primary hover:bg-primary/20"
                    : "hover:bg-muted/50"
                }`}
                role="tab"
                aria-selected={selectedGroup === group.name}
                tabIndex={0}
              >
                <span>{group.name}</span>
                <span
                  className={`${
                    selectedGroup === group.name ? "text-primary" : "text-foreground/40"
                  }`}
                >
                  {group.count}
                </span>
              </button>
            ))}
          </div>

          <div className="border-t border-border/50 my-4" />

          {/* Search */}
          <div className="relative">
            <Input
              placeholder="Search skills..."
              className="pl-10"
              onChange={(e) => {
                setIsSearching(true);
                handleSearch(e.target.value);
              }}
              aria-label="Search skills"
            />
            <Search
              className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors ${
                isSearching ? "text-primary" : "text-foreground/40"
              }`}
            />
          </div>

          {/* Skill List */}
          <div className="space-y-2">
            <Text className="text-sm text-foreground/60">
              {selectedGroup
                ? "No skills found in this category"
                : "Select a category to view available skills"}
            </Text>
          </div>
        </div>
      }
    >
      <div className="grid grid-cols-2 gap-8">
        {/* Gem Slots */}
        <div className="space-y-6">
          {GEM_SLOTS.map((item) => (
            <div key={item.name} className="p-4 rounded-lg border border-border/50 space-y-4">
              <Text className="font-medium">{item.name}</Text>
              <div className="grid grid-cols-2 gap-4">
                {gemSlots[item.name].map((socket, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedSocket({ item: item.name, slot: i })}
                    className={`aspect-square rounded-lg border-2 flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                      selectedSocket?.item === item.name && selectedSocket?.slot === i
                        ? "border-primary bg-primary/5"
                        : socket.itemId
                          ? "border-solid border-primary/50 hover:bg-primary/5"
                          : "border-dashed border-border/50 hover:border-primary/50"
                    }`}
                    role="button"
                    aria-label={socket.itemId ? `Socket with ${socket.name}` : "Empty socket"}
                    tabIndex={0}
                  >
                    <Text
                      className={`text-sm ${
                        socket.itemId ? "text-foreground" : "text-foreground/40"
                      }`}
                    >
                      {socket.name || "Empty Socket"}
                    </Text>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Skill Configuration */}
        <div className="space-y-6">
          <div
            className={`p-4 rounded-lg border transition-colors ${
              selectedSocket ? "border-primary/50 bg-primary/5" : "border-border/50"
            }`}
          >
            <Text className="font-medium">Selected Skill</Text>
            <Text className="text-sm text-foreground/60 mt-2">
              {selectedSocket
                ? `Configuring ${selectedSocket.item} socket ${selectedSocket.slot + 1}`
                : "Select a skill gem to view its details and configuration"}
            </Text>
          </div>

          <div className="p-4 rounded-lg border border-border/50 space-y-4">
            <Text className="font-medium">Skill Stats</Text>
            <div className="space-y-2">
              {["Cast Time", "Mana Cost", "Critical Strike Chance", "Effectiveness"].map((stat) => (
                <div key={stat} className="flex items-center justify-between">
                  <Text className="text-sm text-foreground/60">{stat}</Text>
                  <Text className="text-sm">-</Text>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-lg border border-border/50 space-y-4">
            <Text className="font-medium">Requirements</Text>
            <div className="space-y-2">
              {["Level", "Strength", "Dexterity", "Intelligence"].map((req) => (
                <div key={req} className="flex items-center justify-between">
                  <Text className="text-sm text-foreground/60">{req}</Text>
                  <Text className="text-sm">-</Text>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-lg border border-border/50 space-y-4">
            <div className="flex items-center justify-between">
              <Text className="font-medium">Support Gems</Text>
              <Button variant="ghost" size="sm" disabled={!selectedSocket}>
                Add Support
              </Button>
            </div>
            <Text className="text-sm text-foreground/60">No support gems linked to this skill</Text>
          </div>
        </div>
      </div>
    </BuildPlannerLayout>
  );
}

function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
