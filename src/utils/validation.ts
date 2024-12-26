export const NAME_MIN_LENGTH = 2;
export const NAME_MAX_LENGTH = 50;
export const NAME_PATTERN = /^[a-zA-Z0-9\s_-]+$/;

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export function validateName(name: string): ValidationResult {
  if (!name || name.trim().length === 0) {
    return { valid: false, error: "Name is required" };
  }

  if (name.length < NAME_MIN_LENGTH) {
    return { valid: false, error: `Name must be at least ${NAME_MIN_LENGTH} characters` };
  }

  if (name.length > NAME_MAX_LENGTH) {
    return { valid: false, error: `Name must be no more than ${NAME_MAX_LENGTH} characters` };
  }

  if (!NAME_PATTERN.test(name)) {
    return { valid: false, error: "Name can only contain letters, numbers, spaces, underscores and hyphens" };
  }

  return { valid: true };
}
