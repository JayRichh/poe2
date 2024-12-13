import { useCallback, useEffect, useState } from "react";

interface PersistentStateOptions<T> {
  defaultValue: T;
  key: string;
  storage?: Storage;
}

const getDefaultStorage = (): Storage | undefined => {
  if (typeof window !== "undefined") {
    return window.localStorage;
  }
  return undefined;
};

export function usePersistentState<T>({
  defaultValue,
  key,
  storage = getDefaultStorage(),
}: PersistentStateOptions<T>) {
  // Always initialize with defaultValue to avoid hydration mismatch
  const [state, setState] = useState<T>(defaultValue);

  // After hydration, load the persisted value if it exists
  useEffect(() => {
    if (!storage) return;
    try {
      const item = storage.getItem(key);
      if (item) {
        setState(JSON.parse(item));
      }
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
    }
  }, [key, storage]);

  // Update storage when state changes
  useEffect(() => {
    if (!storage) return;
    try {
      if (state === undefined) {
        storage.removeItem(key);
      } else {
        storage.setItem(key, JSON.stringify(state));
      }
    } catch (error) {
      console.warn(`Error writing to localStorage key "${key}":`, error);
    }
  }, [key, state, storage]);

  const removeItem = useCallback(() => {
    if (!storage) return;
    try {
      storage.removeItem(key);
      setState(defaultValue);
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, defaultValue, storage]);

  return [state, setState, removeItem] as const;
}
