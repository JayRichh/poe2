"use client";

import { useState } from "react";

import { BuildPlannerLayout } from "~/components/build-planner/BuildPlannerLayout";
import { Button } from "~/components/ui/Button";
import { Container } from "~/components/ui/Container";
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

type EquipmentSlot = (typeof EQUIPMENT_SLOTS)[number];

export default function EquipmentPage() {
  const [selectedSlot, setSelectedSlot] = useState<EquipmentSlot | null>(null);
  const [selectedInventorySlot, setSelectedInventorySlot] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (
    e: React.DragEvent,
    type: "equipment" | "inventory",
    id: string | number
  ) => {
    e.dataTransfer.setData("text/plain", JSON.stringify({ type, id }));
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent, type: "equipment" | "inventory", id: string | number) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData("text/plain"));
    // Handle item swapping logic here
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <BuildPlannerLayout
      title="Equipment"
      description="Manage your character's equipment and inventory"
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
          <Text className="font-medium">Equipment Slots</Text>
          <div className="space-y-2">
            {EQUIPMENT_SLOTS.map((slot) => (
              <button
                key={slot}
                onClick={() => setSelectedSlot(slot)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, "equipment", slot)}
                draggable
                onDragStart={(e) => handleDragStart(e, "equipment", slot)}
                onDragEnd={handleDragEnd}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                  selectedSlot === slot
                    ? "bg-primary/10 text-primary hover:bg-primary/20"
                    : "hover:bg-muted/50"
                } ${isDragging ? "opacity-50" : ""}`}
                aria-selected={selectedSlot === slot}
                role="tab"
                tabIndex={0}
              >
                {slot}
              </button>
            ))}
          </div>

          <div className="border-t border-border/50 my-4" />

          <Text className="font-medium">Inventory</Text>
          <div
            className="grid grid-cols-12 gap-1 p-2 rounded-lg border border-border/50"
            role="grid"
            aria-label="Inventory grid"
          >
            {Array.from({ length: 60 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setSelectedInventorySlot(i)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, "inventory", i)}
                draggable
                onDragStart={(e) => handleDragStart(e, "inventory", i)}
                onDragEnd={handleDragEnd}
                className={`aspect-square rounded border transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                  selectedInventorySlot === i
                    ? "border-primary bg-primary/10 hover:bg-primary/20"
                    : "border-border/50 hover:border-primary/50 hover:bg-muted/30"
                } ${isDragging ? "opacity-50" : ""}`}
                role="gridcell"
                aria-selected={selectedInventorySlot === i}
                aria-label={`Inventory slot ${i + 1}`}
                tabIndex={0}
                onKeyDown={(e) => {
                  const col = i % 12;
                  const row = Math.floor(i / 12);

                  switch (e.key) {
                    case "ArrowRight":
                      if (col < 11) setSelectedInventorySlot(i + 1);
                      break;
                    case "ArrowLeft":
                      if (col > 0) setSelectedInventorySlot(i - 1);
                      break;
                    case "ArrowDown":
                      if (row < 4) setSelectedInventorySlot(i + 12);
                      break;
                    case "ArrowUp":
                      if (row > 0) setSelectedInventorySlot(i - 12);
                      break;
                  }
                }}
              />
            ))}
          </div>
        </div>
      }
    >
      <div className="grid grid-cols-2 gap-8">
        {/* Character Preview */}
        <div className="aspect-[3/4] rounded-lg border-2 border-dashed border-border/50 flex items-center justify-center">
          <Text className="text-foreground/40">Character Preview</Text>
        </div>

        {/* Equipment Stats */}
        <div className="space-y-6">
          <div
            className={`p-4 rounded-lg border transition-colors ${
              selectedSlot || selectedInventorySlot !== null
                ? "border-primary/50 bg-primary/5"
                : "border-border/50"
            }`}
          >
            <Text className="font-medium">Selected Item</Text>
            <Text className="text-sm text-foreground/60 mt-2">
              {selectedSlot
                ? `Viewing ${selectedSlot} slot`
                : selectedInventorySlot !== null
                  ? `Viewing inventory slot ${selectedInventorySlot + 1}`
                  : "Select an equipment slot or inventory item to view its details"}
            </Text>
          </div>

          <div className="p-4 rounded-lg border border-border/50 space-y-4">
            <Text className="font-medium">Equipment Stats</Text>
            <div className="space-y-2">
              {["Armour", "Evasion", "Energy Shield", "Block Chance", "Movement Speed"].map(
                (stat) => (
                  <div key={stat} className="flex items-center justify-between">
                    <Text className="text-sm text-foreground/60">{stat}</Text>
                    <Text className="text-sm">0</Text>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="p-4 rounded-lg border border-border/50 space-y-4">
            <Text className="font-medium">Requirements</Text>
            <div className="space-y-2">
              {["Level", "Strength", "Dexterity", "Intelligence"].map((req) => (
                <div key={req} className="flex items-center justify-between">
                  <Text className="text-sm text-foreground/60">{req}</Text>
                  <Text className="text-sm">0</Text>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </BuildPlannerLayout>
  );
}
