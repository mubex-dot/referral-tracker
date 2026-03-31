import { Router } from "express";
import {
  CreateReferral,
  GetAllReferrals,
  RedirectReferral,
} from "./controller.ts";

const referralRoutes = Router();

referralRoutes.post("/", CreateReferral);

referralRoutes.get("/", GetAllReferrals);

referralRoutes.get("/r/:code", RedirectReferral);

export default referralRoutes;
