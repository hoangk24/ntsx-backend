import isAdminMiddleware from '@/middlewares/isAdmin.middleware';
import { Router } from 'express';
import UsersController from '@controllers/users.controller';
import { RegisterUserDto } from '@dtos/users.dto';
import { IRoutes } from '@interfaces/routes.interface';
import authMiddleware from '@/middlewares/auth.middleware';
import validationMiddleware from '@/middlewares/validation.middleware';
import uploadFile from '@/middlewares/upload.middleware';

class UsersRoute implements IRoutes {
  public path = '/users';
  public router = Router();
  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/get-users`, authMiddleware, isAdminMiddleware, this.usersController.getUsers);
    this.router.get(`${this.path}/get-users-by-id/:id`, authMiddleware, isAdminMiddleware, this.usersController.getUserById);
    this.router.post(
      `${this.path}/create-users`,
      authMiddleware,
      isAdminMiddleware,
      validationMiddleware(RegisterUserDto, 'body'),
      this.usersController.createUser,
    );
    this.router.put(
      `${this.path}/update-users/:id`,
      authMiddleware,
      isAdminMiddleware,
      validationMiddleware(RegisterUserDto, 'body', true),
      this.usersController.updateUser,
    );
    this.router.delete(`${this.path}/delete-users/:id`, authMiddleware, isAdminMiddleware, this.usersController.deleteUser);
    this.router.post(`${this.path}/active-mail/:id`, this.usersController.activeMailUser.bind(this.usersController));
    this.router.post(`${this.path}/change-role/:id`, authMiddleware, isAdminMiddleware, this.usersController.changeRole);
    this.router.post(`${this.path}/change-password`, this.usersController.changePassword);
    this.router.post(`${this.path}/update-information`, authMiddleware, uploadFile.single('avatar'), this.usersController.updateInformation);
    this.router.post(`${this.path}/update-password`, authMiddleware, this.usersController.updatePassword);
  }
}

export default UsersRoute;
