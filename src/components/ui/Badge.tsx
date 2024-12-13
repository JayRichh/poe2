"use client";

import { motion } from "framer-motion";

import * as React from "react";

import { cn } from "~/utils/cn";

type BadgeVariant = "default" | "outline" | "solid" | "secondary";
type BadgeColor = "primary" | "success" | "warning" | "error" | "info";
type BadgeSize = "sm" | "md" | "lg";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  color?: BadgeColor;
  size?: BadgeSize;
  icon?: React.ReactNode;
  removable?: boolean;
  onRemove?: () => void;
  pulse?: boolean;
  className?: string;
}

const colors: Record<BadgeColor, { base: string; solid: string }> = {
  primary: {
    base: "text-primary border-primary",
    solid: "bg-primary",
  },
  success: {
    base: "text-green-600 border-green-600",
    solid: "bg-green-600",
  },
  warning: {
    base: "text-amber-600 border-amber-600",
    solid: "bg-amber-600",
  },
  error: {
    base: "text-red-600 border-red-600",
    solid: "bg-red-600",
  },
  info: {
    base: "text-blue-600 border-blue-600",
    solid: "bg-blue-600",
  },
};

const sizes: Record<BadgeSize, string> = {
  sm: "text-xs px-2 py-0.5 gap-1",
  md: "text-sm px-2.5 py-1 gap-1.5",
  lg: "text-base px-3 py-1.5 gap-2",
};

export function Badge({
  children,
  variant = "default",
  color = "primary",
  size = "md",
  icon,
  removable = false,
  onRemove,
  pulse = false,
  className,
}: BadgeProps) {
  const colorStyle = colors[color];
  const baseStyles = cn(
    "inline-flex items-center justify-center",
    "font-medium rounded-full",
    "transition-colors duration-200",
    sizes[size],
    variant === "solid"
      ? colorStyle.solid
      : cn(
          colorStyle.base,
          variant === "default" && `bg-${color}-100 dark:bg-${color}-900/20`,
          variant === "outline" && "bg-transparent",
          variant === "secondary" &&
            "bg-muted/50 text-muted-foreground hover:bg-muted/80 border border-muted"
        ),
    className
  );

  return (
    <motion.span initial={{ scale: 0.95 }} animate={{ scale: 1 }} className={baseStyles}>
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span
            className={cn(
              "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
              variant === "solid" ? "bg-white" : colorStyle.base
            )}
          />
          <span
            className={cn(
              "relative inline-flex rounded-full h-2 w-2",
              variant === "solid" ? "bg-white" : colorStyle.base
            )}
          />
        </span>
      )}

      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span className="truncate">{children}</span>

      {removable && (
        <button
          onClick={onRemove}
          className={cn(
            "flex-shrink-0 ml-1 -mr-1 p-0.5",
            "hover:bg-black/10 dark:hover:bg-white/10",
            "rounded-full transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-current/25"
          )}
        >
          <svg
            className="w-3 h-3"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M1 1L11 11M1 11L11 1" />
          </svg>
        </button>
      )}
    </motion.span>
  );
}
