import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import AppError from "../../../../errors/AppError";
import ICreateUserDTO from "../../dtos/ICreateUserDTO";
import User from "../../entities/User";
import IUsersRepository from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ name, password, email, driver_license }: ICreateUserDTO): Promise<User> {
    const userExists = await this.usersRepository.findByEmail(email);

    if (userExists) {
      throw new AppError("User already exists");
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      password: hashedPassword,
      email,
      driver_license,
    });

    delete user.password;

    return user;
  }
}

export default CreateUserUseCase;
