"use client";

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
  const gradientElements = {
    default: (
      <div
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vh] h-[200vh]">
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--primary-color)_0%,var(--accent-color)_25%,transparent_60%)] opacity-[0.15] dark:opacity-[0.07] blur-[100px]"
            style={
              {
                "--primary-color": "hsl(var(--primary))",
                "--accent-color": "hsl(var(--accent))",
              } as CustomCSSProperties
            }
          />
        </div>
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
      <div className="absolute inset-0">
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
      </div>
    ),
    mesh: (
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--primary-color)_0%,transparent_50%)] opacity-[0.15] dark:opacity-[0.07] blur-[80px]"
          style={
            {
              "--primary-color": "hsl(var(--primary))",
            } as CustomCSSProperties
          }
        />
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
        <div
          className="absolute inset-0 bg-[conic-gradient(from_45deg_at_50%_50%,var(--secondary-color)_0%,transparent_25%,var(--secondary-color)_50%)] opacity-[0.1] dark:opacity-[0.05] blur-[60px]"
          style={
            {
              "--secondary-color": "hsl(var(--secondary))",
            } as CustomCSSProperties
          }
        />
      </div>
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
