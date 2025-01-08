"use client";

import { AnimatePresence, motion } from "framer-motion";

import { KeyboardEvent, useCallback, useEffect, useRef, useState } from "react";

import { cn } from "~/utils/cn";

interface DropdownItem {
  label: string;
  value: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  itemClassName?: string;
  position?: "bottom-left" | "bottom-right" | "top-left" | "top-right";
  width?: "auto" | "trigger" | number;
  maxHeight?: number;
}

export function Dropdown({
  trigger,
  items,
  value,
  onChange,
  className,
  itemClassName,
  position = "bottom-left",
  width = "trigger",
  maxHeight = 300,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const getPositionStyles = useCallback(() => {
    if (!triggerRef.current) return {};

    const rect = triggerRef.current.getBoundingClientRect();
    const styles: Record<string, any> = {
      maxHeight,
      overflowY: "auto",
    };

    // Handle menu width
    if (width === "trigger") {
      styles.minWidth = rect.width;
    } else if (width === "auto") {
      styles.minWidth = "8rem"; // Minimum width for auto
    } else {
      styles.width = width;
    }

    switch (position) {
      case "bottom-right":
        styles.right = 0;
        styles.top = "100%";
        styles.marginTop = 8;
        break;
      case "top-left":
        styles.left = 0;
        styles.bottom = "100%";
        styles.marginBottom = 8;
        break;
      case "top-right":
        styles.right = 0;
        styles.bottom = "100%";
        styles.marginBottom = 8;
        break;
      default: // bottom-left
        styles.left = 0;
        styles.top = "100%";
        styles.marginTop = 8;
    }

    return styles;
  }, [position, width, maxHeight]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!isOpen) {
        if (event.key === "Enter" || event.key === " " || event.key === "ArrowDown") {
          event.preventDefault();
          setIsOpen(true);
          setActiveIndex(0);
        }
        return;
      }

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          setActiveIndex((prev) => (prev < items.length - 1 ? prev + 1 : prev));
          break;
        case "ArrowUp":
          event.preventDefault();
          setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
          break;
        case "Enter":
        case " ":
          event.preventDefault();
          if (activeIndex >= 0 && !items[activeIndex].disabled) {
            handleSelect(items[activeIndex].value);
          }
          break;
        case "Escape":
          event.preventDefault();
          setIsOpen(false);
          break;
      }
    },
    [isOpen, items.length, activeIndex]
  );

  useEffect(() => {
    if (isOpen && activeIndex >= 0 && menuRef.current) {
      const activeItem = menuRef.current.children[activeIndex] as HTMLElement;
      if (activeItem) {
        activeItem.scrollIntoView({ block: "nearest" });
      }
    }
  }, [activeIndex, isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setActiveIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = useCallback(
    (itemValue: string) => {
      onChange?.(itemValue);
      setIsOpen(false);
      setActiveIndex(-1);
    },
    [onChange]
  );

  const handleTriggerClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <div
      className={cn("relative inline-block", isOpen && "z-[100]", className)}
      ref={dropdownRef}
      onKeyDown={handleKeyDown}
    >
      <div
        ref={triggerRef}
        onClick={handleTriggerClick}
        role="button"
        tabIndex={0}
        aria-haspopup="true"
        aria-expanded={isOpen}
        className="outline-none focus:ring-2 focus:ring-primary/70 focus:ring-offset-2 rounded-md cursor-pointer"
      >
        {trigger}
      </div>

      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={getPositionStyles()}
            className={cn(
              "absolute",
              "bg-background/95 backdrop-blur-lg supports-[backdrop-filter]:bg-background/90",
              "border border-border/50 rounded-lg shadow-xl",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/70",
              "z-[100]"
            )}
            role="menu"
            aria-orientation="vertical"
            tabIndex={-1}
          >
            <div className="p-2 space-y-1">
              {items.map((item, index) => (
                <motion.button
                  key={item.value}
                  whileHover={{ backgroundColor: "rgba(0,0,0,0.1)" }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (!item.disabled) {
                      handleSelect(item.value);
                    }
                  }}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={cn(
                    "w-full px-4 py-2.5 text-left flex items-center gap-3",
                    "transition-all duration-150",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/70",
                    "rounded-md",
                    item.disabled
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-primary/10 hover:text-primary",
                    value === item.value && "text-primary font-medium bg-primary/5",
                    activeIndex === index && "bg-primary/10",
                    itemClassName,
                    item.className
                  )}
                  role="menuitem"
                  tabIndex={-1}
                  aria-disabled={item.disabled}
                  disabled={item.disabled}
                >
                  {item.icon}
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
