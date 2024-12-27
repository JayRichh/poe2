"use client";

import { motion } from "framer-motion";
import { cn } from "~/utils/cn";

interface Tab<T extends string> {
  id: T;
  label: string;
  icon?: React.ReactNode;
}

interface TabControlProps<T extends string> {
  tabs: Tab<T>[];
  activeTab: T;
  onChange: (tabId: T) => void;
  className?: string;
}

export function TabControl<T extends string>({ tabs, activeTab, onChange, className }: TabControlProps<T>) {
  return (
    <div className={cn("relative", className)}>
      <div className="flex items-center gap-1 p-1 rounded-lg bg-background/95 border border-border/50">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={cn(
                "relative flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors",
                "focus:outline-none focus:ring-2 focus:ring-primary/20",
                isActive ? "text-foreground" : "text-foreground/60 hover:text-foreground/80"
              )}
            >
              {tab.icon}
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-primary/10 rounded-md"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 mix-blend-normal">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
