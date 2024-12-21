import { AlertCircle, CheckCircle, Info } from "lucide-react";
import { cn } from "~/utils/cn";

interface AlertProps {
  children: React.ReactNode;
  variant?: "error" | "success" | "info";
  className?: string;
}

const variantStyles = {
  error: "bg-red-950/50 text-red-300 border-red-900/50",
  success: "bg-emerald-950/50 text-emerald-300 border-emerald-900/50",
  info: "bg-blue-950/50 text-blue-300 border-blue-900/50",
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
