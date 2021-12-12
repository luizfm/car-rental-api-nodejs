import Specification from "../../model/Specification";
import ISpecificationsRepository, { ISpecificationDTO } from "../ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository {
  private specifications: Specification[];

  private static INSTANCE: SpecificationsRepository;

  private constructor() {
    this.specifications = [];
  }

  public static getInstance(): SpecificationsRepository {
    if (!SpecificationsRepository.INSTANCE) {
      return (SpecificationsRepository.INSTANCE = new SpecificationsRepository());
    }

    return SpecificationsRepository.INSTANCE;
  }

  create({ name, description }: ISpecificationDTO): Specification {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
      created_at: new Date(),
    });

    this.specifications.push(specification);

    return specification;
  }

  findByName(name: string): Specification | null {
    const specification = this.specifications.find((item) => item.name === name);

    return specification;
  }

  list(): Specification[] {
    return this.specifications;
  }
}

export default SpecificationsRepository;
