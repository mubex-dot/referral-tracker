import express, { type Request, type Response } from "express";
import { apiRouter } from "routers/apiRoutes.js";

const app = express();
const port = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send({ name: "referral-tracker", version: "1.0.0", status: "OK" });
});

app.get("/health", (req: Request, res: Response) => {
  res.send({ status: "Ok!" });
});

app.use("/", apiRouter);

app.use("/", (req: Request, res: Response) => {
  res.status(404).send({ message: "endpoint not found" });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
