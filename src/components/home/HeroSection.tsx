"use client";

import { MotionValue, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronsDown } from "lucide-react";

import Image from "next/image";
import Link from "next/link";

import { Text } from "~/components/ui/Text";

import { cn } from "~/utils/cn";

import { POE2_CURRENT_VERSION, POE2_MILESTONES } from "./poe2-timeline";

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
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <motion.div
      style={{ opacity, scale, y }}
      className="flex min-h-[90vh] flex-col justify-center overflow-hidden"
    >
      {/* Logo */}
      <div className="relative mx-auto mt-0 select-none pointer-events-none sm:-mt-60">
        <div
          className={cn(
            "w-[85vw] max-w-[400px] sm:w-auto sm:max-w-[600px] lg:max-w-[1000px] xl:max-w-[1200px] 2xl:max-w-[1600px]",
            "-mb-[40px] sm:-mb-[120px] lg:-mb-[160px] xl:-mb-[180px] 2xl:-mb-[200px]",
            "transform-gpu transition-transform duration-1000 ease-out motion-safe:hover:scale-[1.15]"
          )}
        >
          <Image
            src="/poe2logonobg.png"
            alt="Path of Exile 2"
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

      {/* Live patch badge */}
      <div className="relative z-10 -mt-12 mb-6 flex justify-center sm:-mt-28">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-sm">
          <span aria-hidden className="relative flex h-2 w-2">
            {!reduceMotion && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/70 opacity-75" />
            )}
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          Live: {POE2_CURRENT_VERSION.version} &ldquo;{POE2_CURRENT_VERSION.codename}&rdquo;
        </span>
      </div>

      <Text
        variant="h1"
        align="center"
        className="font-display tracking-tight text-gilded"
      >
        Track every update on the road to 1.0
      </Text>

      <Text
        variant="body-lg"
        color="secondary"
        className="relative mx-auto mb-8 mt-4 max-w-2xl px-4 text-center leading-relaxed sm:px-0"
      >
        A field guide to Path of Exile 2 in {POE2_MILESTONES.dataVersion} — the major patches,
        the live class roster, and the tools to plan around them. Builds, DPS, skill tree, and
        currency, all current.
      </Text>

      {/* Primary actions — real routes only */}
      <div className="flex w-full max-w-full flex-col items-center justify-center gap-4 px-4 sm:flex-row sm:px-0">
        <Link href="/build-planner/equipment" className="w-full sm:w-auto">
          <motion.button
            whileHover={reduceMotion ? undefined : { scale: 1.03 }}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-base text-primary-foreground transition-colors duration-300 hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:w-auto sm:px-8 sm:py-4 sm:text-lg"
          >
            Build Planner
            <ArrowRight className="h-5 w-5" />
          </motion.button>
        </Link>

        <Link href="/calculators/dps" className="w-full sm:w-auto">
          <motion.button
            whileHover={reduceMotion ? undefined : { scale: 1.03 }}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-border/60 bg-background/80 px-6 py-3 text-base text-foreground backdrop-blur-sm transition-colors duration-300 hover:border-primary/50 hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:w-auto sm:px-8 sm:py-4 sm:text-lg"
          >
            DPS Calculator
            <ArrowRight className="h-5 w-5" />
          </motion.button>
        </Link>
      </div>

      {/* Quiet milestone strip */}
      <div className="mx-auto mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4 text-sm text-foreground-secondary">
        <span>
          <span className="font-semibold text-foreground/90">Early Access</span> · still pre-1.0
        </span>
        <span aria-hidden className="hidden h-3 w-px bg-border-secondary/60 sm:block" />
        <span>
          1.0 target <span className="font-semibold text-foreground/90">{POE2_MILESTONES.fullLaunchTarget}</span>
        </span>
        <span aria-hidden className="hidden h-3 w-px bg-border-secondary/60 sm:block" />
        <span>{POE2_MILESTONES.exileCon}</span>
      </div>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={reduceMotion ? undefined : { opacity: 0.9 }}
        transition={{ delay: 1, duration: 1 }}
        className="mt-auto flex flex-col items-center gap-2 pt-20 md:pt-32"
        aria-hidden
      >
        <motion.div
          animate={reduceMotion ? undefined : { y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronsDown className="h-6 w-6 text-primary/70" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
