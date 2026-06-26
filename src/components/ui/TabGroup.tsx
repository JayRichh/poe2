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
  const tablistRef = useRef<HTMLDivElement>(null);

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

  // Roving arrow-key navigation across the tablist (Left/Right/Home/End).
  const handleKeyDown = (e: React.KeyboardEvent) => {
    const keys = ["ArrowLeft", "ArrowRight", "Home", "End"];
    if (!keys.includes(e.key)) return;
    e.preventDefault();
    const currentIndex = tabs.findIndex((t) => t.id === activeTab);
    let nextIndex = currentIndex;
    if (e.key === "ArrowLeft") nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    if (e.key === "ArrowRight") nextIndex = (currentIndex + 1) % tabs.length;
    if (e.key === "Home") nextIndex = 0;
    if (e.key === "End") nextIndex = tabs.length - 1;
    const next = tabs[nextIndex];
    if (!next) return;
    handleTabChange(next.id);
    tablistRef.current
      ?.querySelector<HTMLButtonElement>(`[data-tab-id="${next.id}"]`)
      ?.focus();
  };

  return (
    <div className={className}>
      {/* Tab Headers — horizontally scrollable so many/long tabs never squish
          or overflow their container on narrow viewports. */}
      <div
        ref={tablistRef}
        role="tablist"
        aria-orientation="horizontal"
        onKeyDown={handleKeyDown}
        className={cn(
          "flex gap-1 mb-8 overflow-x-auto [scrollbar-width:thin]",
          styles.container
        )}
      >
        {tabs.map((tab) => {
          const selected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              data-tab-id={tab.id}
              id={`tab-${tab.id}`}
              aria-selected={selected}
              aria-controls={`panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => handleTabChange(tab.id)}
              className={cn(
                "relative shrink-0 whitespace-nowrap transition-colors duration-200",
                "focus:outline-none focus:ring-2 focus:ring-primary/50",
                styles.tab,
                selected ? styles.active : styles.inactive
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {isClient ? (
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            role="tabpanel"
            id={`panel-${activeTab}`}
            aria-labelledby={`tab-${activeTab}`}
            tabIndex={0}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="relative focus:outline-none"
          >
            {activeContent}
          </motion.div>
        </AnimatePresence>
      ) : (
        <div
          role="tabpanel"
          id={`panel-${activeTab}`}
          aria-labelledby={`tab-${activeTab}`}
          className="relative"
        >
          {activeContent}
        </div>
      )}
    </div>
  );
}
