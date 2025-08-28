type AppEnvironment = "development" | "staging" | "production" | "test";
export const environment: AppEnvironment = (process.env.NODE_ENV || "development") as AppEnvironment;
export const isProduction = environment === "production";
export const isDevelopment = environment === "development";
export const isStaging = environment === "staging";
export const isTestEnvironment = environment === "test";

export const GITHUB_URL = "https://github.com/still-forest";
export const LINKEDIN_URL = "https://www.linkedin.com/in/jszymanowski";

export const operatorEmailUrl = process.env.OPERATOR_EMAIL_URL || "http://operator.test/api/email";

export const CONTACT_SUBMISSION_URL = isProduction ? "/api/contact" : "http://localhost:8080/api/contact";
export const DEV_CONTACT_FROM_EMAIL = isDevelopment ? "dev@test.dev" : "";
export const CONTACT_FORM_RATE_LIMIT_MS = 60_000;
