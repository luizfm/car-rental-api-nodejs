import { Request, Response } from "express";
import { container } from "tsyringe";

import ListAvailableCarsUseCase from "./ListAvailableCarsUseCase";

class ListCarsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { brand, name, category_id } = request.query;
    const listAvailableCarsUseCase = container.resolve(ListAvailableCarsUseCase);

    const carsList = await listAvailableCarsUseCase.execute({
      brand: brand as string,
      name: name as string,
      category_id: category_id as string,
    });

    return response.json(carsList);
  }
}

export default ListCarsController;
