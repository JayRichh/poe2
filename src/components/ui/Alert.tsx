import { AlertCircle, CheckCircle, Info } from "lucide-react";

import { cn } from "~/utils/cn";

interface AlertProps {
  children: React.ReactNode;
  variant?: "error" | "success" | "info";
  className?: string;
}

// Driven by the theme tokens (--error/--success/--primary) so the one shared
// status primitive tracks the gilded/grimdark palette instead of fixed hues.
const variantStyles = {
  error: "bg-error/10 text-error border-error/30",
  success: "bg-success/10 text-success border-success/30",
  info: "bg-primary/10 text-primary border-primary/30",
};

const variantIcons = {
  error: AlertCircle,
  success: CheckCircle,
  info: Info,
};

export function Alert({ children, variant = "info", className }: AlertProps) {
  const Icon = variantIcons[variant];

  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-lg border p-4 backdrop-blur-sm shadow-sm",
        variantStyles[variant],
        className
      )}
      role="alert"
    >
      <Icon className="h-5 w-5 flex-shrink-0 opacity-80" />
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  );
}
