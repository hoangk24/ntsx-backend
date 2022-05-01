import { ISubCategory } from '@/interfaces/product.interface';
import { Document, model, Schema, Types } from 'mongoose';

const nsxSchema: Schema = new Schema(
  {
    _id: Types.ObjectId,
    name: { type: String, required: true },
    path: { type: String, required: true },
  },
  { timestamps: true },
);
const subCategoryModel = model<ISubCategory & Document>('nsx', nsxSchema);

export default subCategoryModel;
