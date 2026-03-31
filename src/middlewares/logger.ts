import type { Request, Response, NextFunction } from "express";

export const loggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.on("finish", () => {
    console.log(
      `[${new Date().toUTCString()}] ${req.method} ${req.path} ${res.statusCode}`,
    );
  });
  next();
};
