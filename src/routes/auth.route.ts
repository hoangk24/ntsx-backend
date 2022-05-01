import AuthController from '@controllers/auth.controller';
import { LoginUserDto, RegisterUserDto } from '@dtos/users.dto';
import { IRoutes } from '@interfaces/routes.interface';
import authMiddleware from '@middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';
import { Router } from 'express';

class AuthRoute implements IRoutes {
  public path = '/auth';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/register`, validationMiddleware(RegisterUserDto, 'body'), this.authController.signUp);
    this.router.post(`${this.path}/login`, validationMiddleware(LoginUserDto, 'body'), this.authController.logIn);
    this.router.post(`${this.path}/get-accessToken`, this.authController.getAccessToken);
    this.router.post(`${this.path}/logout`, this.authController.logOut);
  }
}

export default AuthRoute;
