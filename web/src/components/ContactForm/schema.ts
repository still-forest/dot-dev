import z from "zod";

export const formSchema = z.object({
  email: z.string().email(),
  message: z.string().min(10).max(1000),
});

export type FormData = z.infer<typeof formSchema>;
