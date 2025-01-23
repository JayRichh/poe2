import { motion } from "framer-motion";
import { Info } from "lucide-react";

import { cn } from "~/utils/cn";

interface ChartContainerProps {
  title: string;
  chartId: string;
  children: React.ReactNode;
  className?: string;
  description?: string;
}

export const chartTheme = {
  background: "transparent",
  textColor: "hsl(var(--foreground))",
  fontSize: 12,
  axis: {
    domain: {
      line: {
        stroke: "hsl(var(--border))",
        strokeWidth: 1,
      },
    },
    ticks: {
      line: {
        stroke: "hsl(var(--border))",
        strokeWidth: 1,
      },
    },
  },
  grid: {
    line: {
      stroke: "hsl(var(--border))",
      strokeWidth: 1,
    },
  },
  tooltip: {
    container: {
      background: "hsl(var(--background))",
      color: "hsl(var(--foreground))",
      fontSize: "12px",
      borderRadius: "6px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      padding: "8px 12px",
    },
  },
  crosshair: {
    line: {
      stroke: "hsl(var(--primary))",
      strokeWidth: 1,
      strokeOpacity: 0.35,
    },
  },
};

export function ChartContainer({
  title,
  chartId,
  children,
  className,
  description,
}: ChartContainerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn("p-6 space-y-4", className)}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-foreground">{title}</h3>
        {description && (
          <div className="group relative">
            <Info className="w-4 h-4 text-foreground/60" />
            <div className="absolute right-0 top-6 w-64 p-2 rounded-md bg-background/95 border border-border/50 text-sm text-foreground/80 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
              {description}
            </div>
          </div>
        )}
      </div>
      <div className="w-full h-[400px]" id={chartId}>
        {children}
      </div>
    </motion.div>
  );
}
