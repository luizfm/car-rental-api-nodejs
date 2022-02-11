import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import CreateUserController from "@modules/accounts/useCases/createUserUseCase/CreateUserController";
import UpdateUsersAvatarController from "@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import UserProfileController from "@modules/accounts/useCases/userProfileUseCase/UserProfileController";
import ensureAuthenticated from "@shared/infra/http/middlewares/ensureAuthenticated";

const userRoutes = Router();

const uploadAvatar = multer(uploadConfig);

const createUserController = new CreateUserController();
const updateAvatarController = new UpdateUsersAvatarController();
const userProfileController = new UserProfileController();

userRoutes.post("/", createUserController.handle);
userRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  uploadAvatar.single("avatar"),
  updateAvatarController.handle
);
userRoutes.get("/profile", ensureAuthenticated, userProfileController.handle);

export default userRoutes;
