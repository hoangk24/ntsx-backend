import VoucherController from '@/controllers/voucher.controller';
import { IRoutes } from '@interfaces/routes.interface';
import { Router } from 'express';

class VoucherRoute implements IRoutes {
  public path = '/voucher';
  public router = Router();
  public indexController = new VoucherController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.indexController.getVoucher);
    this.router.post(`${this.path}`, this.indexController.createVoucher);
    this.router.put(`${this.path}/:id`, this.indexController.updateVoucher);
    this.router.delete(`${this.path}`, this.indexController.removeVoucher);
  }
}

export default VoucherRoute;
