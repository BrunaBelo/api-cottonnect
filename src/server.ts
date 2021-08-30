import express, { NextFunction, Request, Response } from "express";

import "express-async-errors";
import { AppError } from "./errors/app-error";
import { routers } from "./routes/index.routes";

const app = express();
app.use(express.json());
app.use(routers);
app.use(
  (
    error: Error,
    request: Request,
    response: Response,
    next: NextFunction
  ): Response => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({ message: error.message });
    }
    return response.status(500).json({ error: "Error not expected" });
  }
);

export { app };
