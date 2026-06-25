// components/ui/Slider.tsx
"use client";

import { useId, useMemo } from "react";

import { cn } from "~/utils/cn";

interface SliderProps {
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
  value?: number;
  onChange?: (value: number) => void;
  /** When true (default) the current value is rendered next to the label. */
  showValue?: boolean;
  /** Optional formatter for the displayed value (only used when showValue). */
  formatValue?: (value: number) => string;
  label?: string;
  /** Accessible label when no visible `label` text is provided. */
  ariaLabel?: string;
  /** id of an external element that labels this slider. */
  ariaLabelledby?: string;
  className?: string;
  disabled?: boolean;
}

const snap = (raw: number, min: number, max: number, step: number): number => {
  if (step <= 0) return Math.min(Math.max(raw, min), max);
  const stepped = Math.round((raw - min) / step) * step + min;
  // Guard against floating point drift from fractional steps (e.g. 0.05).
  const decimals = (step.toString().split(".")[1] || "").length;
  const rounded = decimals > 0 ? Number(stepped.toFixed(decimals)) : stepped;
  return Math.min(Math.max(rounded, min), max);
};

export function Slider({
  min = 0,
  max = 100,
  step = 1,
  defaultValue,
  value: controlledValue,
  onChange,
  showValue = true,
  formatValue,
  label,
  ariaLabel,
  ariaLabelledby,
  className,
  disabled = false,
}: SliderProps) {
  const isControlled = controlledValue !== undefined;
  const generatedId = useId();
  const labelId = label ? `${generatedId}-label` : undefined;

  const rawValue = isControlled ? controlledValue : (defaultValue ?? min);
  const value = snap(rawValue, min, max, step);

  const emit = (next: number) => {
    const snapped = snap(next, min, max, step);
    if (snapped !== value) onChange?.(snapped);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    emit(Number(e.target.value));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Native range already handles Arrow (±step), PageUp/Down, Home, End.
    // We only augment Shift+Arrow for a 10× step jump and keep everything snapped.
    if (!e.shiftKey) return;
    let next = value;
    switch (e.key) {
      case "ArrowRight":
      case "ArrowUp":
        next = value + step * 10;
        break;
      case "ArrowLeft":
      case "ArrowDown":
        next = value - step * 10;
        break;
      default:
        return;
    }
    e.preventDefault();
    emit(next);
  };

  const percentage = max > min ? ((value - min) / (max - min)) * 100 : 0;
  const decimals = (step.toString().split(".")[1] || "").length;
  const displayValue = formatValue
    ? formatValue(value)
    : value.toFixed(step < 1 ? Math.max(decimals, 1) : 0);

  const trackStyle = useMemo(
    () => ({
      background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${percentage}%, hsl(var(--background-secondary)) ${percentage}%, hsl(var(--background-secondary)) 100%)`,
    }),
    [percentage]
  );

  return (
    <div className={cn("flex w-full flex-col gap-1", className)}>
      {(label || showValue) && (
        <div className="flex h-6 w-full items-center justify-between gap-2">
          {label ? (
            <span
              id={labelId}
              className="flex-grow truncate text-sm font-medium text-foreground"
            >
              {label}
            </span>
          ) : (
            <span className="flex-grow" />
          )}
          {showValue && (
            <span className="w-16 text-right text-sm font-medium tabular-nums tracking-tight text-foreground/70">
              {displayValue}
            </span>
          )}
        </div>
      )}

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        aria-label={!label ? ariaLabel : undefined}
        aria-labelledby={labelId ?? ariaLabelledby}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-valuetext={displayValue}
        className={cn(
          "dps-slider my-2 disabled:cursor-not-allowed disabled:opacity-50"
        )}
        style={trackStyle}
      />
    </div>
  );
}
