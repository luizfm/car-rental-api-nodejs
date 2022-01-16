import { getRepository, Repository } from "typeorm";

import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import ICarsRepository from "@modules/cars/repositories/ICarsRepository";

import Car from "../entities/Car";

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create({
    id,
    name,
    brand,
    description,
    license_plate,
    fine_amount,
    daily_rate,
  }: ICreateCarDTO): Promise<Car> {
    const car = await this.repository.create({
      name,
      brand,
      license_plate,
      fine_amount,
      daily_rate,
      description,
      id,
    });

    await this.repository.save(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({ license_plate });

    return car;
  }

  async listAvailableCars(brand, category_id, name): Promise<Car[]> {
    const carsQuery = await this.repository
      .createQueryBuilder("cars")
      .where("available = :available", { available: true });

    if (brand) {
      carsQuery.andWhere("cars.brand LIKE :brand", { brand: `%${brand}%` });
    }

    if (category_id) {
      carsQuery.andWhere("cars.category_id LIKE :category_id", { category_id: `%${category_id}%` });
    }

    if (name) {
      carsQuery.andWhere("cars.name LIKE :name", { name: `%${name}%` });
    }

    return await carsQuery.getMany();
  }

  async findCarById(car_id: string): Promise<Car> {
    return await this.repository.findOne(car_id);
  }
}

export default CarsRepository;
