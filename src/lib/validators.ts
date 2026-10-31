// Password rules used to show form errors.

export function hasUppercase(value: string): boolean {
  return /[A-Z]/.test(value);
}

export function hasLowercase(value: string): boolean {
  return /[a-z]/.test(value);
}

export function hasMinLength(value: string, min = 6): boolean {
  return value.length >= min;
}

export function isPasswordValid(value: string): boolean {
  return hasUppercase(value) && hasLowercase(value) && hasMinLength(value);
}

// Returns a list of error messages for the given password.
export function passwordErrors(value: string): string[] {
  const errors: string[] = [];
  if (!hasUppercase(value)) errors.push("Must include at least one uppercase letter.");
  if (!hasLowercase(value)) errors.push("Must include at least one lowercase letter.");
  if (!hasMinLength(value)) errors.push("Must be at least 6 characters long.");
  return errors;
}
