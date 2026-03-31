import type { Request, Response, Express } from "express";
import referralRoutes from "../modules/referrals/routes.ts";

export const setupRoutes = (app: Express) => {
  app.get("/", (req: Request, res: Response) => {
    res.send({
      name: "referral-tracker",
      version: "1.0.0",
      status: "OK",
    });
  });

  app.get("/health", (req: Request, res: Response) => {
    res.send({ status: "Ok!" });
  });

  //   NOTE: All app new routes are to be written here
  app.use("/referrals", referralRoutes);

  app.use("/", (req: Request, res: Response) => {
    res.status(404).send({ message: "endpoint not found" });
  });
};
