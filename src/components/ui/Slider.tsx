import { useEffect, useRef, useState } from "react";

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
  const [mounted, setMounted] = useState(false);
  const isControlled = controlledValue !== undefined;
  const [localValue, setLocalValue] = useState(defaultValue ?? min);
  const value = isControlled ? controlledValue : localValue;

  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const updateValue = (clientX: number) => {
    if (!trackRef.current) return;

    const rect = trackRef.current.getBoundingClientRect();
    const percentage = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
    const rawValue = min + percentage * (max - min);
    const steppedValue = Math.round(rawValue / step) * step;
    const clampedValue = Math.min(Math.max(steppedValue, min), max);

    if (!isControlled) {
      setLocalValue(clampedValue);
    }
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
    if (!isControlled) {
      setLocalValue(newValue);
    }
    onChange?.(newValue);
  };

  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={cn("space-y-2", className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between">
          {label && <span className="text-sm font-medium text-foreground">{label}</span>}
          {showValue && (
            <span className="text-sm font-medium text-foreground/70">
              {value.toFixed(step < 1 ? 1 : 0)}
            </span>
          )}
        </div>
      )}

      <div
        ref={trackRef}
        onMouseDown={handleMouseDown}
        className={cn(
          "relative h-6 flex items-center cursor-pointer",
          "group touch-none select-none"
        )}
      >
        {/* Track background */}
        <div className="relative w-full h-1.5 rounded-full bg-slate-200">
          {/* Track fill */}
          <div
            className="absolute h-full rounded-full bg-blue-600"
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Thumb */}
        <div
          role="slider"
          tabIndex={0}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          onKeyDown={handleKeyDown}
          className={cn(
            "absolute h-4 w-4 rounded-full bg-blue-600",
            "border-2 border-white",
            "shadow-[0_0_0_3px_rgba(37,99,235,0.1)]",
            "transition-shadow",
            "focus-visible:outline-none focus-visible:ring-2",
            "focus-visible:ring-blue-600 focus-visible:ring-offset-2",
            "hover:shadow-[0_0_0_5px_rgba(37,99,235,0.1)]",
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
