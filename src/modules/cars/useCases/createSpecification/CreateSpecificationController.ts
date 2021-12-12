import { Request, Response } from "express";

import CreateCategoryUseCase from "../createCategory/CreateCategoryUseCase";

class CreateSpecificationController {
  constructor(private createSpecificationUseCase: CreateCategoryUseCase) {}

  handle(request: Request, response: Response): Response {
    const { name, description } = request.body;

    const specification = {
      name,
      description,
    };

    this.createSpecificationUseCase.execute(specification);

    return response.status(201).send();
  }
}

export default CreateSpecificationController;
