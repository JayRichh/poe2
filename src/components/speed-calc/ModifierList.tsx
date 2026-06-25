"use client";

import { Plus, X } from "lucide-react";

import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/Input";
import { Text } from "~/components/ui/Text";

import type { ModifierRow } from "~/types/speed-calc";

interface ModifierListProps {
  title: string;
  hint?: string;
  modifiers: ModifierRow[];
  onAdd: () => void;
  onUpdate: (id: string, patch: Partial<ModifierRow>) => void;
  onRemove: (id: string) => void;
}

/**
 * Editable list of "% increased / reduced" modifiers. Positive = increase,
 * negative = reduction (chill, temporal slow, less-speed). Labels are free text
 * so users describe their own gear/skills — no fabricated source tables.
 */
export function ModifierList({
  title,
  hint,
  modifiers,
  onAdd,
  onUpdate,
  onRemove,
}: ModifierListProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <Text variant="body" weight="semibold">
          {title}
        </Text>
        <Button variant="outline" size="sm" onClick={onAdd} className="gap-1.5">
          <Plus className="h-3.5 w-3.5" />
          Add
        </Button>
      </div>

      {hint && (
        <Text variant="body-sm" color="secondary">
          {hint}
        </Text>
      )}

      {modifiers.length === 0 ? (
        <Text variant="body-sm" color="secondary" className="italic">
          No modifiers — effective speed equals the base.
        </Text>
      ) : (
        <div className="space-y-2">
          {modifiers.map((mod) => {
            const isReduction = mod.percent < 0;
            return (
              <div key={mod.id} className="flex items-center gap-2">
                <Input
                  value={mod.label}
                  aria-label="Modifier name"
                  onChange={(e) => onUpdate(mod.id, { label: e.target.value })}
                  className="flex-1"
                />
                <div className="relative w-28 shrink-0">
                  <Input
                    type="number"
                    step={1}
                    value={Number.isFinite(mod.percent) ? mod.percent : 0}
                    aria-label={`${mod.label} percent`}
                    onChange={(e) => onUpdate(mod.id, { percent: Number(e.target.value) })}
                    className={isReduction ? "pr-6 text-error" : "pr-6"}
                  />
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                    %
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={`Remove ${mod.label}`}
                  onClick={() => onRemove(mod.id)}
                  className="shrink-0 text-muted-foreground hover:text-error"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
