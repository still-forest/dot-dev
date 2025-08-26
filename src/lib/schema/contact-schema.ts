import validator from "validator";
import { z } from "zod";

const sanitizeString = (raw: string) => {
  return validator.escape(raw.trim().replace(/<[^>]*>/g, ""));
};

export const contactSchema = z
  .object({
    email: z.string().trim().email(),
    message: z.string().trim().min(10).max(1000).transform(sanitizeString),
  })
  .strict();

export type ContactFormData = z.infer<typeof contactSchema>;
