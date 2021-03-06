import { Router } from "express";

import CreateSpecificationController from "@modules/cars/useCases/createSpecification/CreateSpecificationController";
import ListSpecificationsController from "@modules/cars/useCases/listSpecifications/ListSpecificationsController";
import ensureAdmin from "@shared/infra/http/middlewares/ensureAdmin";
import ensureAuthenticated from "@shared/infra/http/middlewares/ensureAuthenticated";

const specificationRoutes = Router();
const createSpecificationController = new CreateSpecificationController();
const listSpecificationsController = new ListSpecificationsController();

specificationRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createSpecificationController.handle
);

specificationRoutes.get("/", listSpecificationsController.handle);

export default specificationRoutes;
