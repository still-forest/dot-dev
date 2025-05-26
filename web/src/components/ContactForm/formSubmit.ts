import { CONTACT_SUBMISSION_URL } from "@/config";
import type { FormData } from "./schema";

export const formSubmit = async (data: FormData) => {
  try {
    const response = await fetch(CONTACT_SUBMISSION_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fromEmail: data.email,
        body: data.message,
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
