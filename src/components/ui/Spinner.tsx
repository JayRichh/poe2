"use client";

import { cn } from "~/utils/cn";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  variant?: "default" | "primary";
  className?: string;
}

const sizeStyles = {
  sm: "h-4 w-4 border-2",
  md: "h-8 w-8 border-3",
  lg: "h-12 w-12 border-4",
};

const variantStyles = {
  default: "border-foreground/20 border-t-foreground",
  primary: "border-primary/20 border-t-primary",
};

export function Spinner({ size = "md", variant = "default", className }: SpinnerProps) {
  return (
    <div
      className={cn(
        "animate-spin rounded-full",
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
    />
  );
}

// Example usage
export function SpinnerDemo() {
  return (
    <div className="space-y-8">
      {/* Different sizes */}
      <div className="space-y-4">
        <div className="text-sm font-medium text-slate-600 dark:text-slate-400">
          Different Sizes
        </div>
        <div className="flex items-center gap-4">
          <Spinner size="sm" />
          <Spinner size="md" />
          <Spinner size="lg" />
        </div>
      </div>

      {/* Different variants */}
      <div className="space-y-4">
        <div className="text-sm font-medium text-slate-600 dark:text-slate-400">
          Different Variants
        </div>
        <div className="flex items-center gap-4">
          <Spinner variant="default" />
          <Spinner variant="primary" />
        </div>
      </div>
    </div>
  );
}

// Code preview
export const spinnerCode = `// Spinner Component Usage
// Basic usage with default style
<Spinner />

// Different sizes
<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />

// Different variants
<Spinner variant="default" />
<Spinner variant="primary" />`;
