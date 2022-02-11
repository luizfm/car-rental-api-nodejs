import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import IUsersRepository from "@modules/accounts/repositories/IUsersRepository";
import IUsersTokenRepository from "@modules/accounts/repositories/IUsersTokenRepository";
import IDateProvider from "@shared/container/providers/DateProvider/IDateProvider";
import AppError from "@shared/errors/AppError";

interface IRequest {
  password: string;
  token: string;
}

@injectable()
class ResetPasswordUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UsersTokenRepository")
    private usersTokenRepository: IUsersTokenRepository,
    @inject("DayjsDateProvider")
    private dayjsDateProvider: IDateProvider
  ) {}

  async execute({ password, token }: IRequest): Promise<void> {
    const usersToken = await this.usersTokenRepository.findByRefreshToken(token);

    if (!usersToken) {
      throw new AppError("Token does not exists!");
    }

    const compareTokenDate = this.dayjsDateProvider.compareIfBefore(
      usersToken.expires_date,
      new Date()
    );

    if (compareTokenDate) {
      throw new AppError("Token expired");
    }

    const user = await this.usersRepository.findById(usersToken.user_id);
    user.password = await hash(password, 10);

    await this.usersRepository.create(user);

    await this.usersTokenRepository.deleteById(usersToken.id);
  }
}

export default ResetPasswordUseCase;
