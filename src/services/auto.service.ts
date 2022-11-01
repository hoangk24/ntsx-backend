import { IDiscount } from '@/interfaces/discount.interface';
import cartModel from '@/models/cart.model';
import categoryModel from '@/models/category.model';
import discountModel from '@/models/discount.model';
import emailModel from '@/models/email';
import productModel from '@/models/product.model';
import saleProductModel from '@/models/sale-product.model';
import subCategoryModel from '@/models/sub-category.models';
import userModel from '@/models/users.model';
import voucherModel from '@/models/voucher.model';
import DiscountService from '@/services/discount.service';
import _reduce from 'lodash/reduce';
import moment from 'moment';
export class AutoRun {
  productModel = productModel;
  discountModel = discountModel;
  subCategoryModel = subCategoryModel;
  categoryModel = categoryModel;
  voucher = voucherModel;
  cart = cartModel;
  sale = saleProductModel;
  emails = emailModel;
  users = userModel;
  discountService = new DiscountService();

  checkExpired = async (startDate: Date, endDate: Date): Promise<boolean> => {
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
    await this.resetDiscount(
      await _reduce(
        await this.productModel.find({}),
        (result: any, item: any) => {
          return (result = [...result, item._id]);
        },
        [],
      ),
    );

    const getDiscount = await this.getDiscountActive();
    if (getDiscount) {
      const isNotExpired = await this.checkExpired(getDiscount.startDate, getDiscount.endDate);
      if (!isNotExpired) {
        await this.resetDiscount(getDiscount.list);
      } else {
        await this.discountService.applyDiscount(getDiscount);
      }
    }
  };
}
