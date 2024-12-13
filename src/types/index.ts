export interface BaseResponse {
  success: boolean;
  message?: string;
}

export interface ApiError extends BaseResponse {
  error: string;
  code?: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

// Animation variants for consistent animations
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

export const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Theme types for consistent styling
export interface Theme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}
