import express from "express";
import { setupRoutes } from "./routers/apiRoutes.ts";

export const app = express();
const port = 3000;

// Middleware for logging requests
app.use((req, res, next) => {
  // Listen for the response to finish before logging
  res.on("finish", () => {
    console.log(
      `[${new Date().toUTCString()}] ${req.method} ${req.path} ${res.statusCode}`,
    );
  });
  next();
});

app.use(express.json());

setupRoutes(app);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
