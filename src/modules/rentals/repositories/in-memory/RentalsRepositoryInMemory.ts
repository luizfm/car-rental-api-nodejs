import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import Rental from "@modules/rentals/infra/typeorm/entities/Rental";

import IRentalsRepository from "../IRentalsRepository";

class RentalsRepositoryInMemory implements IRentalsRepository {
  private rentals: Rental[] = [];

  async create({ user_id, car_id, expected_return_date }: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental();

    Object.assign(rental, {
      car_id,
      user_id,
      expected_return_date,
      start_date: new Date(),
    });

    await this.rentals.push(rental);

    return rental;
  }

  async findById(id: any): Promise<Rental> {
    return await this.rentals.find((rental) => rental.id === id);
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return await this.rentals.find((rental) => rental.car_id === car_id && !rental.end_date);
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return await this.rentals.find((rental) => rental.user_id === user_id && !rental.end_date);
  }
}

export default RentalsRepositoryInMemory;
