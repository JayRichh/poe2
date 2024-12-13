"use client";

import { HTMLMotionProps, Variants, motion } from "framer-motion";

import { ReactNode, forwardRef } from "react";

import { cn } from "~/utils/cn";

const cardVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

interface CardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  variant?: "elevated" | "outlined" | "filled";
  interactive?: boolean;
  fullHeight?: boolean;
  noPadding?: boolean;
  children?: ReactNode;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = "elevated",
      interactive = false,
      fullHeight = false,
      noPadding = false,
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    return (
      <motion.div
        ref={ref}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className={cn(
          "rounded-lg",
          "flex flex-col",
          {
            "h-full": fullHeight,
            "min-h-0": !fullHeight,
            "p-6": !noPadding,
            "bg-background shadow-lg border border-border/50": variant === "elevated",
            "border-2 border-border": variant === "outlined",
            "bg-background-secondary": variant === "filled",
            "cursor-pointer": interactive,
          },
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = "Card";

interface CardHeaderProps {
  title: ReactNode;
  subtitle?: ReactNode;
  action?: ReactNode;
  className?: string;
}

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ title, subtitle, action, className = "" }, ref) => {
    return (
      <div ref={ref} className={cn("flex justify-between items-start gap-4 mb-4", className)}>
        <div className="flex-1 min-w-0">
          <div className="text-xl font-semibold text-foreground leading-tight truncate space-y-1">
            {title}
          </div>
          {subtitle && <div className="mt-2 text-base text-foreground-secondary">{subtitle}</div>}
        </div>
        {action && <div className="flex-shrink-0">{action}</div>}
      </div>
    );
  }
);

CardHeader.displayName = "CardHeader";

interface CardContentProps {
  children?: ReactNode;
  className?: string;
}

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className = "", children }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex-1 min-h-0 w-full", "text-foreground-secondary", className)}
      >
        {children}
      </div>
    );
  }
);

CardContent.displayName = "CardContent";

interface CardFooterProps {
  children?: ReactNode;
  className?: string;
  noBorder?: boolean;
}

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className = "", noBorder = false, children }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "mt-6",
          {
            "pt-4 border-t border-border": !noBorder,
          },
          className
        )}
      >
        {children}
      </div>
    );
  }
);

CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardContent, CardFooter };
