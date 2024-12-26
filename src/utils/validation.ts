export const NAME_MIN_LENGTH = 2;
export const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
export const ALLOWED_FILE_TYPES = ['application/json', 'text/plain'];
export const ALLOWED_FILE_EXTENSIONS = ['.json', '.txt'];
export const NAME_MAX_LENGTH = 50;
export const NAME_PATTERN = /^[a-zA-Z0-9\s_-]+$/;

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export function validateFile(file: File): ValidationResult {
  if (!file) {
    return { valid: false, error: "File is required" };
  }

  if (file.size > MAX_FILE_SIZE) {
    return { valid: false, error: "File size must not exceed 2MB" };
  }

  const fileExtension = `.${file.name.split('.').pop()?.toLowerCase()}`;
  if (!ALLOWED_FILE_EXTENSIONS.includes(fileExtension)) {
    return { 
      valid: false, 
      error: `Invalid file type. Allowed types: ${ALLOWED_FILE_EXTENSIONS.join(', ')}` 
    };
  }

  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    return { 
      valid: false, 
      error: `Invalid content type. Allowed types: ${ALLOWED_FILE_TYPES.join(', ')}` 
    };
  }

  return { valid: true };
}

export function sanitizeFileName(fileName: string): string {
  // Remove any path traversal attempts and dangerous characters
  const sanitized = fileName
    .replace(/[^a-zA-Z0-9._-]/g, '')  // Only allow alphanumeric, dots, underscores, and hyphens
    .replace(/\.{2,}/g, '.')          // Remove consecutive dots
    .replace(/^\.+|\.+$/g, '');       // Remove leading/trailing dots
    
  if (!sanitized) {
    return 'unnamed_file';
  }
  return sanitized;
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
