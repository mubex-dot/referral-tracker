import express from "express";
import { setupRoutes } from "./routers/apiRoutes.ts";
import { loggerMiddleware } from "./middlewares/logger.ts";

export const app = express();
const PORT = process.env.PORT || 3000;

app.use(loggerMiddleware);

app.use(express.json());

setupRoutes(app);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
