import Specification from "@modules/cars/infra/typeorm/entities/Specification";

import ISpecificationsRepository, { ISpecificationDTO } from "../ISpecificationsRepository";

class SpecificationsRepositoryInMemory implements ISpecificationsRepository {
  private specifications: Specification[] = [];

  async create({ name, description }: ISpecificationDTO): Promise<Specification> {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
      created_at: new Date(),
    });

    await this.specifications.push(specification);

    return specification;
  }
  async findByName(name: string): Promise<Specification> {
    return await this.specifications.find((specification) => specification.name === name);
  }
  async list(): Promise<Specification[]> {
    return await this.specifications;
  }
  async findByIds(specifications_id): Promise<Specification[]> {
    return await this.specifications.filter((specification) =>
      specifications_id.includes(specification.id)
    );
  }
}

export default SpecificationsRepositoryInMemory;
