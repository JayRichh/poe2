"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { didLastWriteSucceed, getActiveBuild, upsertActiveBuild } from "./storage";
import type { PlannerBuildData } from "./types";

/**
 * Shared persistence for a build-planner section page (equipment, skills,
 * stats, ...). On mount it hydrates the section from the active build; `save`
 * writes the section back and briefly flips `saved` for a "Saved!" affordance.
 * Each page keeps its own state shape (T) and just wires hydrate + save.
 */
export function useBuildSection<T>(
  section: keyof PlannerBuildData,
  onHydrate: (data: T) => void
): { save: (value: T) => void; saved: boolean } {
  const [saved, setSaved] = useState(false);

  // Keep the latest hydrate callback without re-running the mount effect.
  const hydrate = useRef(onHydrate);
  hydrate.current = onHydrate;

  const flashTimer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const data = getActiveBuild()?.data[section] as T | undefined;
    if (data !== undefined) hydrate.current(data);
  }, [section]);

  useEffect(() => () => clearTimeout(flashTimer.current), []);

  const save = useCallback(
    (value: T) => {
      upsertActiveBuild(section, value);
      // Don't flash "Saved!" if the write was silently dropped (quota exceeded,
      // private mode, storage disabled) — that would be a lie to the user.
      if (!didLastWriteSucceed()) {
        setSaved(false);
        return;
      }
      setSaved(true);
      clearTimeout(flashTimer.current);
      flashTimer.current = setTimeout(() => setSaved(false), 2000);
    },
    [section]
  );

  return { save, saved };
}
