import { z } from "zod";

export const contactSchema = z
  .object({
    email: z.string().trim().email(),
    message: z.string().trim().min(10).max(1000),
  })
  .strict();

export type ContactFormData = z.infer<typeof contactSchema>;
