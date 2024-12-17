import type { Config } from "tailwindcss";
import type { PluginAPI } from "tailwindcss/types/config";

const config: Config = {
  content: ["./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        border: {
          DEFAULT: "hsl(var(--border))",
          secondary: "hsl(var(--border-secondary))",
        },
        background: {
          DEFAULT: "hsl(var(--background))",
          secondary: "hsl(var(--background-secondary))",
        },
        foreground: {
          DEFAULT: "hsl(var(--foreground))",
          secondary: "hsl(var(--foreground-secondary))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          50: "hsl(45, 80%, 97%)",
          100: "hsl(45, 80%, 92%)",
          200: "hsl(45, 80%, 85%)",
          300: "hsl(45, 80%, 75%)",
          400: "hsl(45, 80%, 65%)",
          500: "hsl(45, 80%, 55%)",
          600: "hsl(45, 80%, 45%)",
          700: "hsl(45, 80%, 35%)",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          50: "hsl(30, 70%, 97%)",
          100: "hsl(30, 70%, 92%)",
          200: "hsl(30, 70%, 85%)",
          300: "hsl(30, 70%, 75%)",
          400: "hsl(30, 70%, 65%)",
          500: "hsl(30, 70%, 55%)",
          600: "hsl(30, 70%, 45%)",
          700: "hsl(30, 70%, 35%)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          50: "hsl(145, 55%, 97%)",
          100: "hsl(145, 55%, 92%)",
          200: "hsl(145, 55%, 85%)",
          300: "hsl(145, 55%, 75%)",
          400: "hsl(145, 55%, 65%)",
          500: "hsl(145, 55%, 45%)",
          600: "hsl(145, 55%, 35%)",
          700: "hsl(145, 55%, 25%)",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        error: {
          DEFAULT: "hsl(var(--error))",
          foreground: "hsl(var(--error-foreground))",
        },
        surface: {
          DEFAULT: "hsl(var(--surface))",
          foreground: "hsl(var(--surface-foreground))",
        },
        // Damage type colors
        damage: {
          physical: {
            DEFAULT: "hsl(0, 0%, 80%)",
            light: "hsl(0, 0%, 90%)",
            dark: "hsl(0, 0%, 70%)",
          },
          fire: {
            DEFAULT: "hsl(0, 100%, 50%)",
            light: "hsl(0, 100%, 60%)",
            dark: "hsl(0, 100%, 40%)",
          },
          cold: {
            DEFAULT: "hsl(200, 100%, 50%)",
            light: "hsl(200, 100%, 60%)",
            dark: "hsl(200, 100%, 40%)",
          },
          lightning: {
            DEFAULT: "hsl(60, 100%, 50%)",
            light: "hsl(60, 100%, 60%)",
            dark: "hsl(60, 100%, 40%)",
          },
          chaos: {
            DEFAULT: "hsl(270, 100%, 50%)",
            light: "hsl(270, 100%, 60%)",
            dark: "hsl(270, 100%, 40%)",
          },
        },
      },
      spacing: {
        container: "2rem",
        section: "4rem",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 3px)",
      },
      fontFamily: {
        sans: ["IBM Plex Sans", "system-ui", "var(--font-geist-sans)"],
        mono: ["IBM Plex Mono", "monospace", "var(--font-geist-mono)"],
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "0.875rem", letterSpacing: "0.025em" }],
        xs: ["0.75rem", { lineHeight: "1rem", letterSpacing: "0.025em" }],
        sm: ["0.875rem", { lineHeight: "1.25rem", letterSpacing: "0.015em" }],
        base: ["1rem", { lineHeight: "1.5rem", letterSpacing: "0.01em" }],
        lg: ["1.125rem", { lineHeight: "1.75rem", letterSpacing: "0" }],
        xl: ["1.25rem", { lineHeight: "1.75rem", letterSpacing: "-0.0125em" }],
        "2xl": ["1.5rem", { lineHeight: "2rem", letterSpacing: "-0.0125em" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem", letterSpacing: "-0.025em" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem", letterSpacing: "-0.025em" }],
        "5xl": ["3rem", { lineHeight: "1.15", letterSpacing: "-0.025em" }],
      },
      animation: {
        gradient: "gradient 8s linear infinite",
        "gradient-fast": "gradient 4s linear infinite",
        "gradient-slow": "gradient 12s linear infinite",
        shimmer: "shimmer 2s infinite",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-primary": "linear-gradient(to right, #FFB800, #FF9500, #00B341)",
        "gradient-accent": "linear-gradient(to right, #FF9500, #00B341, #FFB800)",
        "gradient-secondary": "linear-gradient(to right, #00B341, #FFB800, #FF9500)",
        "gradient-amber": "linear-gradient(to right, #F59E0B, #FBBF24, #F97316)",
      },
      boxShadow: {
        subtle: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      },
    },
  },
  plugins: [
    {
      handler: ({ addComponents, addUtilities }: PluginAPI) => {
        addComponents({
          ".container": {
            width: "100%",
            marginLeft: "auto",
            marginRight: "auto",
            paddingLeft: "1.5rem",
            paddingRight: "1.5rem",
            "@screen sm": { maxWidth: "640px" },
            "@screen md": { maxWidth: "768px" },
            "@screen lg": { maxWidth: "1024px" },
            "@screen xl": { maxWidth: "1280px" },
          },
          ".card": {
            borderRadius: "var(--radius)",
            borderWidth: "1px",
            borderColor: "hsl(var(--border) / 0.6)",
            backgroundColor: "hsl(var(--background))",
            padding: "1.5rem",
            boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
          },
          ".input": {
            borderRadius: "calc(var(--radius) - 2px)",
            borderWidth: "1px",
            borderColor: "hsl(var(--border))",
            backgroundColor: "hsl(var(--background))",
            padding: "0.5rem 0.75rem",
            fontSize: "0.875rem",
            lineHeight: "1.25rem",
            width: "100%",
            boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
            transition: "all 200ms",
            "&:focus": {
              outline: "none",
              borderColor: "hsl(var(--primary) / 0.6)",
              boxShadow: "0 0 0 2px hsl(var(--primary) / 0.25)",
            },
          },
          ".button": {
            borderRadius: "calc(var(--radius) - 2px)",
            padding: "0.5rem 1rem",
            fontSize: "0.875rem",
            lineHeight: "1.25rem",
            fontWeight: "500",
            boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
            transition: "all 200ms",
            "&:focus": {
              outline: "none",
              boxShadow: "0 0 0 2px hsl(var(--primary) / 0.25)",
            },
          },
          // DPS Calculator specific components
          ".dps-panel": {
            borderRadius: "var(--radius)",
            borderWidth: "1px",
            borderColor: "hsl(var(--border) / 0.6)",
            backgroundColor: "hsl(var(--background))",
            padding: "1.5rem",
            boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
            transition: "all 200ms",
          },
          ".dps-input-group": {
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            marginBottom: "1rem",
          },
          ".dps-slider": {
            width: "100%",
            height: "2rem",
            padding: "0",
            "&::-webkit-slider-thumb": {
              width: "1rem",
              height: "1rem",
              borderRadius: "9999px",
              backgroundColor: "hsl(var(--primary))",
              border: "none",
              transition: "all 200ms",
              "&:hover": {
                transform: "scale(1.1)",
              },
            },
          },
        });
        addUtilities({
          ".text-shadow": {
            textShadow: "0 1px 2px rgb(0 0 0 / 0.1)",
          },
          ".text-shadow-sm": {
            textShadow: "0 1px 1px rgb(0 0 0 / 0.1)",
          },
          ".text-shadow-none": {
            textShadow: "none",
          },
          ".text-numeric": {
            fontFeatureSettings: '"tnum"',
            letterSpacing: "-0.025em",
          },
          ".gradient-text": {
            backgroundClip: "text !important",
            WebkitBackgroundClip: "text !important",
            WebkitTextFillColor: "transparent !important",
            display: "inline-block",
          },
          // DPS Calculator specific utilities
          ".dps-value": {
            fontFeatureSettings: '"tnum"',
            letterSpacing: "-0.025em",
            fontWeight: "600",
          },
          ".dps-label": {
            fontSize: "0.875rem",
            color: "hsl(var(--foreground-secondary))",
          },
        });
      },
    },
  ],
  darkMode: "class",
};

export default config;
