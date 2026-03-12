import { z } from 'zod';

export const E164_PHONE_REGEX = /^\+[1-9]\d{7,14}$/;

export const createEntrySchema = z.object({
  phone: z
    .string({ required_error: 'Phone number is required' })
    .regex(E164_PHONE_REGEX, 'Phone must be valid E.164 format, e.g. +14155550100'),
});
