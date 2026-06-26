"use client";

import { Plus, Trash2 } from "lucide-react";

import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/Input";
import { Text } from "~/components/ui/Text";

import { cn } from "~/utils/cn";

import {
  type EquippedItem,
  type ItemMod,
  type ItemStatKey,
  RARITIES,
  STAT_CATALOG,
  STAT_KEYS,
} from "~/types/equipment";

import { RARITY_STYLES } from "./rarity";

interface ItemEditorProps {
  slotLabel: string;
  item?: EquippedItem;
  onChange: (item: EquippedItem) => void;
  onClear: () => void;
}

function newId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `mod_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

const selectClass =
  "h-9 rounded-md border border-border/50 bg-background px-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50";

export function ItemEditor({ slotLabel, item, onChange, onClear }: ItemEditorProps) {
  if (!item) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border/50 p-8 text-center">
        <Text className="text-sm text-foreground-secondary">
          No item in the <span className="text-foreground">{slotLabel}</span> slot.
        </Text>
        <Button
          variant="primary"
          size="sm"
          onClick={() =>
            onChange({ name: "", rarity: "rare", baseType: "", mods: [] })
          }
        >
          <Plus className="mr-1 h-4 w-4" /> Add {slotLabel}
        </Button>
      </div>
    );
  }

  const patch = (changes: Partial<EquippedItem>) => onChange({ ...item, ...changes });

  const addMod = () =>
    patch({ mods: [...item.mods, { id: newId(), stat: "increasedDamage", value: 0 }] });

  const updateMod = (id: string, changes: Partial<ItemMod>) =>
    patch({ mods: item.mods.map((m) => (m.id === id ? { ...m, ...changes } : m)) });

  const removeMod = (id: string) => patch({ mods: item.mods.filter((m) => m.id !== id) });

  const changeStat = (id: string, stat: ItemStatKey) => {
    const isRange = STAT_CATALOG[stat].range;
    updateMod(id, { stat, ...(isRange ? { valueMax: 0 } : { valueMax: undefined }) });
  };

  const rarityStyle = RARITY_STYLES[item.rarity];

  return (
    <div className="space-y-5 rounded-xl border border-border/50 bg-background/40 p-5">
      <div className="flex items-center justify-between gap-3">
        <Text className="text-xs uppercase tracking-wider text-foreground/40">{slotLabel}</Text>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClear}
          className="text-error hover:text-error/80"
        >
          <Trash2 className="mr-1 h-4 w-4" /> Clear slot
        </Button>
      </div>

      {/* Core fields */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="space-y-1">
          <span className="text-xs font-medium text-foreground-secondary">Item name</span>
          <Input
            value={item.name}
            placeholder="e.g. Soul Taker"
            onChange={(e) => patch({ name: e.target.value })}
            className={cn("font-medium", rarityStyle.text)}
          />
        </label>
        <label className="space-y-1">
          <span className="text-xs font-medium text-foreground-secondary">Rarity</span>
          <select
            value={item.rarity}
            onChange={(e) => patch({ rarity: e.target.value as EquippedItem["rarity"] })}
            className={cn(selectClass, "w-full")}
          >
            {RARITIES.map((r) => (
              <option key={r} value={r}>
                {RARITY_STYLES[r].label}
              </option>
            ))}
          </select>
        </label>
        <label className="space-y-1">
          <span className="text-xs font-medium text-foreground-secondary">Base type</span>
          <Input
            value={item.baseType ?? ""}
            placeholder="e.g. Siege Axe"
            onChange={(e) => patch({ baseType: e.target.value })}
          />
        </label>
        <label className="space-y-1">
          <span className="text-xs font-medium text-foreground-secondary">Item level</span>
          <Input
            type="number"
            value={item.itemLevel ?? ""}
            placeholder="82"
            onChange={(e) =>
              patch({ itemLevel: e.target.value === "" ? undefined : Number(e.target.value) })
            }
          />
        </label>
      </div>

      {/* Mods */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Text className="text-sm font-medium">Modifiers</Text>
          <Button variant="outline" size="sm" onClick={addMod}>
            <Plus className="mr-1 h-4 w-4" /> Add modifier
          </Button>
        </div>

        {item.mods.length === 0 ? (
          <Text className="text-sm text-foreground-secondary">
            No modifiers yet. Add the affixes that scale your build.
          </Text>
        ) : (
          <div className="space-y-2">
            {item.mods.map((mod) => {
              const meta = STAT_CATALOG[mod.stat];
              return (
                <div key={mod.id} className="flex items-center gap-2">
                  <select
                    value={mod.stat}
                    onChange={(e) => changeStat(mod.id, e.target.value as ItemStatKey)}
                    className={cn(selectClass, "min-w-0 flex-1")}
                    aria-label="Modifier"
                  >
                    {STAT_KEYS.map((key) => (
                      <option key={key} value={key}>
                        {STAT_CATALOG[key].label}
                      </option>
                    ))}
                  </select>

                  <Input
                    type="number"
                    value={Number.isFinite(mod.value) ? mod.value : 0}
                    onChange={(e) => updateMod(mod.id, { value: Number(e.target.value) })}
                    aria-label={meta.range ? "Minimum" : "Value"}
                    className="w-20 text-right font-mono tabular-nums"
                  />
                  {meta.range && (
                    <>
                      <span className="text-foreground/40">–</span>
                      <Input
                        type="number"
                        value={Number.isFinite(mod.valueMax as number) ? mod.valueMax : 0}
                        onChange={(e) => updateMod(mod.id, { valueMax: Number(e.target.value) })}
                        aria-label="Maximum"
                        className="w-20 text-right font-mono tabular-nums"
                      />
                    </>
                  )}
                  {meta.unit === "%" && <span className="w-4 text-sm text-foreground/40">%</span>}

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeMod(mod.id)}
                    aria-label="Remove modifier"
                    className="text-foreground/50 hover:text-error"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
