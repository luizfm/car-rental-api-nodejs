import { container } from "tsyringe";

import "@shared/container/providers";

import UsersRepository from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import UsersTokenRepository from "@modules/accounts/infra/typeorm/repositories/UsersTokenRepository";
import IUsersRepository from "@modules/accounts/repositories/IUsersRepository";
import IUsersTokenRepository from "@modules/accounts/repositories/IUsersTokenRepository";
import CarImagesRepository from "@modules/cars/infra/typeorm/repositories/CarImagesRepository";
import CarsRepository from "@modules/cars/infra/typeorm/repositories/CarsRepository";
import CategoriesRepository from "@modules/cars/infra/typeorm/repositories/CategoriesRepository";
import SpecificationsRepository from "@modules/cars/infra/typeorm/repositories/SpecificationsRepository";
import ICarImageRepository from "@modules/cars/repositories/ICarImageRepository";
import ICarsRepository from "@modules/cars/repositories/ICarsRepository";
import ICategoriesRepository from "@modules/cars/repositories/ICategoriesRepository";
import ISpecificationsRepository from "@modules/cars/repositories/ISpecificationsRepository";
import RentalsRepository from "@modules/rentals/infra/typeorm/repositories/RentalsRepository";
import IRentalsRepository from "@modules/rentals/repositories/IRentalsRepository";

// CARS

container.registerSingleton<ICategoriesRepository>("CategoriesRepository", CategoriesRepository);
container.registerSingleton<ISpecificationsRepository>(
  "SpecificationsRepository",
  SpecificationsRepository
);

container.registerSingleton<ICarsRepository>("CarsRepository", CarsRepository);
container.registerSingleton<ICarImageRepository>("CarImagesRepository", CarImagesRepository);

// ACCOUNTS
container.registerSingleton<IUsersRepository>("UsersRepository", UsersRepository);
container.registerSingleton<IUsersTokenRepository>("UsersTokenRepository", UsersTokenRepository);

// RENTALS

container.registerSingleton<IRentalsRepository>("RentalsRepository", RentalsRepository);
