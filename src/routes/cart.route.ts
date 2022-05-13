import CartController from '@/controllers/cart.controller';
import { ChangeStatusDto, CreateCartDto } from '@/dtos/cart.dto';
import authMiddleware from '@/middlewares/auth.middleware';
import isAdminMiddleware from '@/middlewares/isAdmin.middleware';
import validationMiddleware from '@/middlewares/validation.middleware';
import { IRoutes } from '@interfaces/routes.interface';
import { Router } from 'express';

class CartRoute implements IRoutes {
  public path = '/cart';
  public router = Router();
  public cartController = new CartController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/get-cart-preview`, this.cartController.getPreview);
    this.router.post(`${this.path}/create-comment`, authMiddleware, this.cartController.createComment);
    this.router.post(`${this.path}/create-cart`, authMiddleware, validationMiddleware(CreateCartDto, 'body'), this.cartController.createCart);
    this.router.get(`${this.path}/check-voucher`, this.cartController.checkVoucher);
    this.router.get(`${this.path}/get-cart-user`, this.cartController.getCartUser);
    this.router.get(`${this.path}/get-all-cart`, this.cartController.getCart);
    this.router.post(
      `${this.path}/change-status`,
      authMiddleware,
      isAdminMiddleware,
      validationMiddleware(ChangeStatusDto, 'body'),
      this.cartController.changeStatus,
    );
  }
}

export default CartRoute;
