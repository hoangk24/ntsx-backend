import { IComment } from '@/interfaces/comment.interface';
import categoryModel from '@/models/category.model';
import commentModel from '@/models/comment.model';
import subCategoryModel from '@/models/sub-category.models';
import mongoose from 'mongoose';
class CommentService {
  category = categoryModel;
  subCategory = subCategoryModel;
  comments = commentModel;
  public async getComment(idProduct: string): Promise<IComment[]> {
    const getComment = await this.comments.find({ product: idProduct }).populate('user reply.user');
    return getComment;
  }
  public async addComment(comment: IComment) {
    console.log(comment);

    const createComment = await this.comments.create({
      _id: new mongoose.Types.ObjectId(),
      ...comment,
    });

    return createComment;
  }
  public async removeComment(id: string) {
    const deleteComment = await this.comments.findByIdAndDelete(id);
    return deleteComment;
  }
}

export default CommentService;
