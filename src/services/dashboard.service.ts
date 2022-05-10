import { CartStatus } from '@/interfaces/cart.interface';
import cartModel from '@/models/cart.model';
import productModel from '@/models/product.model';
import userModel from '@/models/users.model';
import _reduce from 'lodash/reduce';
import { NextFunction, Request, Response } from 'express';
import saleProductModel from '@/models/sale-product.model';
export class DashboardService {
  users = userModel;
  products = productModel;
  carts = cartModel;
  sale = saleProductModel;
  public getDashboard = async (): Promise<any> => {
    const countProduct = await this.products.count();
    const countUsers = await this.users.count();
    const countCarts = await this.carts.find({ status: CartStatus.CREATING }).count();
    const totalCost = _reduce(
      await this.sale.find({}),
      (result: any, item) => {
        result += item.cost;
        return result;
      },
      0,
    );
    // const test = await this.sale.aggregate("")
    const cartTable = await this.carts.find({ status: CartStatus.CREATING }).populate('user list.idProduct');
    return { product: countProduct, users: countUsers, carts: countCarts, cartTable: cartTable, totalCost: totalCost };
  };
}
