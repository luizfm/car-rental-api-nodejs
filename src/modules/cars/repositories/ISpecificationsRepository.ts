import Specification from "../model/Specification";

export interface ISpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  create({ name, description }: ISpecificationDTO): void;
  findByName(name: string): Specification;
  list(): Specification[];
}

export default ISpecificationsRepository;
