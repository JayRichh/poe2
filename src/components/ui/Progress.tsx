"use client";

import { motion } from "framer-motion";

import { useEffect, useState } from "react";

import { cn } from "~/utils/cn";

interface ProgressProps {
  value: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  animate?: boolean;
  variant?: "default" | "gradient" | "striped";
  color?: "primary" | "error";
  className?: string;
}

const sizeStyles = {
  sm: "h-1",
  md: "h-2",
  lg: "h-4",
};

const colorStyles = {
  primary: {
    default: "bg-primary",
    gradient: "bg-gradient-to-r from-primary via-primary/80 to-primary/60",
    striped: "bg-primary",
  },
  error: {
    default: "bg-error",
    gradient: "bg-gradient-to-r from-error via-error/80 to-error/60",
    striped: "bg-error",
  },
};

export function Progress({
  value,
  max = 100,
  size = "md",
  showValue = false,
  animate = true,
  variant = "default",
  color = "primary",
  className,
}: ProgressProps) {
  const [mounted, setMounted] = useState(false);
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    setMounted(true);
    setCurrentValue(value);
  }, [value]);

  if (!mounted) {
    return null;
  }

  const percentage = Math.min(Math.max((currentValue / max) * 100, 0), 100);

  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-full",
          "bg-background/10 dark:bg-background/20",
          "ring-1 ring-inset ring-border/5 dark:ring-border/10",
          sizeStyles[size]
        )}
      >
        <motion.div
          initial={animate ? { width: 0 } : { width: `${percentage}%` }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={cn(
            "absolute inset-y-0 left-0 flex items-center",
            colorStyles[color][variant],
            {
              "animate-[progress-stripe_1s_linear_infinite]": variant === "striped",
              "shadow-[0_0_12px_rgba(var(--primary-rgb),0.5)] dark:shadow-[0_0_12px_rgba(var(--primary-rgb),0.3)]":
                variant === "default" && color === "primary",
              "shadow-[0_0_12px_rgba(var(--error-rgb),0.5)] dark:shadow-[0_0_12px_rgba(var(--error-rgb),0.3)]":
                variant === "default" && color === "error",
            }
          )}
        >
          {variant === "striped" && (
            <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.15)_50%,rgba(255,255,255,.15)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem] animate-[progress-stripe_1s_linear_infinite]" />
          )}
        </motion.div>
      </div>
      {showValue && (
        <div className="mt-1 text-sm font-medium text-foreground-secondary text-right">
          {Math.round(percentage)}%
        </div>
      )}
    </div>
  );
}
