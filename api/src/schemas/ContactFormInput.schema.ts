import validator from "validator";
import z from "zod";

const sanitizeString = (raw: unknown) => {
  if (typeof raw !== "string") return raw;
  return validator.escape(raw.trim().replace(/<[^>]*>/g, ""));
};

export const ContactFormInputSchema = z
  .object({
    subject: z.preprocess(sanitizeString, z.string().min(10).max(100)),
    body: z.preprocess(sanitizeString, z.string().min(10).max(1000)),
  })
  .strict();
