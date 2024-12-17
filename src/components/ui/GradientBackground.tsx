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
  "--secondary-color"?: string;
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
    spotlight: {
      initial: { scale: 1, opacity: 0.3 },
      animate: {
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.4, 0.3],
      },
    },
    mesh: {
      initial: { scale: 1, opacity: 0.3 },
      animate: {
        scale: [1, 1.15, 1],
        opacity: [0.3, 0.4, 0.3],
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
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vh] h-[150vh] rounded-full bg-[radial-gradient(circle_at_center,var(--primary-color)_0%,transparent_70%)] opacity-[0.15] dark:opacity-[0.07] blur-[100px]"
        style={
          {
            "--primary-color": "hsl(var(--primary))",
          } as CustomCSSProperties
        }
      />
    ),
    radial: (
      <>
        <motion.div
          initial={variants.radial.initial}
          animate={interactive ? undefined : variants.radial.animate}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vh] h-[200vh]"
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
        <div 
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--secondary-color)_70%,transparent_100%)] opacity-[0.1] dark:opacity-[0.05]"
          style={
            {
              "--secondary-color": "hsl(var(--secondary))",
            } as CustomCSSProperties
          }
        />
      </>
    ),
    spotlight: (
      <motion.div
        initial={variants.spotlight.initial}
        animate={interactive ? undefined : variants.spotlight.animate}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute inset-0"
      >
        <div 
          className="absolute top-0 -left-1/4 w-1/2 h-[200%] bg-[conic-gradient(from_0deg_at_50%_50%,var(--primary-color)_0%,transparent_60%)] opacity-[0.15] dark:opacity-[0.07] blur-[100px] rotate-45"
          style={
            {
              "--primary-color": "hsl(var(--primary))",
            } as CustomCSSProperties
          }
        />
        <div 
          className="absolute top-0 -right-1/4 w-1/2 h-[200%] bg-[conic-gradient(from_180deg_at_50%_50%,var(--accent-color)_0%,transparent_60%)] opacity-[0.15] dark:opacity-[0.07] blur-[100px] -rotate-45"
          style={
            {
              "--accent-color": "hsl(var(--accent))",
            } as CustomCSSProperties
          }
        />
      </motion.div>
    ),
    mesh: (
      <>
        <motion.div
          initial={variants.mesh.initial}
          animate={interactive ? undefined : variants.mesh.animate}
          transition={{
            duration: 30,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute inset-0"
        >
          {/* Base gradient */}
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--primary-color)_0%,transparent_50%)] opacity-[0.15] dark:opacity-[0.07] blur-[80px]"
            style={
              {
                "--primary-color": "hsl(var(--primary))",
              } as CustomCSSProperties
            }
          />
          {/* Mesh pattern */}
          <div
            className="absolute inset-0 bg-[repeating-linear-gradient(45deg,var(--primary-color)_0%,transparent_10%)] opacity-[0.07] dark:opacity-[0.03]"
            style={
              {
                "--primary-color": "hsl(var(--primary))",
              } as CustomCSSProperties
            }
          />
          <div
            className="absolute inset-0 bg-[repeating-linear-gradient(-45deg,var(--accent-color)_0%,transparent_10%)] opacity-[0.07] dark:opacity-[0.03]"
            style={
              {
                "--accent-color": "hsl(var(--accent))",
              } as CustomCSSProperties
            }
          />
          {/* Accent highlights */}
          <motion.div
            className="absolute inset-0 bg-[conic-gradient(from_45deg_at_50%_50%,var(--secondary-color)_0%,transparent_25%,var(--secondary-color)_50%)] opacity-[0.1] dark:opacity-[0.05] blur-[60px]"
            style={
              {
                "--secondary-color": "hsl(var(--secondary))",
              } as CustomCSSProperties
            }
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </motion.div>
      </>
    ),
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
