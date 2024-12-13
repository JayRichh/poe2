"use client";

import { type VariantProps, cva } from "class-variance-authority";
import { Loader2 } from "lucide-react";

import { forwardRef } from "react";

import { cn } from "~/utils/cn";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center whitespace-nowrap",
    "font-medium transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-background text-foreground",
          "border border-border/50",
          "shadow-sm hover:shadow-md",
          "hover:bg-muted/80 hover:border-border",
          "active:bg-muted active:shadow-sm",
        ],
        primary: [
          "bg-primary text-primary-foreground font-semibold",
          "border border-primary/20",
          "shadow-lg shadow-primary/20",
          "hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30",
          "active:bg-primary/80 active:shadow-md",
        ],
        secondary: [
          "bg-secondary text-secondary-foreground",
          "border border-secondary/30",
          "shadow-sm",
          "hover:bg-secondary/90 hover:border-secondary/40 hover:shadow-md",
          "active:bg-secondary/80",
        ],
        outline: [
          "border-2 text-foreground",
          "border-primary/80",
          "hover:bg-primary hover:text-primary-foreground hover:border-primary",
          "active:bg-primary/90",
          "shadow-sm hover:shadow-md",
        ],
        ghost: ["text-foreground", "hover:bg-muted hover:text-foreground/90", "active:bg-muted/80"],
        link: [
          "text-primary underline-offset-4",
          "hover:underline hover:bg-transparent",
          "active:text-primary/90",
          "h-auto p-0",
        ],
        destructive: [
          "bg-destructive/10 text-destructive font-semibold",
          "border border-destructive/30",
          "hover:bg-destructive hover:text-destructive-foreground",
          "hover:border-destructive hover:shadow-md hover:shadow-destructive/20",
          "active:bg-destructive/90",
        ],
      },
      size: {
        sm: "h-8 text-xs rounded-md px-3",
        md: "h-10 text-sm rounded-lg px-4",
        lg: "h-12 text-base rounded-lg px-6",
        icon: "h-10 w-10 rounded-lg p-0",
      },
      hasLeftIcon: {
        true: "pl-3",
        false: "",
      },
      hasRightIcon: {
        true: "pr-3",
        false: "",
      },
    },
    compoundVariants: [
      {
        size: "sm",
        hasLeftIcon: true,
        className: "pl-2.5",
      },
      {
        size: "sm",
        hasRightIcon: true,
        className: "pr-2.5",
      },
      {
        size: "lg",
        hasLeftIcon: true,
        className: "pl-5",
      },
      {
        size: "lg",
        hasRightIcon: true,
        className: "pr-5",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "md",
      hasLeftIcon: false,
      hasRightIcon: false,
    },
  }
);

const iconSizes: Record<NonNullable<VariantProps<typeof buttonVariants>["size"]>, string> = {
  sm: "h-3.5 w-3.5",
  md: "h-4 w-4",
  lg: "h-5 w-5",
  icon: "h-4 w-4",
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size = "md",
      isLoading,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const iconSize = iconSizes[size || "md"];

    return (
      <button
        className={cn(
          buttonVariants({
            variant,
            size,
            hasLeftIcon: !!leftIcon,
            hasRightIcon: !!rightIcon,
            className,
          })
        )}
        ref={ref}
        disabled={isLoading || disabled}
        {...props}
      >
        {isLoading ? (
          <Loader2 className={cn("animate-spin", iconSize)} />
        ) : (
          <>
            {leftIcon && (
              <span className={cn("inline-flex shrink-0 mr-2", iconSize)}>{leftIcon}</span>
            )}
            {children}
            {rightIcon && (
              <span className={cn("inline-flex shrink-0 ml-2", iconSize)}>{rightIcon}</span>
            )}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
