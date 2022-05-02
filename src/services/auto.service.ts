import { IDiscount } from '@/interfaces/discount.interface';
import cartModel from '@/models/cart.model';
import categoryModel from '@/models/category.model';
import discountModel from '@/models/discount.model';
import productModel from '@/models/product.model';
import subCategoryModel from '@/models/sub-category.models';
import voucherModel from '@/models/voucher.model';
import moment from 'moment';
import mongoose from 'mongoose';
export class AutoRun {
  productModel = productModel;
  discountModel = discountModel;
  subCategoryModel = subCategoryModel;
  categoryModel = categoryModel;
  voucher = voucherModel;
  cart = cartModel;
  checkExprired = async (startDate: Date, endDate: Date): Promise<boolean> => {
    return moment(Date.now()).isBefore(endDate) && moment(Date.now()).isAfter(startDate);
  };

  getDiscountActive = async (): Promise<IDiscount> => {
    return await this.discountModel.findOne({ status: true });
  };
  resetDiscount = async (list: string[]) => {
    for (const it of list) {
      await this.productModel.updateMany({ _id: it }, { discount: 0 });
    }
  };
  run = async () => {
    const getDiscount = await this.getDiscountActive();
    if (getDiscount) {
      const isNotExpired = await this.checkExprired(getDiscount.startDate, getDiscount.endDate);
      if (!isNotExpired) {
        await this.resetDiscount(getDiscount.list as any);
      }
    }
  };
}
