"use client";

import { MotionValue, motion } from "framer-motion";
import { ArrowRight, ChevronsDown, ScrollIcon } from "lucide-react";

import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { Text } from "~/components/ui/Text";

import { cn } from "~/utils/cn";

const LOGO_DIMENSIONS = {
  width: 1600,
  height: 800,
  sizes:
    "(max-width: 640px) 85vw, (max-width: 1024px) 800px, (max-width: 1280px) 1200px, (max-width: 1536px) 1400px, 1600px",
  quality: 100,
} as const;

interface HeroSectionProps {
  opacity: MotionValue<number>;
  scale: MotionValue<number>;
  y: MotionValue<number>;
}

export function HeroSection({ opacity, scale, y }: HeroSectionProps) {
  return (
    <motion.div
      style={{ opacity, scale, y }}
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col min-h-[90vh] justify-center overflow-hidden"
    >
      {/* Logo Section */}
      <div className="relative mx-auto pointer-events-none select-none mt-20 sm:-mt-40">
        <div
          className={cn(
            "w-[85vw] sm:w-auto max-w-[400px] sm:max-w-[600px] lg:max-w-[1000px] xl:max-w-[1200px] 2xl:max-w-[1600px]",
            "-mb-[40px] sm:-mb-[120px] lg:-mb-[160px] xl:-mb-[180px] 2xl:-mb-[200px]",
            "transform-gpu hover:scale-[1.2] transition-transform duration-1000 ease-out"
          )}
        >
          <Image
            src="/poe2logonobg.png"
            alt="POE2 Logo"
            className={cn(
              "pr-[6px] filter dark:invert dark:brightness-125 dark:contrast-125",
              "drop-shadow-[0_0_2px_rgba(0,0,0,0.8)] dark:drop-shadow-[0_0_2px_rgba(255,255,255,0.8)]",
              "h-auto w-full"
            )}
            {...LOGO_DIMENSIONS}
            priority
          />
        </div>
      </div>
      <Text
        variant="body-lg"
        color="secondary"
        className="max-w-2xl mx-auto text-center leading-relaxed -mt-16 sm:-mt-32 mb-8 px-4 sm:px-0 relative after:absolute after:inset-0 after:-z-10 after:bg-gradient-to-b after:from-background/60 after:via-background/40 after:to-transparent after:blur-md text-shadow-[0_1px_2px_rgba(0,0,0,0.1)]"
      >
        Essential tools for Path of Exile 2. Create and share builds, calculate precise DPS, and
        master your character optimization.
      </Text>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full max-w-full px-4 sm:px-0">
        <Link href="/build-planner" className="w-full sm:w-auto">
          <motion.button
            whileHover={{ scale: 1.03, opacity: 0.95 }}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg flex items-center justify-center gap-2 rounded-lg transition-all duration-300 
           bg-primary text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 
           focus:ring-offset-2 focus:ring-primary"
          >
            Build Planner
            <motion.div
              variants={{
                initial: { rotate: 0 },
                hover: { rotate: -45 },
              }}
              initial="initial"
              whileHover="hover"
              className="transition-transform duration-300"
            >
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </motion.button>
        </Link>

        <Link href="/dps-calc" className="w-full sm:w-auto">
          <motion.button
            whileHover={{ scale: 1.03, opacity: 0.95 }}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg flex items-center justify-center gap-2 rounded-lg transition-all duration-300 
           bg-secondary text-secondary-foreground hover:bg-secondary/90 focus:outline-none focus:ring-2 
           focus:ring-offset-2 focus:ring-secondary"
          >
            DPS Calculator
            <motion.div
              variants={{
                initial: { rotate: 0 },
                hover: { rotate: -45 },
              }}
              initial="initial"
              whileHover="hover"
              className="transition-transform duration-300"
            >
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </motion.button>
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.9 }}
        transition={{ delay: 1, duration: 1 }}
        className="flex flex-col items-center gap-2 mt-auto pt-28 md:pt-40"
      >
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <ScrollIcon className="w-6 h-6 text-secondary" />
        </motion.div>
        <ChevronsDown className="w-5 h-5 text-secondary mt-2" />
      </motion.div>
    </motion.div>
  );
}
