import { inject, injectable } from "tsyringe";

import Specification from "@modules/cars/infra/typeorm/entities/Specification";
import ISpecificationRepository from "@modules/cars/repositories/ISpecificationsRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationRepository: ISpecificationRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<Specification> {
    const checkSpecificationExists = await this.specificationRepository.findByName(name);

    if (checkSpecificationExists) {
      throw new AppError("Specification already exists");
    }

    return await this.specificationRepository.create({ name, description });
  }
}

export default CreateSpecificationUseCase;
