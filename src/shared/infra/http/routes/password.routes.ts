import { Router } from "express";

import ResetPasswordController from "@modules/accounts/useCases/resetPassword/ResetPasswordController";
import SendForgotPasswordMailController from "@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController";

const passwordRoutes = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();
const resetPasswordController = new ResetPasswordController();

passwordRoutes.post("/forgot-password", sendForgotPasswordMailController.handle);
passwordRoutes.post("/reset-password", resetPasswordController.handle);

export default passwordRoutes;
