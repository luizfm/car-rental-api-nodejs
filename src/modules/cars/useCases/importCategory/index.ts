import CategoriesRepository from "../../repositories/implementations/CategoriesRepository";
import ImportCategoryUseCase from "./ImportCartegoryUseCase";
import ImportCategoryController from "./ImportCategoryController";

const categoriesRepository = CategoriesRepository.getInstance();
const importCategoryUseCase = new ImportCategoryUseCase(categoriesRepository);
const importCategoryController = new ImportCategoryController(importCategoryUseCase);

export default importCategoryController;
