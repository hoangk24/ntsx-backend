import { Document, model, Schema, Types } from 'mongoose';
const saleProductSchema: Schema = new Schema({
  _id: Types.ObjectId,
  product: { type: Types.ObjectId, ref: 'products' },
  quantity: { type: Number, required: true },
});
const saleProductModel = model<ISAl & Document>('sale-product', saleProductSchema);

export default saleProductModel;
