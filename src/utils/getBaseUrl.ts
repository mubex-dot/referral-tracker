import type { Request } from "express";

export const getBaseUrl = (req?: Request): string => {
  if (process.env.APP_URL) {
    return process.env.APP_URL.replace(/\/$/, "");
  }

  if (req) {
    const origin = req.get("origin");
    if (origin) return origin;

    const host = req.get("host");
    return `${req.protocol}://${host}`;
  }

  return "http://localhost:3000";
};
