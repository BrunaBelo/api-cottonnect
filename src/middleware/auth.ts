import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const auth = (request: Request, response: Response, next: NextFunction) => {
  const token = request.body.token || request.query.token || request.headers["x-access-token"];
  if (!token) {
    return response.status(403).send("A token is required for authentication");
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);

    request.user = {
      id: decoded['user_id'] as string,
    };

    next();
  } catch (error) {
    response.status(400).send("Invalid token.");
  }
};

export { auth };
