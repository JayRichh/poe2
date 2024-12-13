import { ChevronDown } from "lucide-react";
import { cn } from "~/utils/cn";
import { Dropdown } from "./Dropdown";

interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  error?: boolean;
  width?: "auto" | "trigger" | number;
  position?: "bottom-left" | "bottom-right" | "top-left" | "top-right";
}

export function Select({
  value,
  onChange,
  options,
  placeholder = "Select an option",
  className,
  disabled,
  error,
  width = "trigger",
  position = "bottom-left"
}: SelectProps) {
  const selectedOption = options.find(opt => opt.value === value);

  const trigger = (
    <div
      className={cn(
        "flex items-center justify-between gap-2",
        "w-full px-3 py-2 text-sm",
        "bg-background border rounded-lg",
        "transition-colors duration-200",
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:border-primary/50",
        error ? "border-error" : "border-border",
        className
      )}
    >
      <span className={cn(
        "truncate",
        !selectedOption && "text-foreground-secondary"
      )}>
        {selectedOption ? selectedOption.label : placeholder}
      </span>
      <ChevronDown className="w-4 h-4 text-foreground-secondary flex-shrink-0" />
    </div>
  );

  return (
    <Dropdown
      trigger={trigger}
      items={options}
      value={value}
      onChange={onChange}
      width={width}
      position={position}
      className={cn(
        "w-full relative",
        disabled && "pointer-events-none"
      )}
    />
  );
}
