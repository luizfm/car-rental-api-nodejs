import { inject, injectable } from "tsyringe";

import User from "@modules/accounts/infra/typeorm/entities/User";
import IUsersRepository from "@modules/accounts/repositories/IUsersRepository";
import AppError from "@shared/errors/AppError";
import { deleteFile } from "@utils/file";

interface IRequest {
  user_id: string;
  avatar_file: string;
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ user_id, avatar_file }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("User does not exists!", 404);
    }

    if (user.avatar) {
      await deleteFile(`./tmp/avatar/${user.avatar}`);
    }

    user.avatar = avatar_file;
    const newUser = await this.usersRepository.create(user);

    return newUser;
  }
}

export default UpdateUserAvatarUseCase;
