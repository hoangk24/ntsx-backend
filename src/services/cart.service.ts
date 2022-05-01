import { ChangeStatusDto, CreateCartDto, RejectCartDto } from '@/dtos/cart.dto';
import { HttpException } from '@/exceptions/HttpException';
import { CartStatus, ICart, ICartItem } from '@/interfaces/cart.interface';
import { ISizes } from '@/interfaces/product.interface';
import cartModel from '@/models/cart.model';
import productModel from '@/models/product.model';
import voucherModel from '@/models/voucher.model';
import { checkDate } from '@/utils/checkDate';
import _findIndex from 'lodash/findIndex';
import _cloneDeep from 'lodash/cloneDeep';

import mongoose from 'mongoose';
import saleProductModel from '@/models/sale-product.model';

class CartService {
  public cartModel = cartModel;
  public productModel = productModel;
  public voucherModel = voucherModel;
  public saleProductModel = saleProductModel;
  public async createCart(data: CreateCartDto): Promise<ICart> {
    const { list } = data;
    //!check quantity and minus quantity if enough
    for (const it of list) {
      const { size } = it;
      const findProduct = await this.productModel.findById(it.idProduct);
      const idx = _findIndex(findProduct.size, (n: any) => n.size === size);
      if (findProduct.size[idx].quantity < it.quantity) throw new HttpException(400, findProduct.name + 'không đử số lượng');
      const copy = _cloneDeep(findProduct);
      const minusQuantity = copy.size[idx].quantity - it.quantity;
      copy.size[idx].quantity = minusQuantity;
      await this.productModel.findOneAndUpdate(
        {
          _id: it.idProduct,
          'size.size': size,
        },
        {
          size: copy.size,
        },
      );
    }

    const createCart = await this.cartModel.create({
      _id: new mongoose.Types.ObjectId(),
      ...data,
    });
    return createCart;
  }

  public async rejectCart(data: RejectCartDto): Promise<any> {
    const rejectCart = await this.cartModel.findByIdAndUpdate(data.id, { status: CartStatus.CANCLE });
    if (!rejectCart) throw new HttpException(400, 'Không tìm thấy đơn hàng này!');
    return rejectCart;
  }
  public async checkVoucher(voucher: string) {
    const findVoucher = await this.voucherModel.findOne({ voucher, status: true });
    if (!findVoucher) throw new HttpException(400, 'Voucher không tồn tại!');
    if (!checkDate(findVoucher.startDate, findVoucher.endDate))
      throw new HttpException(400, 'Voucher này chưa tới chưa tới ngày sử dụng hoặc đã hết hạn!');
    return findVoucher;
  }
  public async getCartUser(id: string) {
    const findCart = await this.cartModel
      .find({ user: id })
      .populate({
        path: 'list.idProduct',
        model: productModel,
      })
      .sort('createdAt');
    return findCart;
  }
  public async getCartPreview({ carts, voucher }: { carts: ICartItem[]; voucher: string }) {
    const list = [];
    let totalCost = 0;
    let totalQuantity = 0;
    let discount = 0;
    let isDisabled = false;
    for (const it of carts) {
      const findProduct = await this.productModel.findById(it.idProduct).select('posters name price discount size');
      const findQuantity = _findIndex(findProduct.size, (n: ISizes) => n.size === it.size);
      totalCost += (findProduct.price - findProduct.discount) * it.quantity;
      totalQuantity += it.quantity;
      const temp = (findProduct as any)._doc;
      if (findProduct.size[findQuantity].quantity === 0 && !isDisabled) isDisabled = true;
      list.push({
        ...temp,
        ...it,
        price: findProduct.price - findProduct.discount,
        cost: it.quantity * (findProduct.price - findProduct.discount),
        isEmpty: findProduct.size[findQuantity].quantity === 0,
      });
    }
    if (voucher && (await this.checkVoucher(voucher))) {
      discount = await this.calcDiscount(voucher, totalCost);
    }

    return { list, totalCost, totalQuantity, discount, finalCost: totalCost - discount, isDisabled };
  }
  public async changeStatus(data: ChangeStatusDto): Promise<ICart> {
    const findCartUpdate: ICart = await this.cartModel.findByIdAndUpdate(data?.id, { status: data.status });
    if (data.status === CartStatus.DONE) {
      const carts = await this.cartModel.findById(data.id);
      for (const it of carts.list) {
        await this.saleProductModel.create({
          _id: new mongoose.Types.ObjectId(),
          product: it.idProduct,
          quantity: it.quantity,
        });
      }
    }
    if (!findCartUpdate) throw new HttpException(500, 'Không tìm thấy đơn hàng này!');
    return findCartUpdate;
  }

  public async getCart(): Promise<ICart[]> {
    const findCart: any = await this.cartModel.find({}).populate('list.idProduct user');
    console.log(findCart);
    return findCart;
  }

  public async calcDiscount(voucher: string, totalCost: number) {
    const voucherValid = await this.voucherModel.findOne({ voucher, status: true });
    console.log('voucher' + voucherValid);

    if (!voucher) throw new HttpException(400, 'This voucher is not found');
    if (!checkDate(voucherValid.startDate, voucherValid.endDate)) throw new HttpException(400, 'Voucher is expired');
    return (totalCost * voucherValid.percent) / 100;
  }

  public async calcQuantity(products: ICartItem[]) {
    let totalQuantity = 0;
    for (const prod of products) {
      totalQuantity += prod.quantity;
    }
    return totalQuantity;
  }
  public async calcCost(products: ICartItem[]) {
    let totalCost = 0;
    for (const prod of products) {
      const productPrice = await this.productModel.findById(prod.idProduct).select('price');
      totalCost += productPrice.price * prod.quantity;
    }
    return totalCost;
  }
}

export default CartService;
