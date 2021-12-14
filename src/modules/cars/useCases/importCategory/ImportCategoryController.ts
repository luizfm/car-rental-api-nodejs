import { Request, Response } from "express";

import ImportCategoryUseCase from "./ImportCartegoryUseCase";

class ImportCategoryController {
  constructor(private importCategoryUseCase: ImportCategoryUseCase) {}

  handle(request: Request, response: Response): Response {
    const { file } = request;
    this.importCategoryUseCase.execute(file);

    return response.send("");
  }
}

export default ImportCategoryController;
