import { Router } from "express";
import {
  getAnalyticsSummary,
  getReferralAnalytics,
  getSingleReferralAnalytics,
} from "./controller.ts";

export const analyticsRoutes = Router();

analyticsRoutes.get("/", getAnalyticsSummary);

analyticsRoutes.get("/referral", getReferralAnalytics);

analyticsRoutes.get("/referral/:code", getSingleReferralAnalytics);
