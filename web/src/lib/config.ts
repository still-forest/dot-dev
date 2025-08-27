export const environment = process.env.NODE_ENV || "development";
export const isProduction = environment === "production";
export const isDevelopment = environment === "development";

export const GITHUB_URL = "https://github.com/still-forest";
export const LINKEDIN_URL = "https://www.linkedin.com/in/jszymanowski";

export const CONTACT_SUBMISSION_URL = isProduction ? "/api/contact" : "http://localhost:8080/api/contact";
export const DEV_CONTACT_FROM_EMAIL = isDevelopment ? "dev@test.dev" : "";
