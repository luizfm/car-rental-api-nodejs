import CarsRepositoryInMemory from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import CreateCarUseCase from "@modules/cars/useCases/createCar/CreateCarUseCase";
import AppError from "@shared/errors/AppError";

let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });
  it("should be able to create a car", async () => {
    const car = await createCarUseCase.execute({
      name: "Cayman",
      brand: "Porsche",
      daily_rate: 400,
      fine_amount: 1000,
      description: "A car from Porsche",
      license_plate: "ABC-1234",
      category_id: "category",
    });

    expect(car).toHaveProperty("id");
  });

  it("should not be able to create a car with an existent license plate", () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "Cayman",
        brand: "Porsche",
        daily_rate: 400,
        fine_amount: 1000,
        description: "A car from Porsche",
        license_plate: "ABC-1231",
        category_id: "category",
      });

      await createCarUseCase.execute({
        name: "Cayman",
        brand: "Porsche",
        daily_rate: 400,
        fine_amount: 1000,
        description: "A car from Porsche",
        license_plate: "ABC-1231",
        category_id: "category",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to register a car and get it available by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Cayman",
      brand: "Porsche",
      daily_rate: 400,
      fine_amount: 1000,
      description: "A car from Porsche",
      license_plate: "ABC-1231",
      category_id: "category",
    });

    expect(car).toHaveProperty("available", true);
  });
});
