import { CONTACT_SUBMISSION_URL } from "@/config";
import type { FormData } from "./types";

const EMAIL_SUBJECT = "Still Forest: contact form submission";

const buildEmailBody = (data: FormData) => {
  return {
    email: data.email,
    message: data.message,
  };
};

export const formSubmit = async (data: FormData) => {
  const emailBody = buildEmailBody(data);

  const response = await fetch(CONTACT_SUBMISSION_URL, {
    method: "POST",
    body: JSON.stringify({ subject: EMAIL_SUBJECT, body: emailBody }),
  });

  if (!response.ok) {
    throw new Error("Failed to submit form");
  }

  return response.json();
};
