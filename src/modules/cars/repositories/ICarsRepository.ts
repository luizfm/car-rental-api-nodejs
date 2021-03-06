import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";

import Car from "../infra/typeorm/entities/Car";

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car>;
  findCarById(car_id: string): Promise<Car>;
  listAvailableCars(brand?: string, category_id?: string, name?: string): Promise<Car[]>;
  updateAvailable(car_id: string, available: boolean): Promise<void>;
}

export default ICarsRepository;
