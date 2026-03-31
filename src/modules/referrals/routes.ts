import { Router } from "express";
import { CreateReferral } from "./controller.ts";

const referralRoutes = Router();

referralRoutes.post("/", CreateReferral);

export default referralRoutes;
