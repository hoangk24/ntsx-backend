import CommentController from '@/controllers/comment.controller';
import DashboardController from '@/controllers/dashboard.controller';
import { IRoutes } from '@interfaces/routes.interface';
import { Router } from 'express';

class DashboardRoute implements IRoutes {
  public path = '/dashboard';
  public router = Router();
  public dashboardController = new DashboardController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/`, this.dashboardController.getDashboard);
  }
}

export default DashboardRoute;
