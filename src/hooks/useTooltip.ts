import { useCallback, useEffect, useRef, useState } from "react";

type TooltipPosition = "top" | "right" | "bottom" | "left";

interface TooltipState {
  top: number;
  left: number;
}

export function useTooltip(position: TooltipPosition, delay: number) {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState<TooltipState>({ top: 0, left: 0 });
  const timeoutRef = useRef<NodeJS.Timeout>();
  const triggerRef = useRef<HTMLDivElement>(null);

  const updateTooltipPosition = useCallback(() => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      let top = 0;
      let left = 0;

      switch (position) {
        case "top":
          top = rect.top + window.scrollY;
          left = rect.left + rect.width / 2 + window.scrollX;
          break;
        case "right":
          top = rect.top + rect.height / 2 + window.scrollY;
          left = rect.right + window.scrollX;
          break;
        case "bottom":
          top = rect.bottom + window.scrollY;
          left = rect.left + rect.width / 2 + window.scrollX;
          break;
        case "left":
          top = rect.top + rect.height / 2 + window.scrollY;
          left = rect.left + window.scrollX;
          break;
      }

      setTooltipPosition({ top, left });
    }
  }, [position]);

  const showTooltip = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
      updateTooltipPosition();
    }, delay);
  }, [delay, updateTooltipPosition]);

  const hideTooltip = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  }, []);

  useEffect(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const handleScroll = () => {
      if (isVisible) {
        updateTooltipPosition();
      }
    };

    window.addEventListener("scroll", handleScroll, true);
    window.addEventListener("resize", updateTooltipPosition);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      window.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", updateTooltipPosition);
    };
  }, [isVisible, updateTooltipPosition]);

  return {
    triggerRef,
    isVisible,
    tooltipPosition,
    showTooltip,
    hideTooltip,
  };
}

export type { TooltipPosition };
