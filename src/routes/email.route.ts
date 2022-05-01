import { EmailController } from '@/controllers/email.controller';
import { IRoutes } from '@interfaces/routes.interface';
import { Router } from 'express';

class EmailRoute implements IRoutes {
  public path = '/email';
  public router = Router();
  public emailController = new EmailController();
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/re-verified-mail`, this.emailController.resendVerifyEmail.bind(this.emailController));
    this.router.post(`${this.path}/create-mail`, this.emailController.createEmail.bind(this.emailController));
    this.router.post(`${this.path}/verified-mail`, this.emailController.verifiedEmail.bind(this.emailController));
  }
}

export default EmailRoute;
