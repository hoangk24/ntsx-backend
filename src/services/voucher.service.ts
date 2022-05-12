import { HttpException } from '@/exceptions/HttpException';
import { IVoucher } from '@/interfaces/voucher.interface';
import discountModel from '@/models/discount.model';
import productModel from '@/models/product.model';
import voucherModel from '@/models/voucher.model';
import mongoose from 'mongoose';
export class VoucherService {
  productModel = productModel;
  discountModel = discountModel;
  voucher = voucherModel;
  public async getVoucher(): Promise<IVoucher[]> {
    const findVoucher = await this.voucher.find({});
    return findVoucher;
  }
  public async addVoucher(data: IVoucher): Promise<IVoucher> {
    const create = await this.voucher.create({
      _id: new mongoose.Types.ObjectId(),
      ...data,
    });
    if (!create) throw new HttpException(400, 'Không thể tạo voucher');

    return create;
  }
  public async updateVoucher(id: string, data: IVoucher): Promise<IVoucher> {
    const update = await this.voucher.findByIdAndUpdate(id, { ...data });
    if (!update) throw new HttpException(400, 'Không thể update voucher này');

    return update;
  }
  public async removeVoucher(id: string): Promise<IVoucher> {
    const update = await this.voucher.findByIdAndDelete(id);
    if (!update) throw new HttpException(400, 'Không thể update voucher này');

    return update;
  }
}
