"use client";

import { cn } from "~/utils/cn";
import { Text } from "~/components/ui/Text";

interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function FormField({
  label,
  required,
  error,
  hint,
  icon,
  children,
  className
}: FormFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between">
        <Text className="text-sm text-foreground/60">{label}</Text>
        {required && (
          <Text className="text-xs text-destructive">Required</Text>
        )}
      </div>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        {children}
      </div>
      {error ? (
        <Text className="text-sm text-destructive">{error}</Text>
      ) : hint ? (
        <Text className="text-xs text-foreground/40">{hint}</Text>
      ) : null}
    </div>
  );
}
