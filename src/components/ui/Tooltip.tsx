"use client";

import { motion } from "framer-motion";

import { useEffect, useRef, useState } from "react";

import { cn } from "~/utils/cn";

type TooltipPosition = "top" | "right" | "bottom" | "left";

interface TooltipProps {
  content: React.ReactNode;
  position?: TooltipPosition;
  delay?: number;
  children: React.ReactNode;
  className?: string;
}

const arrowPositions: Record<TooltipPosition, string> = {
  top: "bottom-[-4px] left-1/2 -translate-x-1/2",
  right: "left-[-4px] top-1/2 -translate-y-1/2",
  bottom: "top-[-4px] left-1/2 -translate-x-1/2",
  left: "right-[-4px] top-1/2 -translate-y-1/2",
};

export function Tooltip({
  content,
  position = "top",
  delay = 200,
  children,
  className,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const showTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="relative inline-flex group">
      <div
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
      >
        {children}
      </div>
      <div
        className={cn(
          "absolute z-50 pointer-events-none",
          position === "top" && "bottom-full left-1/2 -translate-x-1/2 -translate-y-2",
          position === "right" && "left-full top-1/2 -translate-y-1/2 translate-x-2",
          position === "bottom" && "top-full left-1/2 -translate-x-1/2 translate-y-2",
          position === "left" && "right-full top-1/2 -translate-y-1/2 -translate-x-2"
        )}
      >
        <motion.div
          initial={false}
          animate={{
            opacity: isVisible ? 1 : 0,
            scale: isVisible ? 1 : 0.96,
          }}
          transition={{ duration: 0.15 }}
          className={cn("relative", className)}
        >
          <div
            className={cn(
              "relative",
              "bg-gray-900 text-white dark:bg-white dark:text-gray-900",
              "border border-border/50 rounded-lg shadow-lg",
              "px-3 py-1.5 text-sm whitespace-nowrap"
            )}
          >
            {content}
            <div
              className={cn(
                "absolute w-2 h-2",
                "border border-border/50",
                "bg-gray-900 dark:bg-white rotate-45",
                arrowPositions[position]
              )}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
