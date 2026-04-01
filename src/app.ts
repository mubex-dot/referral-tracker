import express from "express";
import { setupRoutes } from "./routers/apiRoutes.ts";
import { loggerMiddleware } from "./middlewares/logger.ts";

export const app = express();
const HOST = process.env.HOST || "localhost";
const PORT = parseInt(process.env.PORT || "3000", 10);

console.log("Host: ", HOST);

app.use(loggerMiddleware);

app.use(express.json());

setupRoutes(app);

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
