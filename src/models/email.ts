import { IEmail } from '@/interfaces/auth.interface';
import { Document, model, Schema, Types } from 'mongoose';

const emailSchema: Schema = new Schema(
  {
    _id: Types.ObjectId,
    email: { type: String, required: true },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true },
);
const emailModel = model<IEmail & Document>('emails', emailSchema);

export default emailModel;
