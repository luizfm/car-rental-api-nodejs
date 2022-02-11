import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import AppError from "@shared/errors/AppError";

interface IPayload {
  sub: string;
}

const ensureAuthenticated = async (request: Request, response: Response, next: NextFunction) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(token, process.env.JWT_SECRET_KEY) as IPayload;

    request.user = {
      id: user_id,
    };

    next();
  } catch (err) {
    console.log(err);
    throw new AppError("Invalid token", 401);
  }
};

export default ensureAuthenticated;
