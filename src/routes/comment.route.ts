import CartController from '@/controllers/cart.controller';
import CommentController from '@/controllers/comment.controller';
import { IRoutes } from '@interfaces/routes.interface';
import { Router } from 'express';

class CommentRoute implements IRoutes {
  public path = '/comments';
  public router = Router();
  public commentController = new CommentController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/get-comments`, this.commentController.getComment);
  }
}

export default CommentRoute;
