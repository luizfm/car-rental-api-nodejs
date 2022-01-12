import CategoriesRepositoryInMemory from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";
import CreateCategoryUseCase from "@modules/cars/useCases/createCategory/CreateCategoryUseCase";
import AppError from "@shared/errors/AppError";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemo: CategoriesRepositoryInMemory;

describe("Create category", () => {
  beforeEach(() => {
    categoriesRepositoryInMemo = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemo);
  });

  it("should be able to create a new category", async () => {
    const category = {
      name: "Category Test",
      description: "Category Test description",
    };

    await createCategoryUseCase.execute(category);

    const categoryCreated = await categoriesRepositoryInMemo.findByName("Category Test");

    expect(categoryCreated).toHaveProperty("id");
  });

  it("should not be able to create a new category if category name already exists", async () => {
    expect(async () => {
      const category = {
        name: "Category Test",
        description: "Category test description",
      };

      await createCategoryUseCase.execute(category);
      await createCategoryUseCase.execute(category);
    }).rejects.toBeInstanceOf(AppError);
  });
});
