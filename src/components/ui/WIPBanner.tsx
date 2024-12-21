"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "~/utils/cn";

const STORAGE_KEY = "beta-banner-seen";

export function WIPBanner() {
  const [hasAnimated, setHasAnimated] = useState(false);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 100], [1, 0.5]);

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
    <div className="fixed top-0 right-0 z-20 pointer-events-none">
      <motion.div
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ 
          type: "spring",
          stiffness: 100,
          damping: 20,
          delay: 0.2
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
        <span className="tracking-wider text-black/90">BETA</span>
      </motion.div>
    </div>
  );
}
