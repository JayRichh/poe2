"use client";

import { motion } from "framer-motion";

import { CSSProperties } from "react";

import { cn } from "~/utils/cn";

export interface GradientBackgroundProps {
  variant?: "default" | "radial" | "spotlight" | "mesh";
  interactive?: boolean;
  className?: string;
  children?: React.ReactNode;
}

interface CustomCSSProperties extends CSSProperties {
  "--primary-color"?: string;
  "--accent-color"?: string;
}

export const GradientBackground = ({
  variant = "default",
  interactive = false,
  className,
  children,
}: GradientBackgroundProps) => {
  const variants = {
    default: {
      initial: { scale: 1, opacity: 0.5 },
      animate: {
        scale: [1, 1.05, 1],
        opacity: [0.5, 0.6, 0.5],
      },
    },
    radial: {
      initial: { scale: 1, opacity: 0.4 },
      animate: {
        scale: [1, 1.1, 1],
        opacity: [0.4, 0.5, 0.4],
      },
    },
  };

  const gradientElements = {
    default: (
      <motion.div
        initial={variants.default.initial}
        animate={interactive ? undefined : variants.default.animate}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle_at_center,var(--primary-color)_0%,transparent_70%)] opacity-[0.15] dark:opacity-[0.07] blur-[100px]"
        style={
          {
            "--primary-color": "hsl(var(--primary))",
          } as CustomCSSProperties
        }
      />
    ),
    radial: (
      <motion.div
        initial={variants.radial.initial}
        animate={interactive ? undefined : variants.radial.animate}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px]"
      >
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--primary-color)_0%,var(--accent-color)_25%,transparent_60%)] opacity-[0.15] dark:opacity-[0.07] blur-[100px]"
          style={
            {
              "--primary-color": "hsl(var(--primary))",
              "--accent-color": "hsl(var(--accent))",
            } as CustomCSSProperties
          }
        />
      </motion.div>
    ),
    spotlight: null,
    mesh: null,
  };

  return (
    <div className={cn("relative w-full h-full overflow-hidden", className)}>
      <div className="absolute inset-0 bg-background/20" />
      <div className="absolute inset-0 flex items-center justify-center">
        {gradientElements[variant]}
      </div>
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
};
