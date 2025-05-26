export const port = process.env.PORT || 8080;
export const environment = process.env.NODE_ENV || "development";
export const isProduction = environment === "production";
export const isDevelopment = environment === "development";

export const productionOrigins = ["https://stillforest.dev", "https://www.stillforest.dev"];
export const contactSubmissionUrl = process.env.CONTACT_SUBMISSION_URL || "http://test/api/contact";
