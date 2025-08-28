import { isProduction } from "./environment";

export * from "./environment";

export const GITHUB_URL = "https://github.com/still-forest";
export const LINKEDIN_URL = "https://www.linkedin.com/in/jszymanowski";

export const operatorEmailUrl = process.env.OPERATOR_EMAIL_URL || "http://operator.test/api/email";

export const CONTACT_FORM_RATE_LIMIT_MS = isProduction ? 60_000 : 5_000;
