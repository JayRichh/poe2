"use client";

import { Text } from "~/components/ui/Text";

interface ProgressBarProps {
  progress: number;
  label?: string;
  showPercentage?: boolean;
  className?: string;
}

export function ProgressBar({ 
  progress, 
  label, 
  showPercentage = true, 
  className = "" 
}: ProgressBarProps) {
  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <div className="flex justify-between text-xs text-foreground/60">
          <span>{label}</span>
          {showPercentage && <span>{progress}%</span>}
        </div>
      )}
      <div className="h-1 bg-border/50 rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary transition-all duration-500" 
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
