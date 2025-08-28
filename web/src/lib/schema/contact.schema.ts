import validator from "validator";
import z from "zod";

export interface ContactFormInput {
  fromEmail: string;
  body: string;
}

const sanitizeString = (raw: unknown) => {
  if (typeof raw !== "string") return raw;
  return validator.escape(raw.trim().replace(/<[^>]*>/g, ""));
};

export const contactSchema = z
  .object({
    fromEmail: z.preprocess(sanitizeString, z.string().email()),
    body: z.preprocess(sanitizeString, z.string().min(10).max(1000)),
  })
  .strict();
