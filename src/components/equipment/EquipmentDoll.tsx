"use client";

import { EQUIPMENT_GRID_AREAS, EQUIPMENT_SLOTS } from "~/lib/equipment/slots";
import type { EquipmentSlotId, EquipmentState } from "~/types/equipment";

import { ItemSlot } from "./ItemSlot";

interface EquipmentDollProps {
  items: EquipmentState;
  selected: EquipmentSlotId;
  onSelect: (slot: EquipmentSlotId) => void;
}

export function EquipmentDoll({ items, selected, onSelect }: EquipmentDollProps) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-border/50 bg-background/40 p-4 sm:p-6">
      {/* Etched reliquary silhouette behind the slot frames. */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden
      >
        <svg
          viewBox="0 0 100 160"
          className="h-[88%] w-auto text-primary opacity-[0.05]"
          fill="currentColor"
        >
          <circle cx="50" cy="24" r="14" />
          <path d="M50 38 C30 42 25 62 27 92 L21 152 L79 152 L73 92 C75 62 70 42 50 38 Z" />
        </svg>
      </div>

      <div
        className="relative grid gap-3"
        style={{
          gridTemplateAreas: EQUIPMENT_GRID_AREAS,
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
        }}
      >
        {EQUIPMENT_SLOTS.map((slot) => (
          <ItemSlot
            key={slot.id}
            label={slot.label}
            item={items[slot.id]}
            selected={selected === slot.id}
            onSelect={() => onSelect(slot.id)}
            style={{ gridArea: slot.area }}
          />
        ))}
      </div>
    </div>
  );
}
