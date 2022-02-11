import UsersRepositoryInMemory from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import UsersTokenRepositoryInMemory from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import DayjsDateProvider from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import MailProviderInMemory from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import AppError from "@shared/errors/AppError";

import SendForgotPasswordMailUseCase from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokenRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let mailProvider: MailProviderInMemory;

describe("Send Forgot mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokenRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    mailProvider = new MailProviderInMemory();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  });

  it("should be able to send a forgot password mail to user", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail");

    await usersRepositoryInMemory.create({
      driver_license: "23423",
      email: "teste@gmail.com",
      name: "John Doe",
      password: "1234",
    });

    await sendForgotPasswordMailUseCase.execute({ email: "teste@gmail.com" });

    expect(sendMail).toHaveBeenCalled();
  });

  it("should not be able to send an email if the user does not exist", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute({ email: "johndoe@gmail.com" })
    ).rejects.toEqual(new AppError("User does not exists"));
  });

  it("should be able to create a user's token", async () => {
    const createdToken = jest.spyOn(usersTokensRepositoryInMemory, "create");

    await usersRepositoryInMemory.create({
      driver_license: "2342123",
      email: "newmail@gmail.com",
      name: "Mary",
      password: "1234",
    });

    await sendForgotPasswordMailUseCase.execute({ email: "newmail@gmail.com" });

    expect(createdToken).toHaveBeenCalled();
  });
});
