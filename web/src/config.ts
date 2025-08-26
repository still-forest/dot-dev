export const NODE_ENV = process.env.NODE_ENV || "development";

export const GITHUB_URL = "https://github.com/still-forest";
export const LINKEDIN_URL = "https://www.linkedin.com/in/jszymanowski";

export const CONTACT_SUBMISSION_URL = NODE_ENV === "production" ? "/api/contact" : "http://localhost:8080/api/contact";

export const contact = {
  email: "abroad.support@stillforest.dev", // TODO: move this to API / ENV var
};
