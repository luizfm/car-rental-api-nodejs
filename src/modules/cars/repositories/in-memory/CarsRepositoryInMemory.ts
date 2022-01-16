import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import Car from "@modules/cars/infra/typeorm/entities/Car";

import ICarsRepository from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async create({
    name,
    brand,
    category_id,
    daily_rate,
    fine_amount,
    description,
    license_plate,
    id,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      name,
      brand,
      category_id,
      daily_rate,
      fine_amount,
      description,
      license_plate,
      id,
    });

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return await this.cars.find((car) => car.license_plate === license_plate);
  }

  async listAvailableCars(brand?: string, name?: string, category_id?: string): Promise<Car[]> {
    return await this.cars
      .filter((car) => car.available)
      .filter(
        (car) =>
          (brand && car.brand.includes(brand)) ||
          (category_id && car.category_id.includes(category_id)) ||
          (name && car.name.includes(name))
      );
  }

  async findCarById(car_id: string): Promise<Car> {
    return await this.cars.find((car) => car.id === car_id);
  }
}

export default CarsRepositoryInMemory;
