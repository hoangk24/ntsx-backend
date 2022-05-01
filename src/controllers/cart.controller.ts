import { CreateCartDto } from '@/dtos/cart.dto';
import CartService from '@/services/cart.service';
import { NextFunction, Request, Response } from 'express';

class CartController {
  public cartService = new CartService();
  public createCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cart: CreateCartDto = req.body;
      const preview: any = await this.cartService.createCart(cart);
      res.status(200).json({ data: preview, message: 'Get category successfully' });
    } catch (error) {
      next(error);
    }
  };
  public getPreview = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const preview: any = await this.cartService.getCartPreview(req.body);
      res.status(200).json({ data: preview, message: 'Get category successfully' });
    } catch (error) {
      next(error);
    }
  };
  public getCartUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.query.id;
      const preview: any = await this.cartService.getCartUser(id as string);
      res.status(200).json({ data: preview, message: 'Get category successfully' });
    } catch (error) {
      next(error);
    }
  };
  public checkVoucher = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const voucher = req.query.voucher;
      const preview: any = await this.cartService.checkVoucher(voucher as string);
      res.status(200).json({ data: preview, message: 'Voucher Valid' });
    } catch (error) {
      next(error);
    }
  };

  public changeStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const change: any = await this.cartService.changeStatus(req.body);
      res.status(200).json({ data: change, message: 'Change status successfully' });
    } catch (error) {
      next(error);
    }
  };
  public getCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const preview: any = await this.cartService.getCart();
      res.status(200).json({ data: preview, message: 'Get cart successfully' });
    } catch (error) {
      next(error);
    }
  };
}

export default CartController;
