import { Container } from "~/components/ui/Container";
import { Skeleton } from "~/components/ui/Skeleton";
import { Text } from "~/components/ui/Text";

const EQUIPMENT_SLOTS = [
  "Weapon",
  "Off-Hand",
  "Helmet",
  "Body Armour",
  "Gloves",
  "Boots",
  "Amulet",
  "Ring 1",
  "Ring 2",
  "Belt",
] as const;

export default function EquipmentLoading() {
  return (
    <div className="grid grid-cols-2 gap-8">
      {/* Character Preview */}
      <div className="aspect-[3/4] rounded-lg border-2 border-dashed border-border/50 flex items-center justify-center">
        <Skeleton className="h-full w-full" />
      </div>

      {/* Equipment Stats */}
      <div className="space-y-6">
        {/* Selected Item */}
        <div className="p-4 rounded-lg border border-border/50">
          <Text className="font-medium">Selected Item</Text>
          <div className="mt-2 space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-48" />
          </div>
        </div>

        {/* Equipment Stats */}
        <div className="p-4 rounded-lg border border-border/50 space-y-4">
          <Text className="font-medium">Equipment Stats</Text>
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
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
      </div>

      {/* Sidebar */}
      <div className="fixed top-0 right-0 h-screen w-64 border-l border-border/50 bg-background p-4 space-y-4">
        {/* Equipment Slots */}
        <Text className="font-medium">Equipment Slots</Text>
        <div className="space-y-2">
          {EQUIPMENT_SLOTS.map((_, i) => (
            <Skeleton key={i} className="h-9 w-full rounded-lg" />
          ))}
        </div>

        <div className="border-t border-border/50 my-4" />

        {/* Inventory */}
        <Text className="font-medium">Inventory</Text>
        <div className="grid grid-cols-12 gap-1 p-2 rounded-lg border border-border/50">
          {Array.from({ length: 60 }).map((_, i) => (
            <Skeleton key={i} className="aspect-square rounded" />
          ))}
        </div>
      </div>
    </div>
  );
}
