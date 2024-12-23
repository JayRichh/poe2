import { Container } from "~/components/ui/Container";
import { Skeleton } from "~/components/ui/Skeleton";
import { Text } from "~/components/ui/Text";

const SKILL_GROUPS = [
  "Attack Skills",
  "Spell Skills",
  "Aura Skills",
  "Movement Skills",
  "Support Gems",
  "Spirit Gems",
] as const;

const GEM_SLOTS = [
  { name: "Weapon", slots: 3 },
  { name: "Body Armour", slots: 6 },
  { name: "Helmet", slots: 4 },
  { name: "Gloves", slots: 4 },
  { name: "Boots", slots: 4 },
] as const;

export default function SkillsLoading() {
  return (
    <div className="grid grid-cols-2 gap-8">
      {/* Gem Slots */}
      <div className="space-y-6">
        {GEM_SLOTS.map((item) => (
          <div key={item.name} className="p-4 rounded-lg border border-border/50 space-y-4">
            <Text className="font-medium">{item.name}</Text>
            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: item.slots }).map((_, i) => (
                <div key={i} className="relative aspect-square">
                  <Skeleton className="absolute inset-0 rounded-lg animate-pulse" />
                  <div className="absolute inset-2 rounded-lg border-2 border-primary/20 animate-[pulse_2s_ease-in-out_infinite]" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Skill Configuration */}
      <div className="space-y-6">
        {/* Selected Skill */}
        <div className="p-4 rounded-lg border border-border/50">
          <Text className="font-medium">Selected Skill</Text>
          <div className="mt-2 space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-48" />
          </div>
        </div>

        {/* Skill Stats */}
        <div className="p-4 rounded-lg border border-border/50 space-y-4">
          <Text className="font-medium">Skill Stats</Text>
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>
        </div>

        {/* Requirements */}
        <div className="p-4 rounded-lg border border-border/50 space-y-4">
          <Text className="font-medium">Requirements</Text>
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>
        </div>

        {/* Support Gems */}
        <div className="p-4 rounded-lg border border-border/50 space-y-4">
          <div className="flex items-center justify-between">
            <Text className="font-medium">Support Gems</Text>
            <Skeleton className="h-8 w-24" />
          </div>
          <Skeleton className="h-4 w-48" />
        </div>
      </div>

      {/* Sidebar */}
      <div className="fixed top-0 right-0 h-screen w-64 border-l border-border/50 bg-background/95 backdrop-blur-sm p-4 space-y-4 animate-[pulse_3s_ease-in-out_infinite]">
        <div className="flex items-center justify-between">
          <Text className="font-medium">Skills</Text>
          <Skeleton className="h-8 w-20" />
        </div>

        {/* Skill Categories */}
        <div className="space-y-2">
          {SKILL_GROUPS.map((group, i) => (
            <div 
              key={i} 
              className={`animate-pulse ${
                i === 0 ? 'delay-0' :
                i === 1 ? 'delay-100' :
                i === 2 ? 'delay-200' :
                i === 3 ? 'delay-300' :
                i === 4 ? 'delay-400' :
                'delay-500'
              }`}
            >
              <Skeleton className="h-9 w-full rounded-lg" />
            </div>
          ))}
        </div>

        <div className="border-t border-border/50 my-4" />

        {/* Search */}
        <Skeleton className="h-10 w-full rounded-lg" />

        {/* Skill List */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-48" />
        </div>
      </div>
    </div>
  );
}
