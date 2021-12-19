import { inject, injectable } from "tsyringe";

import AppError from "../../../../errors/AppError";
import Specification from "../../entities/Specification";
import ISpecificationRepository from "../../repositories/ISpecificationsRepository";

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
