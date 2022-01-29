import { getRepository, Repository } from "typeorm";

import ICreateUserTokenDTO from "@modules/accounts/dtos/ICreateUserTokenDTO";
import IUsersTokenRepository from "@modules/accounts/repositories/IUsersTokenRepository";

import UsersToken from "../entities/UsersToken";

class UsersTokenRepository implements IUsersTokenRepository {
  private repository: Repository<UsersToken>;

  constructor() {
    this.repository = getRepository(UsersToken);
  }

  async create({ user_id, expires_date, refresh_token }: ICreateUserTokenDTO): Promise<UsersToken> {
    const userToken = await this.repository.create({
      user_id,
      expires_date,
      refresh_token,
    });

    await this.repository.save(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UsersToken> {
    return await this.repository.findOne({ user_id, refresh_token });
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export default UsersTokenRepository;
