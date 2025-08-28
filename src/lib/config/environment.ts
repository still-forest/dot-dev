type AppEnvironment = "development" | "staging" | "production" | "test";

export const environment: AppEnvironment = (process.env.APP_ENV || "development") as AppEnvironment;
export const isProduction = environment === "production";
export const isDevelopment = environment === "development";
export const isStaging = environment === "staging";
export const isTestEnvironment = environment === "test";
