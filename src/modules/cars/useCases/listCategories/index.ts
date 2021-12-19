import CategoriesRepository from "../../repositories/implementations/CategoriesRepository";
import ListCategoriesController from "./ListCategoriesController";
import ListCategoriesUseCase from "./ListCategoriesUseCase";

const listCategoriesController = (): ListCategoriesController => {
  const categoriesRepository = new CategoriesRepository();

  const listCategoriesUseCase = new ListCategoriesUseCase(categoriesRepository);

  const listCategoriesController = new ListCategoriesController(listCategoriesUseCase);
  return listCategoriesController;
};

export default listCategoriesController;
