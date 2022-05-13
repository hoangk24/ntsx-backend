import { IProduct } from '@/interfaces/product.interface';
import categoryModel from '@/models/category.model';
import commentModel from '@/models/comment.model';
import subCategoryModel from '@/models/sub-category.models';
import { model, Schema, Document, Types } from 'mongoose';

const productsSchema: Schema = new Schema(
  {
    _id: Types.ObjectId,
    name: { type: String, required: true },
    price: { type: Number, required: true },
    size: [
      {
        size: { type: String, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    posters: { type: Array, required: true },
    discount: { type: Number, default: 0 },
    category: { type: Types.ObjectId, ref: categoryModel },
    nsx: { type: Types.ObjectId, ref: subCategoryModel },
    isDeleted: { type: Boolean, default: false },
    note: { type: String, required: true },
    comment: [{ type: Types.ObjectId, ref: commentModel }],
  },
  { timestamps: true },
);
productsSchema.index({ name: 'text', note: 'text' });
const productModel = model<IProduct & Document>('product', productsSchema);
productModel.createIndexes();
export default productModel;
