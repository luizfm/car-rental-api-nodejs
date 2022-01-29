import IMailProvider from "../IMailProvider";

interface IMailDTO {
  to: string;
  subject: string;
  variables: any;
  path: string;
}

class MailProviderInMemory implements IMailProvider {
  private message: IMailDTO[] = [];

  async sendMail(to: string, subject: string, variables: any, path: string): Promise<void> {
    await this.message.push({
      to,
      subject,
      variables,
      path,
    });
  }
}

export default MailProviderInMemory;
