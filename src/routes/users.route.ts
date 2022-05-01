import isAdminMiddleware from '@/middlewares/isAdmin.middleware';
import { Router } from 'express';
import UsersController from '@controllers/users.controller';
import { RegisterUserDto } from '@dtos/users.dto';
import { IRoutes } from '@interfaces/routes.interface';
import authMiddleware from '@/middlewares/auth.middleware';
import validationMiddleware from '@/middlewares/validation.middleware';

class UsersRoute implements IRoutes {
  public path = '/users';
  public router = Router();
  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/get-users`, authMiddleware, isAdminMiddleware, this.usersController.getUsers);
    this.router.get(`${this.path}/get-users-by-id/:id`, this.usersController.getUserById);
    this.router.post(`${this.path}/create-users`, validationMiddleware(RegisterUserDto, 'body'), this.usersController.createUser);
    this.router.put(`${this.path}/update-users/:id`, validationMiddleware(RegisterUserDto, 'body', true), this.usersController.updateUser);
    this.router.delete(`${this.path}/delete-users/:id`, this.usersController.deleteUser);
    this.router.post(`${this.path}/active-mail/:id`, this.usersController.activeMailUser.bind(this.usersController));
    this.router.post(`${this.path}/change-role/:id`, this.usersController.changeRole);
  }
}

export default UsersRoute;
