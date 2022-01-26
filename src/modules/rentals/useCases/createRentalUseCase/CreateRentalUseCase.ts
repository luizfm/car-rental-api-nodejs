import { inject, injectable } from "tsyringe";

import ICarsRepository from "@modules/cars/repositories/ICarsRepository";
import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import Rental from "@modules/rentals/infra/typeorm/entities/Rental";
import IRentalsRepository from "@modules/rentals/repositories/IRentalsRepository";
import IDateProvider from "@shared/container/providers/DateProvider/IDateProvider";
import AppError from "@shared/errors/AppError";

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute({ user_id, car_id, expected_return_date }: ICreateRentalDTO): Promise<Rental> {
    const minimumRentalHours = 24;
    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id);

    if (carUnavailable) {
      throw new AppError("This car is unavailable!");
    }

    const userUnavailable = await this.rentalsRepository.findOpenRentalByUser(user_id);

    if (userUnavailable) {
      throw new AppError("There is a rental in progress for this user");
    }

    const dateNow = this.dateProvider.convertToUTC(new Date());
    const dateToCompare = this.dateProvider.convertToUTC(expected_return_date);
    const compare = this.dateProvider.compareInHours(dateNow, dateToCompare);

    if (compare < minimumRentalHours) {
      throw new AppError("Invalid return time. The rental should be bigger than 24 hours");
    }

    const rental = await this.rentalsRepository.create({ user_id, car_id, expected_return_date });

    await this.carsRepository.updateAvailable(car_id, false);

    return rental;
  }
}

export default CreateRentalUseCase;
