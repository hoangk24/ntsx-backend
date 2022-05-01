import { model, Schema, Document, Types } from 'mongoose';
import { Role, IUser } from '@interfaces/users.interface';
import emailModel from '@/models/email';

const userSchema: Schema = new Schema(
  {
    _id: Types.ObjectId,
    email: {
      type: Types.ObjectId,
      ref: emailModel,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    fullName: { type: String, required: true },
    role: {
      type: Number,
      default: Role.USER,
    },
    isDeleted: { type: Boolean, default: false },
    avatar: { type: String },
  },
  { timestamps: true },
);

const userModel = model<IUser & Document>('users', userSchema);

export default userModel;
