import { Router } from "express";

import CreateUserController from "../modules/accounts/useCases/createUserUseCase/CreateUserController";

const userRoutes = Router();

const createUserController = new CreateUserController();

userRoutes.post("/", createUserController.handle);

export default userRoutes;
