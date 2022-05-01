import { IComment } from '@/interfaces/comment.interface';
import CommentService from '@/services/comment.service';
import { NextFunction, Request, Response } from 'express';

class CommentController {
  commentService = new CommentService();
  public getComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.query.id;
      const comment: IComment[] = await this.commentService.getComment(id as string);
      res.status(200).json({ data: comment, message: 'Get comment successfully' });
    } catch (error) {
      next(error);
    }
  };
}

export default CommentController;
