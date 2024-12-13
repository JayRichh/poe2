import { useCallback, useEffect, useState } from "react";

import { usePersistentState } from "./usePersistentState";

interface UseResizableOptions {
  minWidth?: number;
  maxWidth?: number;
  defaultWidth?: number;
  storageKey?: string;
  onResize?: (width: number) => void;
}

export function useResizable({
  minWidth = 240,
  maxWidth = 480,
  defaultWidth = 280,
  storageKey = "sidebar-width",
  onResize,
}: UseResizableOptions = {}) {
  const [width, setWidth] = usePersistentState({
    key: storageKey,
    defaultValue: defaultWidth,
  });
  const [isResizing, setIsResizing] = useState(false);

  const startResizing = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = useCallback(
    (event: MouseEvent) => {
      if (isResizing) {
        event.preventDefault();
        const newWidth = Math.max(minWidth, Math.min(maxWidth, event.clientX));
        setWidth(newWidth);
        onResize?.(newWidth);
      }
    },
    [isResizing, maxWidth, minWidth, setWidth, onResize]
  );

  useEffect(() => {
    if (isResizing) {
      window.addEventListener("mousemove", resize, { passive: false });
      window.addEventListener("mouseup", stopResizing);
      document.body.style.userSelect = "none";
      document.body.style.cursor = "ew-resize";
    }

    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
    };
  }, [isResizing, resize, stopResizing]);

  return {
    width,
    isResizing,
    startResizing,
    setWidth,
  };
}
