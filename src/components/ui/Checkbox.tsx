"use client";

import { Check } from "lucide-react";

import { forwardRef } from "react";

import { cn } from "~/utils/cn";

interface CheckboxProps {
  id: string;
  label?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ id, label, checked, onCheckedChange, disabled, className }, ref) => {
    return (
      <div className={cn("flex items-start gap-3", className)}>
        <div className="relative flex items-center">
          <button
            type="button"
            role="checkbox"
            aria-checked={checked}
            disabled={disabled}
            onClick={() => onCheckedChange?.(!checked)}
            className={cn(
              "flex h-5 w-5 items-center justify-center rounded border",
              "transition-colors duration-200",
              "border-border hover:border-primary/50",
              checked && "bg-primary border-primary",
              disabled && "opacity-50 cursor-not-allowed",
              !disabled && "cursor-pointer"
            )}
          >
            {checked && <Check className="h-3.5 w-3.5 text-primary-foreground" />}
          </button>
        </div>
        {label && (
          <button
            type="button"
            disabled={disabled}
            onClick={() => !disabled && onCheckedChange?.(!checked)}
            className={cn(
              "text-sm text-left leading-5",
              "hover:text-primary/90",
              "transition-colors duration-200",
              disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            )}
          >
            {label}
          </button>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
