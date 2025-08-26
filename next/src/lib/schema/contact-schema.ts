import { z } from "zod";

export const contactSchema = z.object({
  email: z.string().email(),
  message: z.string().min(10).max(1000),
});

export type ContactFormData = z.infer<typeof contactSchema>;
