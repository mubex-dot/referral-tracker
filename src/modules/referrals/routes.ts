import { Router } from "express";
import {
  CreateReferral,
  GetAllReferrals,
  RedirectReferral,
  ConvertReferral,
} from "./controller.ts";

const referralRoutes = Router();

referralRoutes.post("/", CreateReferral);

referralRoutes.get("/", GetAllReferrals);

referralRoutes.get("/redirect/:code", RedirectReferral);

referralRoutes.post("/convert", ConvertReferral);

export default referralRoutes;
