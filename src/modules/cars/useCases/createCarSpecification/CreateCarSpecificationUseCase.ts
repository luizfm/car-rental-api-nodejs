import { inject, injectable } from "tsyringe";

import Car from "@modules/cars/infra/typeorm/entities/Car";
import ICarsRepository from "@modules/cars/repositories/ICarsRepository";
import ISpecificationsRepository from "@modules/cars/repositories/ISpecificationsRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
  specifications_id: string[];
  car_id: string;
}

@injectable()
class CreateCarSpecificationUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,

    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute({ specifications_id, car_id }: IRequest): Promise<Car> {
    const car = await this.carsRepository.findCarById(car_id);

    if (!car) {
      throw new AppError("Car does not exist");
    }

    const specifications = await this.specificationsRepository.findByIds(specifications_id);

    car.specifications = specifications;

    return car;
  }
}

export default CreateCarSpecificationUseCase;
