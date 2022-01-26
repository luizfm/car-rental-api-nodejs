import { ICreateRentalDTO } from "../dtos/ICreateRentalDTO";
import Rental from "../infra/typeorm/entities/Rental";

interface IRentalsRepository {
  create({
    user_id,
    car_id,
    id,
    end_date,
    expected_return_date,
    total,
  }: ICreateRentalDTO): Promise<Rental>;
  findOpenRentalByCar(car_id: string): Promise<Rental>;
  findOpenRentalByUser(user_id: string): Promise<Rental>;
  findById(id): Promise<Rental>;
}

export default IRentalsRepository;
