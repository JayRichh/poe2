"use client";

import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { HeroSection } from "./HeroSection";

/**
 * Thin client island that owns the scroll-linked MotionValues for the hero so
 * the home page itself can remain a server component.
 */
export function HeroSectionWrapper() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.98]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 10]);

  return (
    <div ref={ref} className="w-full">
      <HeroSection opacity={opacity} scale={scale} y={y} />
    </div>
  );
}
