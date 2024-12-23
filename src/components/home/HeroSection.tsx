"use client";

import { motion, MotionValue } from "framer-motion";
import { ArrowRight, ChevronsDown, ScrollIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Text } from "~/components/ui/Text";

interface HeroSectionProps {
  opacity: MotionValue<number>;
  scale: MotionValue<number>;
  y: MotionValue<number>;
}

export function HeroSection({ opacity, scale, y }: HeroSectionProps) {
  return (
    <motion.div
      style={{ opacity, scale, y }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-6"
    >
      <div className="relative mx-auto pointer-events-none select-none">
        <Image
          src="/poe2logonobg.png"
          alt="POE2 Logo"
          className="
            scale-150
            -mb-[120px]
            pr-[6px]
            filter
            dark:invert
            dark:brightness-125
            dark:contrast-125
            drop-shadow-[0_0_2px_rgba(0,0,0,0.8)]
            dark:drop-shadow-[0_0_2px_rgba(255,255,255,0.8)]
            [mask-image:radial-gradient(circle,white_70%,transparent_100%)]
            [mask-size:cover]
          "
          height="200"
          width="400"
          priority
        />
      </div>
      <Text
        variant="body-lg"
        color="secondary"
        className="text-xl max-w-2xl mx-auto text-center leading-relaxed pb-2"
      >
        Community-driven tools for Path of Exile 2 players. Plan builds, calculate DPS, and
        optimize gameplay.
      </Text>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
        <Link href="/build-planner">
          <motion.button
            whileHover={{ scale: 1.03, opacity: 0.95 }}
            className="px-8 py-4 text-lg flex items-center gap-2 rounded-lg transition-all duration-300 
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

        <Link href="/dps-calc">
          <motion.button
            whileHover={{ scale: 1.03, opacity: 0.95 }}
            className="px-8 py-4 text-lg flex items-center gap-2 rounded-lg transition-all duration-300 
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
        className="flex flex-col items-center gap-2 mt-20 md:mt-32"
      >
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <ScrollIcon className="w-6 h-6 text-secondary" />
        </motion.div>
        <ChevronsDown className="w-5 h-5 text-secondary mt-2" />
      </motion.div>
    </motion.div>
  );
}
