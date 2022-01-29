import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import UsersTokenRepository from "@modules/accounts/infra/typeorm/repositories/UsersTokenRepository";
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
    const { sub: user_id } = verify(token, process.env.JWT_REFRESH_SECRET_KEY) as IPayload;

    const usersTokenRepository = new UsersTokenRepository();
    const userToken = await usersTokenRepository.findByUserIdAndRefreshToken(user_id, token);

    if (!userToken) {
      throw new AppError("Users does not exists!", 401);
    }

    request.user = {
      id: userToken.user_id,
    };

    next();
  } catch (err) {
    throw new AppError("Invalid token", 401);
  }
};

export default ensureAuthenticated;
