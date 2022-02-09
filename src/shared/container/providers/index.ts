import { container } from "tsyringe";

import IDateProvider from "./DateProvider/IDateProvider";
import DayjsDateProvider from "./DateProvider/implementations/DayjsDateProvider";
import IMailProvider from "./MailProvider/IMailProvider";
import EtherealMailProvider from "./MailProvider/implementations/EtherealMailProvider";
import LocalStorageProvider from "./StoreProvider/implementations/LocalStorageProvider";
import S3StorageProvider from "./StoreProvider/implementations/S3StorageProvider";
import IStorageProvider from "./StoreProvider/IStorageProvider";

container.registerSingleton<IDateProvider>("DayjsDateProvider", DayjsDateProvider);

container.registerInstance<IMailProvider>("EtherealMailProvider", new EtherealMailProvider());

const diskStorage = {
  local: LocalStorageProvider,
  s3: S3StorageProvider,
};

console.log(diskStorage[process.env.DISK]);
container.registerSingleton<IStorageProvider>("StorageProvider", diskStorage[process.env.DISK]);
