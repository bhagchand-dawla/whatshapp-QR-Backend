export const E164_PHONE_REGEX = /^\+[1-9]\d{7,14}$/;

export function validatePhone(phone: string): string | null {
  if (!phone) {
    return 'Phone number is required';
  }

  if (!E164_PHONE_REGEX.test(phone)) {
    return 'Phone must be valid E.164 format, e.g. +14155550100';
  }

  return null;
}
