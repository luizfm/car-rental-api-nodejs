import { inject, injectable } from "tsyringe";

import IRentalsRepository from "@modules/rentals/repositories/IRentalsRepository";

@injectable()
class ListRentalsByUserUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository
  ) {}

  async execute({ user_id }) {
    return await this.rentalsRepository.findAllRentalsByUser(user_id);
  }
}

export default ListRentalsByUserUseCase;
