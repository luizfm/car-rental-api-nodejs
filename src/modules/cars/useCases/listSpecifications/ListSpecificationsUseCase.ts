import { inject, injectable } from "tsyringe";

import Specification from "@modules/cars/infra/typeorm/entities/Specification";
import SpecificationsRepository from "@modules/cars/infra/typeorm/repositories/SpecificationsRepository";

@injectable()
class ListSpecificationsUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: SpecificationsRepository
  ) {}

  async execute(): Promise<Specification[]> {
    return this.specificationsRepository.list();
  }
}

export default ListSpecificationsUseCase;
