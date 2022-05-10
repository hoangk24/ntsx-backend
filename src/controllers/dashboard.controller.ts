import categoryService from '@/services/catgory.service';
import { DashboardService } from '@/services/dashboard.service';
import { NextFunction, Request, Response } from 'express';

class DashboardController {
  service = new DashboardService();
  public getDashboard = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const dashboard = await this.service.getDashboard(data as any);
      res.status(200).json({ data: dashboard, message: 'Get dashboard successfully' });
    } catch (error) {
      next(error);
    }
  };
}

export default DashboardController;
