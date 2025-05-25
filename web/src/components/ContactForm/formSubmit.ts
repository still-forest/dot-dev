import { CONTACT_SUBMISSION_URL } from "@/config";
import type { FormData } from "./schema";

const EMAIL_SUBJECT = "Still Forest: contact form submission";

const buildEmailBody = (data: FormData) => {
  return `Email: ${data.email}\nMessage: ${data.message}`;
};

export const formSubmit = async (data: FormData) => {
  const emailBody = buildEmailBody(data);
  try {
    const response = await fetch(CONTACT_SUBMISSION_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ subject: EMAIL_SUBJECT, body: emailBody }),
    });
    if (!response.ok) {
      throw new Error(`Failed to submit form: ${response.status} ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    throw new Error(`Failed to submit form: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
};
