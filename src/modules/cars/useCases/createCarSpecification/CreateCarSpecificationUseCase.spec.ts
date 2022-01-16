import CarsRepositoryInMemory from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import SpecificationsRepositoryInMemory from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";
import AppError from "@shared/errors/AppError";

import CreateCarSpecificationUseCase from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe("Create Car Specification", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory
    );
  });

  it("should not be able to create a add a new specification to a non-existent car", () => {
    expect(async () => {
      const car_id = "123";
      const specifications_id = ["1", "2", "3"];

      await createCarSpecificationUseCase.execute({ car_id, specifications_id });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to create a new specification to the car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Gol",
      brand: "Volkswagen",
      category_id: "8ca62b36-20e3-411b-8eaa-bb7e73373df9",
      daily_rate: 100.0,
      fine_amount: 50.0,
      description: "Carro completo, 4 portas",
      license_plate: "ABC-1234",
    });

    const specification = await specificationsRepositoryInMemory.create({
      name: "4 portas",
      description: "Várias portas",
    });

    const specifications_id = [specification.id];

    const carUpdated = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id,
    });

    expect(carUpdated).toHaveProperty("specifications");
    expect(carUpdated.specifications.length).toBe(1);
  });
});
