"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { useHeaderScroll } from "~/hooks/useHeaderScroll";
import { usePathname } from "next/navigation";
import { cn } from "~/utils/cn";

const STORAGE_KEY = "beta-banner-seen";

export function WIPBanner() {
  const [hasAnimated, setHasAnimated] = useState(false);
  const isVisible = useHeaderScroll();
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 100], [1, 0.5]);

  const isHomePage = pathname === '/';
  const isSkillTree = pathname === '/skill-tree';
  const hasSubNav = ["/news", "/news/patch-notes", "/build-planner"].some(path => 
    pathname?.startsWith(path)
  );

  useEffect(() => {
    const hasSeen = localStorage.getItem(STORAGE_KEY);
    if (!hasSeen) {
      localStorage.setItem(STORAGE_KEY, "true");
      setHasAnimated(false);
    } else {
      setHasAnimated(true);
    }

    if (!hasSeen) {
      const timer = setTimeout(() => setHasAnimated(true), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className={cn(
      "fixed right-0 pointer-events-none z-[25]",
      "transition-all duration-300",
      isVisible 
        ? hasSubNav 
          ? "translate-y-24 sm:translate-y-28" 
          : "translate-y-12 sm:translate-y-16"
        : "translate-y-0",
      isHomePage || isSkillTree ? "top-4 sm:top-4" : hasSubNav ? "top-12 sm:top-12" : "top-12 sm:top-12"
    )}>
      <motion.div
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
          delay: 0.2,
        }}
        style={{ opacity }}
        className={cn(
          "w-[120px] h-[35px]",
          "bg-[#9F7E2B]",
          "text-xs font-bold",
          "flex items-center justify-center",
          "transition-opacity duration-300",
          "shadow-sm"
        )}
      >
        <span className="tracking-wider text-foreground">BETA</span>
      </motion.div>
    </div>
  );
}
