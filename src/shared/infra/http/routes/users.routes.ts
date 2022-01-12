import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import CreateUserController from "@modules/accounts/useCases/createUserUseCase/CreateUserController";
import UpdateUsersAvatarController from "@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import ensureAuthenticated from "@shared/infra/http/middlewares/ensureAuthenticated";

const userRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

const createUserController = new CreateUserController();
const updateAvatarController = new UpdateUsersAvatarController();

userRoutes.post("/", createUserController.handle);
userRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  uploadAvatar.single("avatar"),
  updateAvatarController.handle
);

export default userRoutes;
