import { Request, Response } from "express";
import { container } from "tsyringe";

import UpdateUserAvatarUseCase from "./UpdateUserAvatarUseCase";

class UpdateUsersAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const avatar_file = request.file.filename;

    const updateUserAvatarUserCase = container.resolve(UpdateUserAvatarUseCase);

    const user = await updateUserAvatarUserCase.execute({ user_id: id, avatar_file: avatar_file });
    delete user.password;

    return response.status(201).json(user);
  }
}

export default UpdateUsersAvatarController;
