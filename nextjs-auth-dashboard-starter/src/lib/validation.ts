import { z } from "zod";

// Normalize whitespace then enforce 11 digits starting with 09
export const iranPhoneSchema = z.preprocess(
  (v) => (typeof v === "string" ? v.replace(/\s+/g, "") : v),
  z
    .string()
    .regex(/^09\d{9}$/, "Invalid Iranian mobile number (must be 11 digits starting with 09)")
);

export const loginSchema = z.object({
  phone: iranPhoneSchema
});

export type LoginInput = z.infer<typeof loginSchema>;
