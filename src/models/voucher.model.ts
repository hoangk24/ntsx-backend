import { IVoucher } from '@/interfaces/voucher.interface';
import { Document, model, Schema, Types } from 'mongoose';

const voucherSchema: Schema = new Schema({
  _id: Types.ObjectId,
  voucher: { type: String, required: true },
  percent: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { type: Boolean, default: true },
});

const voucherModel = model<IVoucher & Document>('voucher', voucherSchema);

export default voucherModel;
