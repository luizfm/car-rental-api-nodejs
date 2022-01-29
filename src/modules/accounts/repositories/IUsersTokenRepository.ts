import ICreateUserTokenDTO from "../dtos/ICreateUserTokenDTO";
import UsersToken from "../infra/typeorm/entities/UsersToken";

interface IUsersTokenRepository {
  create({ user_id, expires_date, refresh_token }: ICreateUserTokenDTO): Promise<UsersToken>;
  findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UsersToken>;
  deleteById(id: string): Promise<void>;
}

export default IUsersTokenRepository;
