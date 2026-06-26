// tailwind.config.js
import { type Config } from "tailwindcss";
import { type PluginAPI } from "tailwindcss/types/config";

const config: Config = {
  darkMode: "class",
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
        // Aged gold — the gilded half of the identity.
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          50: "hsl(43,58%,96%)",
          100: "hsl(43,58%,88%)",
          200: "hsl(43,56%,78%)",
          300: "hsl(43,55%,68%)",
          400: "hsl(43,54%,60%)",
          500: "hsl(43,54%,52%)",
          600: "hsl(43,56%,42%)",
          700: "hsl(43,58%,32%)",
        },
        // Dried crimson — the grimdark half; used for emphasis, not chrome.
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          50: "hsl(2,60%,96%)",
          100: "hsl(2,60%,88%)",
          200: "hsl(2,60%,78%)",
          300: "hsl(1,60%,67%)",
          400: "hsl(0,60%,57%)",
          500: "hsl(0,60%,48%)",
          600: "hsl(359,62%,39%)",
          700: "hsl(359,66%,30%)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          50: "hsl(150,48%,96%)",
          100: "hsl(150,48%,88%)",
          200: "hsl(150,46%,78%)",
          300: "hsl(150,45%,66%)",
          400: "hsl(150,45%,54%)",
          500: "hsl(150,46%,44%)",
          600: "hsl(150,48%,34%)",
          700: "hsl(150,50%,24%)",
        },
        // Skill-gem sockets as a functional data palette (STR/DEX/INT).
        gem: {
          ruby: {
            DEFAULT: "hsl(var(--gem-ruby))",
            soft: "hsl(358,55%,68%)",
          },
          emerald: {
            DEFAULT: "hsl(var(--gem-emerald))",
            soft: "hsl(153,45%,60%)",
          },
          sapphire: {
            DEFAULT: "hsl(var(--gem-sapphire))",
            soft: "hsl(218,75%,72%)",
          },
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
        // Aliases for the conventional shadcn token names used across the app.
        // Without these, `text-muted-foreground` / `bg-muted` / `bg-card` are
        // undefined utilities (no-ops) — which silently flattened the entire
        // site's text hierarchy and left several card surfaces unfilled.
        muted: {
          DEFAULT: "hsl(var(--background-secondary))",
          foreground: "hsl(var(--foreground-secondary))",
        },
        card: {
          DEFAULT: "hsl(var(--surface))",
          foreground: "hsl(var(--surface-foreground))",
        },
        damage: {
          physical: {
            DEFAULT: "hsl(0,0%,80%)",
            light: "hsl(0,0%,90%)",
            dark: "hsl(0,0%,70%)",
          },
          fire: {
            DEFAULT: "hsl(0,100%,50%)",
            light: "hsl(0,100%,60%)",
            dark: "hsl(0,100%,40%)",
          },
          cold: {
            DEFAULT: "hsl(200,100%,50%)",
            light: "hsl(200,100%,60%)",
            dark: "hsl(200,100%,40%)",
          },
          lightning: {
            DEFAULT: "hsl(60,100%,50%)",
            light: "hsl(60,100%,60%)",
            dark: "hsl(60,100%,40%)",
          },
          chaos: {
            DEFAULT: "hsl(270,100%,50%)",
            light: "hsl(270,100%,60%)",
            dark: "hsl(270,100%,40%)",
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
        sans: ["var(--font-plex-sans)", "IBM Plex Sans", "system-ui", "sans-serif"],
        mono: ["var(--font-plex-mono)", "IBM Plex Mono", "monospace"],
        display: ["var(--font-display)", "Cinzel", "Georgia", "serif"],
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "0.875rem", letterSpacing: "0.025em" }],
        xs: ["0.75rem", { lineHeight: "1rem", letterSpacing: "0.025em" }],
        sm: ["0.875rem", { lineHeight: "1.25rem", letterSpacing: "0.015em" }],
        base: ["1rem", { lineHeight: "1.5rem", letterSpacing: "0.01em" }],
        lg: ["1.125rem", { lineHeight: "1.75rem", letterSpacing: "0em" }],
        xl: ["1.25rem", { lineHeight: "1.75rem", letterSpacing: "-0.0125em" }],
        "2xl": ["1.5rem", { lineHeight: "2rem", letterSpacing: "-0.0125em" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem", letterSpacing: "-0.025em" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem", letterSpacing: "-0.025em" }],
        "5xl": ["3rem", { lineHeight: "1.15", letterSpacing: "-0.025em" }],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%,var(--tw-gradient-stops))",
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
            borderColor: "hsl(var(--border)/0.6)",
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
            transition: "colors 150ms ease-out",
            "&:focus": {
              outline: "none",
              borderColor: "hsl(var(--primary)/0.6)",
              boxShadow: "0 0 0 2px hsl(var(--primary)/0.25)",
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
              boxShadow: "0 0 0 2px hsl(var(--primary)/0.25)",
            },
          },
          ".dps-panel": {
            borderRadius: "var(--radius)",
            borderWidth: "1px",
            borderColor: "hsl(var(--border)/0.6)",
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
              transition: "colors 150ms ease-out",
            },
          },
        });
        addUtilities({
          ".text-shadow": { textShadow: "0 1px 2px rgb(0 0 0 / 0.1)" },
          ".text-shadow-sm": { textShadow: "0 1px 1px rgb(0 0 0 / 0.1)" },
          ".text-shadow-none": { textShadow: "none" },
          ".text-numeric": {
            fontFeatureSettings: '"tnum"',
            letterSpacing: "-0.025em",
          },
          ".gradient-text": {
            backgroundClip: "text!important",
            WebkitBackgroundClip: "text!important",
            WebkitTextFillColor: "transparent!important",
            display: "inline-block",
          },
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
};

export default config;
