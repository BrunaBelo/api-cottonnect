import express, { NextFunction, Request, Response } from "express";

import "express-async-errors";
import { getNewConnection } from "./database/connection";
import { routers } from "./routes/index.routes";

const PORT = 3000;
const HOST = "localhost";

getNewConnection();

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
    if (error instanceof Error) {
      return response.status(400).json({ error: error.message });
    }
    return response.status(500).json({ error: "Error not expected" });
  }
);

app.listen(PORT, HOST, () => console.log("Server is running!"));
