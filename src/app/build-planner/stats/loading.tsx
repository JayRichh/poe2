import { Container } from "~/components/ui/Container";
import { Skeleton } from "~/components/ui/Skeleton";
import { Text } from "~/components/ui/Text";

const STAT_GROUPS = [
  {
    name: "Core Attributes",
    stats: Array(3).fill(null),
  },
  {
    name: "Defenses",
    stats: Array(5).fill(null),
  },
  {
    name: "Offense",
    stats: Array(6).fill(null),
  },
  {
    name: "Resistances",
    stats: Array(4).fill(null),
  },
] as const;

export default function StatsLoading() {
  return (
    <div className="grid sm:grid-cols-2 gap-8">
      {/* Main Stats */}
      <div className="space-y-6">
        {STAT_GROUPS.map((group) => (
          <div key={group.name} className="p-4 rounded-lg border border-border/50 space-y-4">
            <Text className="font-medium">{group.name}</Text>
            <div className="space-y-2">
              {group.stats.map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <Skeleton className="h-4 w-32" />
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-12" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* DPS Calculator */}
      <div className="space-y-6">
        {/* DPS Calculator */}
        <div className="p-4 rounded-lg border border-border/50 space-y-4">
          <Text className="font-medium">DPS Calculator</Text>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Text className="text-sm text-foreground/60">Main Skill</Text>
                <Skeleton className="h-10 w-full rounded-lg" />
              </div>
              <div className="space-y-2">
                <Text className="text-sm text-foreground/60">Weapon</Text>
                <Skeleton className="h-10 w-full rounded-lg" />
              </div>
            </div>

            <div className="p-4 rounded-lg bg-muted/30 space-y-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-24" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Health Pool */}
        <div className="p-4 rounded-lg border border-border/50 space-y-4">
          <Text className="font-medium">Effective Health Pool</Text>
          <div className="space-y-4">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <Skeleton className="h-2 w-full rounded-full" />
              </div>
            ))}
          </div>
        </div>

        {/* Mitigation */}
        <div className="p-4 rounded-lg border border-border/50 space-y-4">
          <Text className="font-medium">Mitigation</Text>
          <div className="grid grid-cols-2 gap-4">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-2 w-full rounded-full" />
                <Skeleton className="h-4 w-12 ml-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="fixed top-0 right-0 h-screen w-64 border-l border-border/50 bg-background p-4 space-y-4">
        <Text className="font-medium">Stat Allocation</Text>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-24" />
                <div className="flex items-center gap-2">
                  <Skeleton className="h-6 w-6 rounded" />
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-6 w-6 rounded" />
                </div>
              </div>
              <Skeleton className="h-2 w-full rounded-full" />
            </div>
          ))}
        </div>

        <div className="border-t border-border/50 my-4" />

        <div className="space-y-4">
          <Text className="font-medium">Available Points</Text>
          <div className="grid grid-cols-2 gap-4">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="p-3 rounded-lg border border-border/50">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-12 mt-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
