"use client";

import { useMemo, useState } from "react";

import { BuildPlannerLayout } from "~/components/build-planner/BuildPlannerLayout";
import { EquipmentDoll } from "~/components/equipment/EquipmentDoll";
import { ItemEditor } from "~/components/equipment/ItemEditor";
import { StatsLedger } from "~/components/equipment/StatsLedger";
import { Button } from "~/components/ui/Button";
import { Text } from "~/components/ui/Text";

import { useBuildSection } from "~/lib/build-planner/useBuildSection";
import { aggregateEquipment } from "~/lib/equipment/aggregate";
import { EQUIPMENT_SLOTS } from "~/lib/equipment/slots";
import type { EquipmentSlotId, EquipmentState, EquippedItem } from "~/types/equipment";

const VALID_SLOTS = new Set<EquipmentSlotId>(EQUIPMENT_SLOTS.map((s) => s.id));

/** Trust nothing from storage / a shared link: keep only well-formed slots. */
function sanitizeState(data: unknown): EquipmentState {
  if (!data || typeof data !== "object") return {};
  const out: EquipmentState = {};
  for (const [key, value] of Object.entries(data as Record<string, unknown>)) {
    if (
      VALID_SLOTS.has(key as EquipmentSlotId) &&
      value &&
      typeof value === "object" &&
      Array.isArray((value as { mods?: unknown }).mods)
    ) {
      out[key as EquipmentSlotId] = value as EquippedItem;
    }
  }
  return out;
}

export default function EquipmentPage() {
  const [items, setItems] = useState<EquipmentState>({});
  const [selected, setSelected] = useState<EquipmentSlotId>("weapon");

  const { save, saved } = useBuildSection<EquipmentState>("equipment", (data) => {
    setItems(sanitizeState(data));
  });

  const aggregate = useMemo(() => aggregateEquipment(items), [items]);
  const selectedDef = EQUIPMENT_SLOTS.find((s) => s.id === selected) ?? EQUIPMENT_SLOTS[0];
  const equippedCount = Object.keys(items).length;

  const setItem = (slot: EquipmentSlotId, item: EquippedItem) =>
    setItems((prev) => ({ ...prev, [slot]: item }));

  const clearItem = (slot: EquipmentSlotId) =>
    setItems((prev) => {
      const next = { ...prev };
      delete next[slot];
      return next;
    });

  return (
    <BuildPlannerLayout
      title="Equipment"
      description="Assemble your character's gear — each slot lights up by rarity and feeds the aggregated stats."
      actions={
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => (window.location.href = "/build-planner/import-export")}
          >
            Import / Export
          </Button>
          <Button variant="primary" size="sm" onClick={() => save(items)}>
            {saved ? "Saved!" : "Save"}
          </Button>
        </div>
      }
    >
      <div className="mx-auto max-w-7xl p-4 sm:p-6 md:p-8">
        <div className="mb-4 flex items-center justify-between">
          <Text className="text-sm text-foreground-secondary">
            {equippedCount === 0
              ? "Select a slot to equip your first item."
              : `${equippedCount} of ${EQUIPMENT_SLOTS.length} slots equipped`}
          </Text>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_minmax(320px,380px)]">
          <div className="space-y-6">
            <EquipmentDoll items={items} selected={selected} onSelect={setSelected} />
            <ItemEditor
              slotLabel={selectedDef.label}
              item={items[selected]}
              onChange={(item) => setItem(selected, item)}
              onClear={() => clearItem(selected)}
            />
          </div>

          <div className="lg:sticky lg:top-28 lg:self-start">
            <StatsLedger aggregate={aggregate} />
          </div>
        </div>
      </div>
    </BuildPlannerLayout>
  );
}
