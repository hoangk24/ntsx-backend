import { HttpException } from '@/exceptions/HttpException';
import { IDiscount } from '@/interfaces/discount.interface';
import discountModel from '@/models/discount.model';
import productModel from '@/models/product.model';
import moment from 'moment';
import mongoose from 'mongoose';
class DiscountService {
  discount = discountModel;
  product = productModel;
  public async getDiscount(): Promise<IDiscount[]> {
    const getComment = await this.discount.find({}).populate({
      path: 'list',
      model: productModel,
      select: 'name',
    });
    return getComment;
  }
  public async addDiscount(data: any): Promise<any> {
    const createDiscount = await discountModel.create({
      _id: new mongoose.Types.ObjectId(),
      ...data,
      status: false,
    });
    return createDiscount;
  }
  public async applyDiscount(data: any): Promise<any> {
    const findDiscount = await this.discount.findById(data._id);
    if (!moment(findDiscount.endDate).isAfter(Date.now())) throw new HttpException(400, 'Khuyến mãi này đã hết hạn!');
    await this.discount.updateMany({ status: true }, { status: false });
    await this.product.updateMany({ discount: 0 });
    const apply = await this.discount.findByIdAndUpdate(data._id, { status: data.status });
    const { list } = apply;
    for (const it of list) {
      const findProduct = await this.product.findById(it);
      await this.product.findByIdAndUpdate(it, {
        discount: data.status ? (findProduct.price * apply.percent) / 100 : 0,
      });
    }
    return apply;
  }
  public async updateDiscount(id: string, data: any): Promise<any> {
    const update = await this.discount.findByIdAndUpdate(id, { ...data });
    if (!update) throw new HttpException(400, 'Cật nhật khuyến mãi không thành công!');
    return update;
  }
}

export default DiscountService;
