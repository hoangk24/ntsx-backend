import { ICategory } from '@/interfaces/product.interface';
import subCategoryModel from '@/models/sub-category.models';
import { Document, model, Schema, Types } from 'mongoose';

const categoriesSchema: Schema = new Schema(
  {
    _id: Types.ObjectId,
    name: { type: String, required: true },
    path: { type: String, required: true },
    logos: { type: Object, required: true },
    isDeleted: { type: Boolean, default: false },
    subCategory: [
      {
        type: Types.ObjectId,
        ref: subCategoryModel,
      },
    ],
  },
  { timestamps: true },
);
const categoryModel = model<ICategory & Document>('category', categoriesSchema);

export default categoryModel;
