"use client";

import { HTMLMotionProps, motion } from "framer-motion";

import { ReactNode, forwardRef } from "react";

interface ContainerProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children?: ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full" | "ultra";
  centered?: boolean;
  glass?: boolean;
  glassDark?: boolean;
  noPadding?: boolean;
  className?: string;
  innerClassName?: string;
  maxWidth?: boolean;
  gutter?: boolean;
  animate?: boolean;
}

const containerSizes = {
  sm: "max-w-3xl",
  md: "max-w-4xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
  ultra: "max-w-ultra",
  full: "max-w-full",
};

const defaultPadding = "px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10";
const defaultGutter = "px-4 sm:px-6 lg:px-8";

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      size = "lg",
      centered = true,
      glass = false,
      glassDark = false,
      noPadding = false,
      className = "",
      innerClassName = "",
      maxWidth = true,
      gutter = true,
      children,
      ...props
    },
    ref
  ) => {
    const containerStyles = `
      relative
      w-full
      ${maxWidth ? containerSizes[size] : ""}
      ${gutter && !noPadding ? defaultGutter : ""}
      ${!noPadding ? defaultPadding : ""}
      ${centered ? "mx-auto" : ""}
      ${className}
    `;

    const glassStyles =
      glass || glassDark
        ? `
      rounded-xl
      backdrop-blur-sm
      ${glass ? "glass" : ""}
      ${glassDark ? "dark:glass-dark" : ""}
      ${!noPadding ? "p-6 sm:p-8" : ""}
      overflow-hidden
    `
        : "";

    return (
      <motion.div
        ref={ref}
        initial={props.animate ? { opacity: 0, y: 20 } : undefined}
        whileInView={props.animate ? { opacity: 1, y: 0 } : undefined}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={containerStyles}
        {...props}
      >
        {glass || glassDark ? (
          <div className={`${glassStyles} ${innerClassName}`}>
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-white/0 dark:from-black/5 dark:to-black/0 rounded-xl pointer-events-none" />
            <div className="relative z-10">{children}</div>
          </div>
        ) : (
          <div className={innerClassName}>{children}</div>
        )}
      </motion.div>
    );
  }
);

Container.displayName = "Container";
