import type { Rarity } from "~/types/equipment";

/**
 * Rarity-as-light: each rarity maps onto a theme token so a geared character
 * literally lights the reliquary up. normal = bone grey, magic = sapphire,
 * rare = aged gold (the gilded half), unique = dried crimson (the grimdark half).
 * Glow is a tight box-shadow in the rarity's own hue.
 */
export interface RarityStyle {
  label: string;
  text: string;
  border: string;
  glow: string;
  /** Title-rule color for the item-card tooltip. */
  rule: string;
}

export const RARITY_STYLES: Record<Rarity, RarityStyle> = {
  normal: {
    label: "Normal",
    text: "text-foreground-secondary",
    border: "border-foreground-secondary/40",
    glow: "",
    rule: "bg-foreground-secondary/40",
  },
  magic: {
    label: "Magic",
    text: "text-gem-sapphire",
    border: "border-gem-sapphire/50",
    glow: "shadow-[0_0_20px_-6px_hsl(var(--gem-sapphire))]",
    rule: "bg-gem-sapphire/60",
  },
  rare: {
    label: "Rare",
    text: "text-primary",
    border: "border-primary/50",
    glow: "shadow-[0_0_22px_-5px_hsl(var(--primary))]",
    rule: "bg-primary/60",
  },
  unique: {
    label: "Unique",
    text: "text-accent",
    border: "border-accent/50",
    glow: "shadow-[0_0_22px_-5px_hsl(var(--accent))]",
    rule: "bg-accent/60",
  },
};
