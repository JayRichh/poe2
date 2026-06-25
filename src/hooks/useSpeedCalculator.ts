import { useCallback, useMemo, useState } from "react";

import {
  computeActionSpeed,
  computeMovementSpeed,
  type ActionSpeedResult,
  type MovementSpeedResult,
} from "~/lib/speed";
import type { ModifierRow, SpeedCalculatorState } from "~/types/speed-calc";

let idSeq = 0;
const nextId = () => `mod-${idSeq++}`;

/**
 * Default modifiers are illustrative COMMON SOURCES (boots %, a skill bonus, a
 * chill as a reduction) — labels and magnitudes are fully user-editable. They
 * are NOT claimed as authoritative 0.5.x base numbers; the reference doc does
 * not publish those, so the user supplies their own values.
 */
const DEFAULT_STATE: SpeedCalculatorState = {
  baseRunSpeed: 100,
  movementModifiers: [
    { id: nextId(), label: "Boots — movement speed", percent: 30 },
    { id: nextId(), label: "Skill / passive bonus", percent: 10 },
    { id: nextId(), label: "Chill (reduction)", percent: -25 },
  ],
  baseAps: 1.5,
  actionLabel: "attack",
  attackIncreasedModifiers: [
    { id: nextId(), label: "Gloves — increased attack speed", percent: 15 },
    { id: nextId(), label: "Passive tree", percent: 10 },
  ],
};

type ModifierBucket = "movementModifiers" | "attackIncreasedModifiers";

export interface UseSpeedCalculator {
  state: SpeedCalculatorState;
  movement: MovementSpeedResult;
  action: ActionSpeedResult;
  setBaseRunSpeed: (v: number) => void;
  setBaseAps: (v: number) => void;
  setActionLabel: (v: "attack" | "cast") => void;
  addModifier: (bucket: ModifierBucket) => void;
  updateModifier: (bucket: ModifierBucket, id: string, patch: Partial<ModifierRow>) => void;
  removeModifier: (bucket: ModifierBucket, id: string) => void;
}

export function useSpeedCalculator(): UseSpeedCalculator {
  const [state, setState] = useState<SpeedCalculatorState>(DEFAULT_STATE);

  const movement = useMemo(
    () =>
      computeMovementSpeed({
        baseRunSpeed: state.baseRunSpeed,
        modifiers: state.movementModifiers,
      }),
    [state.baseRunSpeed, state.movementModifiers]
  );

  const action = useMemo(
    () =>
      computeActionSpeed({
        baseAps: state.baseAps,
        increasedModifiers: state.attackIncreasedModifiers,
      }),
    [state.baseAps, state.attackIncreasedModifiers]
  );

  const setBaseRunSpeed = useCallback((v: number) => {
    setState((prev) => ({ ...prev, baseRunSpeed: v }));
  }, []);

  const setBaseAps = useCallback((v: number) => {
    setState((prev) => ({ ...prev, baseAps: v }));
  }, []);

  const setActionLabel = useCallback((v: "attack" | "cast") => {
    setState((prev) => ({ ...prev, actionLabel: v }));
  }, []);

  const addModifier = useCallback((bucket: ModifierBucket) => {
    setState((prev) => ({
      ...prev,
      [bucket]: [...prev[bucket], { id: nextId(), label: "New modifier", percent: 0 }],
    }));
  }, []);

  const updateModifier = useCallback(
    (bucket: ModifierBucket, id: string, patch: Partial<ModifierRow>) => {
      setState((prev) => ({
        ...prev,
        [bucket]: prev[bucket].map((m) => (m.id === id ? { ...m, ...patch } : m)),
      }));
    },
    []
  );

  const removeModifier = useCallback((bucket: ModifierBucket, id: string) => {
    setState((prev) => ({
      ...prev,
      [bucket]: prev[bucket].filter((m) => m.id !== id),
    }));
  }, []);

  return {
    state,
    movement,
    action,
    setBaseRunSpeed,
    setBaseAps,
    setActionLabel,
    addModifier,
    updateModifier,
    removeModifier,
  };
}
