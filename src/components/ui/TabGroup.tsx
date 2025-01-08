"use client";

import { AnimatePresence, motion } from "framer-motion";

import { useEffect, useRef, useState } from "react";

import { cn } from "~/utils/cn";

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabGroupProps {
  tabs: Tab[];
  defaultTab?: string;
  value?: string;
  onChange?: (value: string) => void;
  variant?: "pills" | "underline" | "solid";
  className?: string;
}

const variants = {
  pills: {
    tab: "px-4 py-2 rounded-lg",
    active: "bg-primary text-primary-foreground shadow-lg",
    inactive: "hover:bg-primary/10 text-foreground/60",
    container: "p-1 bg-background/50 rounded-xl backdrop-blur-sm",
  },
  underline: {
    tab: "px-4 py-2 border-b-2",
    active: "border-primary text-primary",
    inactive: "border-transparent hover:border-border text-foreground/60",
    container: "border-b border-border/50",
  },
  solid: {
    tab: "px-4 py-2",
    active: "bg-background text-foreground border-t-2 border-primary rounded-t-lg",
    inactive: "bg-background/50 hover:bg-background/80 text-foreground/60",
    container: "bg-background/30 backdrop-blur-sm rounded-xl p-1",
  },
};

export function TabGroup({
  tabs,
  defaultTab,
  value: controlledValue,
  onChange,
  variant = "pills",
  className,
}: TabGroupProps) {
  const [localValue, setLocalValue] = useState(defaultTab || tabs[0]?.id);
  const [isClient, setIsClient] = useState(false);
  const isControlled = controlledValue !== undefined;
  const activeTab = isControlled ? controlledValue : localValue;
  const activeContent = tabs.find((tab) => tab.id === activeTab)?.content;
  const styles = variants[variant];

  // Enable animations only after hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleTabChange = (tabId: string) => {
    if (!isControlled) {
      setLocalValue(tabId);
    }
    onChange?.(tabId);
  };

  return (
    <div className={className}>
      {/* Tab Headers */}
      <div className={cn("flex gap-1 mb-8", styles.container)}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={cn(
              "relative transition-colors duration-200",
              "focus:outline-none focus:ring-2 focus:ring-primary/50",
              styles.tab,
              activeTab === tab.id ? styles.active : styles.inactive
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {isClient ? (
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="relative"
          >
            {activeContent}
          </motion.div>
        </AnimatePresence>
      ) : (
        <div className="relative">{activeContent}</div>
      )}
    </div>
  );
}
