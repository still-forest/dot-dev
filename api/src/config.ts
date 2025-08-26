import "dotenv/config";

export const port = Number(process.env.PORT) || 8080;

export const productionOrigins = ["https://stillforest.dev", "https://www.stillforest.dev"];
