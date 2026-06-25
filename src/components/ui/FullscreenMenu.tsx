"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Monitor, Moon, Sun, X } from "lucide-react";

import * as React from "react";
import { createPortal } from "react-dom";

import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";

import { NAV_GROUPS, QUICK_LINKS } from "~/config/nav";

import { cn } from "../../utils/cn";
import { Button } from "./Button";
import { Text } from "./Text";

const themeOptions = [
  { label: "Light", value: "light", icon: Sun },
  { label: "Dark", value: "dark", icon: Moon },
  { label: "System", value: "system", icon: Monitor },
];

const animations = {
  backdrop: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  },
  container: {
    hidden: { clipPath: "circle(0% at 95% 5%)" },
    visible: {
      clipPath: "circle(150% at 95% 5%)",
      transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
    },
    exit: {
      clipPath: "circle(0% at 95% 5%)",
      transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
    },
  },
  content: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delay: 0.3, duration: 0.4, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 },
    },
  },
  item: {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      x: -10,
      transition: { duration: 0.2 },
    },
  },
};

function NavigationSection({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate: (path: string) => void;
}) {
  return (
    <div className="space-y-6">
      <Text className="text-lg font-medium">Tools & Features</Text>
      <div className="grid gap-6">
        {NAV_GROUPS.map((group, index) => {
          const isActive = group.href ? pathname.startsWith(group.href) : false;
          const Icon = group.icon;

          return (
            <motion.div
              key={group.id}
              custom={index}
              variants={animations.item}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <div
                className={cn(
                  "w-full p-4 rounded-xl border-2 text-left transition-all",
                  isActive
                    ? "border-primary bg-primary/5"
                    : "border-border/50 bg-background/95 hover:border-primary/50"
                )}
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5" />
                    <Text className="font-medium">{group.label}</Text>
                  </div>
                  {group.description && (
                    <Text className="text-sm text-foreground/60">{group.description}</Text>
                  )}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {group.items.map((item) => {
                      const ItemIcon = item.icon;
                      return (
                        <button
                          key={item.id}
                          onClick={() => onNavigate(item.href)}
                          className="px-2 py-1 text-xs rounded-md bg-primary/10 text-primary/90 hover:bg-primary/20 transition-colors flex items-center gap-1.5"
                        >
                          <ItemIcon className="w-3 h-3" />
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function QuickLinksSection({ onNavigate }: { onNavigate: (path: string) => void }) {
  return (
    <div className="space-y-4">
      <Text className="text-lg font-medium">Quick Links</Text>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {QUICK_LINKS.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.button
              key={item.id}
              custom={index}
              variants={animations.item}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.6 + index * 0.1 }}
              onClick={() => onNavigate(item.href)}
              className="p-4 rounded-xl border-2 border-border/50 bg-background/95 hover:border-primary/50 transition-all"
            >
              <div className="flex flex-col items-center gap-2">
                <Icon className="h-5 w-5" />
                <Text className="text-sm font-medium text-center">{item.label}</Text>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

export function FullscreenMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();

  React.useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const handleNavigation = (path: string) => {
    onClose();
    router.push(path);
  };

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[99] pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={animations.backdrop}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[99] bg-gradient-to-br from-background/95 via-background to-background pointer-events-auto backdrop-blur-md"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      <motion.div
        ref={menuRef}
        variants={animations.container}
        initial="hidden"
        animate={isOpen ? "visible" : "hidden"}
        className={cn(
          "fixed inset-0 z-[100] flex min-h-screen w-screen flex-col bg-gradient-to-br from-background via-background to-background/90",
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
      >
        <motion.div
          variants={animations.content}
          initial="hidden"
          animate={isOpen ? "visible" : "hidden"}
          className="border-b border-border/50 px-6 py-4"
        >
          <div className="max-w-7xl w-full mx-auto flex items-center justify-between px-4 sm:px-8">
            <Text className="text-3xl font-bold">Menu</Text>
            <Button
              variant="ghost"
              size="lg"
              onClick={onClose}
              className="text-foreground hover:bg-background/95 p-3"
              aria-label="Close menu"
            >
              <X className="h-9 w-9" />
            </Button>
          </div>
        </motion.div>

        <motion.div
          variants={animations.content}
          initial="hidden"
          animate={isOpen ? "visible" : "hidden"}
          className="flex-1 overflow-y-auto overscroll-contain"
        >
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-16">
              <div className="space-y-12">
                <NavigationSection pathname={pathname} onNavigate={handleNavigation} />
                <QuickLinksSection onNavigate={handleNavigation} />
              </div>

              <div className="space-y-8">
                <Text className="text-lg font-medium">Settings</Text>
                <div className="space-y-6">
                  <div className="p-4 rounded-xl border-2 border-border/50 bg-background/95 space-y-4">
                    <Text className="font-medium">Theme</Text>
                    <div className="grid grid-cols-3 gap-4">
                      {themeOptions.map(({ label, value, icon: Icon }, index) => (
                        <motion.button
                          key={value}
                          custom={index}
                          variants={animations.item}
                          initial="hidden"
                          animate="visible"
                          transition={{ delay: 0.6 + index * 0.1 }}
                          onClick={() => setTheme(value)}
                          className={cn(
                            "p-4 rounded-xl border-2 transition-all",
                            theme === value
                              ? "border-primary bg-primary/5"
                              : "border-border/50 bg-background/95 hover:border-primary/50"
                          )}
                        >
                          <div className="flex flex-col items-center gap-2">
                            <Icon className="h-5 w-5" />
                            <Text className="text-sm font-medium">{label}</Text>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border-2 border-border/50 bg-background/95">
                    <div className="flex flex-col gap-2">
                      <Text className="font-medium">Features</Text>
                      <Text className="text-sm text-foreground/60">
                        More features coming soon...
                      </Text>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>,
    document.body
  );
}
