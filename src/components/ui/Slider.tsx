// components/ui/Slider.tsx
import { useEffect, useRef } from "react";

import { cn } from "~/utils/cn";

interface SliderProps {
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
  value?: number;
  onChange?: (value: number) => void;
  showValue?: boolean;
  label?: string;
  className?: string;
}

export function Slider({
  min = 0,
  max = 100,
  step = 1,
  defaultValue,
  value: controlledValue,
  onChange,
  showValue = true,
  label,
  className,
}: SliderProps) {
  const isControlled = controlledValue !== undefined;
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const value = isControlled ? controlledValue : (defaultValue ?? min);

  const updateValue = (clientX: number) => {
    if (!trackRef.current) return;

    const rect = trackRef.current.getBoundingClientRect();
    const percentage = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
    const rawValue = min + percentage * (max - min);
    const steppedValue = Math.round(rawValue / step) * step;
    const clampedValue = Math.min(Math.max(steppedValue, min), max);

    onChange?.(clampedValue);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    isDragging.current = true;
    updateValue(e.clientX);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;
    updateValue(e.clientX);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    let newValue = value;
    switch (e.key) {
      case "ArrowRight":
      case "ArrowUp":
        newValue = Math.min(value + step, max);
        break;
      case "ArrowLeft":
      case "ArrowDown":
        newValue = Math.max(value - step, min);
        break;
      case "Home":
        newValue = min;
        break;
      case "End":
        newValue = max;
        break;
      default:
        return;
    }
    onChange?.(newValue);
  };

  useEffect(() => {
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={cn("flex flex-col gap-1 w-full", className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between gap-2 min-h-[1.5rem] w-full">
          {label && (
            <span className="text-sm font-medium text-foreground truncate flex-grow">{label}</span>
          )}
          {showValue && (
            <span className="text-sm font-medium text-foreground/70 tabular-nums tracking-tight shrink-0">
              {value.toFixed(step < 1 ? 1 : 0)}
            </span>
          )}
        </div>
      )}

      <div
        ref={trackRef}
        onMouseDown={handleMouseDown}
        className={cn(
          "relative h-8 flex items-center cursor-pointer",
          "group touch-none select-none"
        )}
      >
        <div className="absolute inset-0 flex items-center">
          <div className="w-full h-2 rounded-full bg-background-secondary">
            <div
              className="absolute h-full rounded-full bg-primary transition-all"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        <div
          role="slider"
          tabIndex={0}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          onKeyDown={handleKeyDown}
          className={cn(
            "absolute h-4 w-4 rounded-full bg-primary",
            "border-2 border-background",
            "shadow-sm shadow-black/10",
            "transition-shadow duration-200",
            "focus-visible:outline-none focus-visible:ring-2",
            "focus-visible:ring-ring focus-visible:ring-offset-2",
            "hover:shadow-md hover:shadow-black/20",
            "cursor-grab active:cursor-grabbing"
          )}
          style={{
            left: `${percentage}%`,
            transform: `translateX(-50%)`,
            touchAction: "none",
          }}
        />
      </div>
    </div>
  );
}
