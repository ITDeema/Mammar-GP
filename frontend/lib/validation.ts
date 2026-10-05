// Shared form rules. Change them here and every screen follows.
export const MIN_PASSWORD_LENGTH = 8;
export const MAX_RESULT_NAME_LENGTH = 60;

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}