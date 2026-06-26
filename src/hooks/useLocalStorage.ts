import { useCallback, useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  // State to store our value
  // Initialize with the initial value during SSR and first render
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  // After initial render, try to fetch from localStorage
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
    }
  }, [key]);

  // Stable setter (deps: [key]) that persists to localStorage. Using the
  // functional updater form means it does NOT close over `storedValue`, so its
  // identity never changes between renders. A previously-unmemoized setter here
  // gave every consumer (e.g. useDPSCalculator's calculateDPS) a fresh identity
  // each render, which drove a perpetual recalc/re-render loop on an idle page.
  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      setStoredValue((prev) => {
        const valueToStore = value instanceof Function ? value(prev) : value;
        try {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
          console.warn(`Error setting localStorage key "${key}":`, error);
        }
        return valueToStore;
      });
    },
    [key]
  );

  // Sync with other tabs/windows
  useEffect(() => {
    function handleStorageChange(e: StorageEvent) {
      if (e.key === key && e.newValue) {
        setStoredValue(JSON.parse(e.newValue));
      }
    }

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [key]);

  return [storedValue, setValue] as const;
}
