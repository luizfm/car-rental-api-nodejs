import ICreateUserDTO from "@modules/accounts/dtos/ICreateUserDTO";
import UsersRepositoryInMemory from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import UsersTokenRepositoryInMemory from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import AuthenticateUserUseCase from "@modules/accounts/useCases/authenticateUser/AuthenticateUserUseCase";
import CreateUserUseCase from "@modules/accounts/useCases/createUserUseCase/CreateUserUseCase";
import DayjsDateProvider from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import AppError from "@shared/errors/AppError";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let usersTokenRepositoryInMemory: UsersTokenRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokenRepositoryInMemory = new UsersTokenRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      usersTokenRepositoryInMemory,
      dayjsDateProvider
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("should be able to authenticate a user", async () => {
    process.env.JWT_REFRESH_SECRET_KEY = "jwtRefreshSecretKey";
    process.env.JWT_SECRET_KEY = "jwtSecretKey";
    const user: ICreateUserDTO = {
      driver_license: "00120",
      email: "user@teste.com",
      password: "1234",
      name: "John Doe",
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty("token");
  });

  it("should not be able to authenticate a nonexistent user", async () => {
    expect(async () => {
      await authenticateUserUseCase.execute({ email: "test@email.com", password: "12345" });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to authenticate with incorrect password", async () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        name: "John Doe",
        email: "john.doe@gmail.com",
        driver_license: "99as9",
        password: "12345",
      };

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({ email: user.email, password: "wrong password" });
    }).rejects.toBeInstanceOf(AppError);
  });
});
