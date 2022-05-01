import DiscountController from '@/controllers/discount.controller';
import DiscountService from '@/services/discount.service';
import AuthController from '@controllers/auth.controller';
import { LoginUserDto, RegisterUserDto } from '@dtos/users.dto';
import { IRoutes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { Router } from 'express';

class DiscountRoute implements IRoutes {
  public path = '/discount';
  public router = Router();
  public discountController = new DiscountController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/get-discount`, this.discountController.getDiscount);
    this.router.post(`${this.path}/add-discount`, this.discountController.addDiscount);
    this.router.post(`${this.path}/apply-discount`, this.discountController.applyDiscount);
    this.router.post(`${this.path}/update-discount/:id`, this.discountController.updateDiscount);
  }
}

export default DiscountRoute;
