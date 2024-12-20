export type GradientVariant =
  | "primary"
  | "accent"
  | "secondary"
  | "error"
  | "radial"
  | "spotlight"
  | "mesh";

export interface GradientConfig {
  colors: string[];
  type: "linear" | "radial";
  direction?: string;
  opacity?: number;
  blur?: number;
}

export const gradients: Record<GradientVariant, GradientConfig> = {
  primary: {
    colors: ["#FFB800", "#FF9500", "#00B341"],
    type: "linear",
    direction: "to right",
  },
  accent: {
    colors: ["#FF9500", "#00B341", "#FFB800"],
    type: "linear",
    direction: "to right",
  },
  secondary: {
    colors: ["#00B341", "#FFB800", "#FF9500"],
    type: "linear",
    direction: "to right",
  },
  error: {
    colors: ["hsl(var(--error))", "hsl(var(--error)/0.8)", "hsl(var(--error)/0.6)"],
    type: "linear",
    direction: "to right",
  },
  radial: {
    colors: ["hsl(var(--primary))", "hsl(var(--accent))", "transparent"],
    type: "radial",
    opacity: 0.15,
    blur: 100,
  },
  spotlight: {
    colors: ["hsl(var(--primary))", "transparent"],
    type: "radial",
    opacity: 0.15,
    blur: 100,
  },
  mesh: {
    colors: ["hsl(var(--primary))", "hsl(var(--accent))", "transparent"],
    type: "radial",
    opacity: 0.1,
    blur: 80,
  },
};

export const getGradientStyle = (variant: GradientVariant, options?: Partial<GradientConfig>) => {
  const config = { ...gradients[variant], ...options };

  if (config.type === "linear") {
    return `linear-gradient(${config.direction}, ${config.colors.join(", ")})`;
  }

  if (config.type === "radial") {
    return `radial-gradient(circle at center, ${config.colors.join(", ")})`;
  }

  return "";
};

export const getGradientClassName = (variant: GradientVariant) => {
  const config = gradients[variant];

  if (config.type === "linear") {
    return "bg-gradient-to-r";
  }

  return "";
};
