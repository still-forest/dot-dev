"use server";

import { CONTACT_SUBMISSION_URL } from "@/lib/config";
import type { ContactFormData } from "@/lib/schema/contact-schema";

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
