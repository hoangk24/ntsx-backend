import { CreateCartDto } from '@/dtos/cart.dto';
import CartService from '@/services/cart.service';
import CommentService from '@/services/comment.service';
import { NextFunction, Request, Response } from 'express';

class CartController {
  cartService = new CartService();
  commentService = new CommentService();
  public createCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cart: CreateCartDto = req.body;
      const preview: any = await this.cartService.createCart(cart);
      res.status(200).json({ data: preview, message: 'Lấy danh mục thành công!' });
    } catch (error) {
      next(error);
    }
  };
  public createComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { cartId, comment } = req.body;
      const update = await this.commentService.createComment(cartId, comment);
      res.status(200).json({ data: update, message: 'Đánh giá thành công!' });
    } catch (error) {
      next(error);
    }
  };
  public getPreview = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const preview: any = await this.cartService.getCartPreview(req.body);
      res.status(200).json({ data: preview, message: 'Lấy mẫu đơn hàng thành công!' });
    } catch (error) {
      next(error);
    }
  };
  public getCartUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.query.id;
      const preview: any = await this.cartService.getCartUser(id as string);
      res.status(200).json({ data: preview, message: 'Lấy đơn hàng của bạn thành công!' });
    } catch (error) {
      next(error);
    }
  };
  public checkVoucher = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const voucher = req.query.voucher;
      const preview: any = await this.cartService.checkVoucher(voucher as string);
      res.status(200).json({ data: preview, message: 'Phiếu giảm giá hợp lệ!' });
    } catch (error) {
      next(error);
    }
  };

  public changeStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const change: any = await this.cartService.changeStatus(req.body);
      res.status(200).json({ data: change, message: 'Trạng thái đơn hàng đã được thay đổi!' });
    } catch (error) {
      next(error);
    }
  };
  public getCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const preview: any = await this.cartService.getCart();
      res.status(200).json({ data: preview, message: 'Lấy thông tin đơn hàng thành công!' });
    } catch (error) {
      next(error);
    }
  };
}

export default CartController;
