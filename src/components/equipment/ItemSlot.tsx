"use client";

import { Plus } from "lucide-react";

import { cn } from "~/utils/cn";

import type { EquippedItem } from "~/types/equipment";

import { RARITY_STYLES } from "./rarity";

interface ItemSlotProps {
  label: string;
  item?: EquippedItem;
  selected: boolean;
  onSelect: () => void;
  style?: React.CSSProperties;
}

export function ItemSlot({ label, item, selected, onSelect, style }: ItemSlotProps) {
  const r = item ? RARITY_STYLES[item.rarity] : null;

  return (
    <button
      type="button"
      onClick={onSelect}
      style={style}
      aria-pressed={selected}
      aria-label={item ? `${label}: ${item.name || "Unnamed"} (${item.rarity})` : `${label}: empty`}
      className={cn(
        "group relative flex min-h-[68px] flex-col items-center justify-center gap-1 rounded-lg border p-2 text-center transition-all",
        "focus:outline-none focus:ring-2 focus:ring-primary/60",
        item
          ? cn("bg-background-secondary/60", r!.border, r!.glow)
          : "border-dashed border-border/50 hover:border-primary/50 hover:bg-primary/5",
        selected && "ring-2 ring-primary/70"
      )}
    >
      {item ? (
        <>
          <span className={cn("line-clamp-2 text-xs font-medium leading-tight", r!.text)}>
            {item.name || "Unnamed"}
          </span>
          <span className="text-[10px] uppercase tracking-wide text-foreground/40">{label}</span>
        </>
      ) : (
        <>
          <Plus className="h-4 w-4 text-foreground/30 transition-colors group-hover:text-primary/70" />
          <span className="text-[10px] uppercase tracking-wide text-foreground/40">{label}</span>
        </>
      )}
    </button>
  );
}
