"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { usePathname, useSearchParams } from "next/navigation";

export interface ActiveState {
  section: string | null;
  category: string | null;
}

export function useActiveSection() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [activeState, setActiveState] = useState<ActiveState>({
    section: null,
    category: null,
  });

  // Use ref to track if this is the initial mount
  const isInitialMount = useRef(true);

  const updateActiveState = useCallback(() => {
    try {
      // Only update if we're on the UI examples page
      if (!pathname?.includes("/examples/ui")) return;

      const section = searchParams?.get("section");
      const hash = window?.location?.hash?.slice(1) || null;

      // On initial mount, set both section and category
      if (isInitialMount.current) {
        setActiveState({
          section: hash || section || null,
          category: section || null,
        });
        isInitialMount.current = false;
        return;
      }

      // After initial mount, only update if values actually changed
      setActiveState((prev) => {
        const newSection = hash || section || null;
        const newCategory = section || null;

        if (prev.section === newSection && prev.category === newCategory) {
          return prev;
        }

        return {
          section: newSection,
          category: newCategory,
        };
      });
    } catch (error) {
      console.error("Error updating active section:", error);
      // Fallback to null state on error
      setActiveState({
        section: null,
        category: null,
      });
    }
  }, [searchParams, pathname]);

  // Listen for hash changes
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleHashChange = () => {
      updateActiveState();
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [updateActiveState]);

  // Update on searchParams/pathname changes
  useEffect(() => {
    updateActiveState();
  }, [updateActiveState]);

  return activeState;
}
