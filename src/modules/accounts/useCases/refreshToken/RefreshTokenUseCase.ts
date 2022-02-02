import { verify, sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "@config/auth";
import IUsersTokenRepository from "@modules/accounts/repositories/IUsersTokenRepository";
import IDateProvider from "@shared/container/providers/DateProvider/IDateProvider";
import AppError from "@shared/errors/AppError";

interface IPayload {
  sub: string;
  email: string;
}

interface IRefreshToken {
  token: string;
  refresh_token: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("UsersTokenRepository")
    private usersTokenRepository: IUsersTokenRepository,
    @inject("DayjsDateProvider")
    private dayjsProvider: IDateProvider
  ) {}

  async execute(token: string): Promise<IRefreshToken> {
    const { sub: user_id, email } = verify(token, process.env.JWT_REFRESH_SECRET_KEY) as IPayload;

    const userToken = await this.usersTokenRepository.findByUserIdAndRefreshToken(user_id, token);

    if (!userToken) {
      throw new AppError("Refresh Token does not exists");
    }

    await this.usersTokenRepository.deleteById(userToken.id);

    const { expires_in_refresh_token, expires_in } = auth.jwt;

    const refresh_token = sign({ email }, process.env.JWT_REFRESH_SECRET_KEY, {
      subject: user_id,
      expiresIn: `${expires_in_refresh_token}d`,
    });

    const token_expires_date = this.dayjsProvider.addDays(expires_in_refresh_token);

    await this.usersTokenRepository.create({
      user_id,
      expires_date: token_expires_date,
      refresh_token: refresh_token,
    });

    const newToken = sign({}, process.env.JWT_SECRET_KEY, {
      subject: user_id,
      expiresIn: `${expires_in}m`,
    });

    console.log(refresh_token, token, newToken);

    return {
      refresh_token,
      token: newToken,
    };
  }
}

export default RefreshTokenUseCase;
