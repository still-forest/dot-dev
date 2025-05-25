export const NODE_ENV = process.env.NODE_ENV;

export const GITHUB_URL = "https://github.com/still-forest";
export const LINKEDIN_URL = "https://www.linkedin.com/in/jszymanowski";
export const CONTACT_SUBMISSION_URL =
  NODE_ENV === "production" ? "https://operator.stillforest.dev/api/v1/email" : "http://localhost:8080/api/v1/email";
