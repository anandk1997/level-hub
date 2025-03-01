export const env = Object.freeze({
  API_URL: process.env.API_URL,
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
} as const);
