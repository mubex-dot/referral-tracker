import express from "express";
import { setupRoutes } from "./routers/apiRoutes.ts";
import { loggerMiddleware } from "./middlewares/logger.ts";

export const app = express();
const PORT = parseInt(process.env.PORT || "3000", 10);

app.use(loggerMiddleware);

app.use(express.json());

setupRoutes(app);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
