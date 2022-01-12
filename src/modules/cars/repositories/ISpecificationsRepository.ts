import Specification from "@modules/cars/infra/typeorm/entities/Specification";

export interface ISpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  create({ name, description }: ISpecificationDTO): Promise<Specification>;
  findByName(name: string): Promise<Specification | null>;
  list(): Promise<Specification[]>;
}

export default ISpecificationsRepository;
