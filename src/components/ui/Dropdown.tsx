import { AnimatePresence, motion } from "framer-motion";

import { KeyboardEvent, useCallback, useEffect, useRef, useState } from "react";

import { cn } from "~/utils/cn";

interface DropdownProps {
  trigger: React.ReactNode;
  items: {
    label: string;
    value: string;
    icon?: React.ReactNode;
    disabled?: boolean;
  }[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
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

    const menuWidth = width === "auto" ? "auto" : width === "trigger" ? "100%" : width;
    const rect = triggerRef.current.getBoundingClientRect();
    const styles: Record<string, any> = {
      width: menuWidth,
      maxHeight,
      overflowY: "auto",
    };

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

  const handleKeyDown = (event: KeyboardEvent) => {
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
  };

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
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  const handleSelect = (itemValue: string) => {
    onChange?.(itemValue);
    setIsOpen(false);
    setActiveIndex(-1);
  };

  return (
    <div
      className={cn("relative", isOpen && "z-[100]", className)}
      ref={dropdownRef}
      onKeyDown={handleKeyDown}
    >
      <div
        ref={triggerRef}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        role="button"
        tabIndex={0}
        aria-haspopup="true"
        aria-expanded={isOpen}
        className="outline-none focus:ring-2 focus:ring-primary/70 focus:ring-offset-2 rounded-md"
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
              "bg-background/90 backdrop-blur-md supports-[backdrop-filter]:bg-background/75",
              "border border-border rounded-lg shadow-lg",
              "focus:outline-none",
              "z-[100]"
            )}
            role="menu"
            aria-orientation="vertical"
            tabIndex={-1}
          >
            <div className="py-1">
              {items.map((item, index) => (
                <motion.button
                  key={item.value}
                  whileHover={{ backgroundColor: "rgba(0,0,0,0.1)" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!item.disabled) {
                      handleSelect(item.value);
                    }
                  }}
                  className={cn(
                    "w-full px-4 py-2.5 text-left flex items-center gap-2",
                    "transition-colors duration-150",
                    "focus:outline-none focus:bg-primary/15",
                    item.disabled ? "opacity-50 cursor-not-allowed" : "hover:text-primary",
                    value === item.value && "text-primary font-medium",
                    activeIndex === index && "bg-primary/10"
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
