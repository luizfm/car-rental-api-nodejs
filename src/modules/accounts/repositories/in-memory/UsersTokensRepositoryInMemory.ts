import ICreateUserTokenDTO from "@modules/accounts/dtos/ICreateUserTokenDTO";
import UsersToken from "@modules/accounts/infra/typeorm/entities/UsersToken";

import IUsersTokenRepository from "../IUsersTokenRepository";

class UsersTokenRepositoryInMemory implements IUsersTokenRepository {
  private usersToken: UsersToken[] = [];

  async create({ user_id, expires_date, refresh_token }: ICreateUserTokenDTO): Promise<UsersToken> {
    const userToken = new UsersToken();

    Object.assign(userToken, {
      user_id,
      expires_date,
      refresh_token,
    });

    await this.usersToken.push(userToken);

    return userToken;
  }
  async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UsersToken> {
    return await this.usersToken.find(
      (userToken) => userToken.user_id === user_id && userToken.refresh_token === refresh_token
    );
  }
  async findByRefreshToken(token: string): Promise<UsersToken> {
    return await this.usersToken.find((userToken) => userToken.refresh_token === token);
  }
  async deleteById(id: string): Promise<void> {
    await this.usersToken.filter((userToken) => userToken.id !== id);
  }
}

export default UsersTokenRepositoryInMemory;
