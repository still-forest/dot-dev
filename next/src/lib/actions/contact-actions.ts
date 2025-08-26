"use server";

import { z } from "zod";
import { CONTACT_SUBMISSION_URL } from "@/lib/config";

export const contactSchema = z.object({
  email: z.string().email(),
  message: z.string().min(10).max(1000),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export const contact = async (formData: ContactFormData) => {
  const { email, message } = formData;

  try {
    const response = await fetch(CONTACT_SUBMISSION_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fromEmail: email,
        body: message,
      }),
    });
    if (!response.ok) {
      throw new Error(`Failed to submit form: ${response.status} ${response.statusText}`);
    }
    return true;
  } catch (error) {
    throw new Error(`Failed to submit form: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
};
