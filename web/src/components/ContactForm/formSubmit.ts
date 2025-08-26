import { CONTACT_SUBMISSION_URL } from "@/config";
import type { Result } from "@/lib/types";
import { RateLimitError } from "./RateLimitError";
import type { FormData } from "./schema";

export const formSubmit = async (data: FormData): Promise<Result<boolean>> => {
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
      if (response.status === 429) {
        return { success: false, error: new RateLimitError() };
      }
      throw new Error(`Failed to submit form: ${response.status} ${response.statusText}`);
    }
    return { success: true, data: true };
  } catch (error) {
    return { success: false, error: error as Error };
  }
};
