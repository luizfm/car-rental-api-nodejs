import CarsRepositoryInMemory from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import CreateCarUseCase from "../createCar/CreateCarUseCase";
import ListCarsUseCase from "./ListAvailableCarsUseCase";

let carsRepository: CarsRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;
let listCarsUseCase: ListCarsUseCase;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
    listCarsUseCase = new ListCarsUseCase(carsRepository);
  });

  it("should be able to list cars", async () => {
    const car = {
      name: "Gol",
      brand: "Volkswagen",
      description: "Carro popular com 4 portas, completo",
      daily_rate: 100.0,
      fine_amount: 50.0,
      license_plate: "ABC-1240",
      category_id: "8ca62b36-20e3-411b-8eaa-bb7e73373df9",
    };

    await createCarUseCase.execute(car);
    const listedCars = await listCarsUseCase.execute({
      brand: "Volkswagen",
    });

    expect(listedCars[0]).toHaveProperty("available", true);
  });

  // it("should be able to list all available cars by name", () => {});
});
