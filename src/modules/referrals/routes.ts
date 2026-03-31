import { Router } from "express";
import {
  convertReferral,
  createReferral,
  getAllReferrals,
  redirectReferral,
} from "./controller.ts";

const referralRoutes = Router();

referralRoutes.post("/", createReferral);

referralRoutes.get("/", getAllReferrals);

referralRoutes.get("/redirect/:code", redirectReferral);

referralRoutes.post("/convert", convertReferral);

export default referralRoutes;
