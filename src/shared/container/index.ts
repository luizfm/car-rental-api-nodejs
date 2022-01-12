import { container } from "tsyringe";

import UsersRepository from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import IUsersRepository from "@modules/accounts/repositories/IUsersRepository";
import CategoriesRepository from "@modules/cars/infra/typeorm/repositories/CategoriesRepository";
import SpecificationsRepository from "@modules/cars/infra/typeorm/repositories/SpecificationsRepository";
import ICarsRepository from "@modules/cars/repositories/ICarsRepository";
import ICategoriesRepository from "@modules/cars/repositories/ICategoriesRepository";
import ISpecificationsRepository from "@modules/cars/repositories/ISpecificationsRepository";

// CARS

container.registerSingleton<ICategoriesRepository>("CategoriesRepository", CategoriesRepository);
container.registerSingleton<ISpecificationsRepository>(
  "SpecificationsRepository",
  SpecificationsRepository
);
// container.registerSingleton<ICarsRepository>('CarsRepository', CarsRepository)

// ACCOUNTS
container.registerSingleton<IUsersRepository>("UsersRepository", UsersRepository);
