import type { Request } from "express";

export const getBaseUrl = (req?: Request): string => {
  // Prefer APP_URL
  if (process.env.APP_URL) {
    return process.env.APP_URL.replace(/\/$/, "");
  }

  // Fallback for development / testing environments
  if (req) {
    const origin = req.get("origin");
    if (origin) return origin;

    const host = req.get("host");
    return `${req.protocol}://${host}`;
  }

  // Default fallback for local usage
  return `http://${process.env.HOST}:${process.env.PORT}`;
};
