import { IDiscount } from '@/interfaces/discount.interface';
import { Document, model, Schema, Types } from 'mongoose';

const discountSchema: Schema = new Schema({
  _id: Types.ObjectId,
  name: { type: String, required: true },
  status: { type: Boolean, required: true },
  percent: { type: Number, required: true },
  list: [
    {
      type: Types.ObjectId,
    },
  ],
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});
const discountModel = model<IDiscount & Document>('discount', discountSchema);

export default discountModel;
