import validator from "validator";
import { z } from "zod";

const sanitizeString = (raw: unknown) => {
  if (typeof raw !== "string") return raw;
  return validator.escape(raw.trim().replace(/<[^>]*>/g, ""));
};

export const contactSchema = z.object({
  email: z.string().email().transform(sanitizeString),
  message: z.string().min(10).max(1000).transform(sanitizeString),
});

export type ContactFormData = z.infer<typeof contactSchema>;
