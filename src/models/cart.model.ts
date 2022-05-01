import { ICart, CartStatus } from '@/interfaces/cart.interface';
import productModel from '@/models/product.model';
import userModel from '@/models/users.model';
import { Document, model, Schema, Types } from 'mongoose';

const cartsSchema: Schema = new Schema(
  {
    _id: Types.ObjectId,
    fullName: { type: String, required: true },
    user: { type: Types.ObjectId, ref: userModel },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    isPaided: { type: Boolean, required: true },
    status: { type: Number, default: CartStatus.CREATING },
    list: [
      {
        idProduct: { type: Types.ObjectId, ref: productModel },
        quantity: { type: Number },
        size: { type: String },
      },
    ],
    totalCost: { type: Number, required: true },
    totalQuantity: { type: Number, required: true },
    finalCost: { type: Number, required: true },
    note: { type: String, default: '' },
  },
  { timestamps: true },
);
const cartModel = model<ICart & Document>('carts', cartsSchema);

export default cartModel;
