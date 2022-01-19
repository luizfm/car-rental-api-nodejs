import { Router } from "express";

import CreateRentalController from "@modules/rentals/useCases/createRentalUseCase/CreateRentalController";
import ensureAuthenticated from "@shared/infra/http/middlewares/ensureAuthenticated";

const createRentalController = new CreateRentalController();

const rentalRoutes = Router();

rentalRoutes.post("/", ensureAuthenticated, createRentalController.handle);

export default rentalRoutes;
