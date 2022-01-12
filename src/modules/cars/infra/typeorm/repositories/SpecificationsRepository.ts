import { getRepository, Repository } from "typeorm";

import Specification from "@modules/cars/infra/typeorm/entities/Specification";
import ISpecificationsRepository, {
  ISpecificationDTO,
} from "@modules/cars/repositories/ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async create({ name, description }: ISpecificationDTO): Promise<Specification> {
    const specification = await this.repository.create({
      name,
      description,
    });

    await this.repository.save(specification);

    return specification;
  }

  async findByName(name: string): Promise<Specification | null> {
    const specification = await this.repository.findOne({ name });

    return specification;
  }

  async list(): Promise<Specification[]> {
    return await this.repository.find();
  }
}

export default SpecificationsRepository;
