import { IComment } from '@/interfaces/comment.interface';
import userModel from '@/models/users.model';
import { Document, model, Schema, Types } from 'mongoose';

const commentSchema: Schema = new Schema(
  {
    _id: Types.ObjectId,
    user: { type: Types.ObjectId, ref: userModel, required: true },
    product: { type: Types.ObjectId, ref: 'products', required: true },
    rate: { type: Number, required: true },
  },
  { timestamps: true },
);
const commentModel = model<IComment & Document>('comment', commentSchema);

export default commentModel;
