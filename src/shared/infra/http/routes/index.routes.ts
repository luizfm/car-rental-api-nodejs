import { Router } from "express";

import authenticateRoutes from "./authenticate.routes";
import carsRoutes from "./cars.routes";
import categoriesRoutes from "./categories.routes";
import specificationRoutes from "./specification.routes";
import userRoutes from "./users.routes";

const routes = Router();

routes.use("/categories", categoriesRoutes);
routes.use("/specification", specificationRoutes);
routes.use("/users", userRoutes);
routes.use(authenticateRoutes); // A different way to declare the route
routes.use("/cars", carsRoutes);

export default routes;
