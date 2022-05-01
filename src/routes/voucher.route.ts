import { Router } from 'express';
import IndexController from '@controllers/index.controller';
import { IRoutes } from '@interfaces/routes.interface';
import VoucherController from '@/controllers/voucher.controller';

class VoucherRoute implements IRoutes {
  public path = '/voucher';
  public router = Router();
  public indexController = new VoucherController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/get-voucher`, this.indexController.getVoucher);
    this.router.post(`${this.path}/add-voucher`, this.indexController.createVoucher);
    this.router.post(`${this.path}/update-voucher/:id`, this.indexController.updateVoucher);
    this.router.delete(`${this.path}/delete-voucher`, this.indexController.removeVoucher);
  }
}

export default VoucherRoute;
