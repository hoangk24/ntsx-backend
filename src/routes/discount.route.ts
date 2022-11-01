import DiscountController from '@/controllers/discount.controller';
import { IRoutes } from '@interfaces/routes.interface';
import { Router } from 'express';

class DiscountRoute implements IRoutes {
  public path = '/discount';
  public router = Router();
  public discountController = new DiscountController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.discountController.getDiscount);
    this.router.post(`${this.path}`, this.discountController.addDiscount);
    this.router.post(`${this.path}/apply`, this.discountController.applyDiscount);
    this.router.put(`${this.path}/:id`, this.discountController.updateDiscount);
  }
}

export default DiscountRoute;
