import { CartStatus } from '@/interfaces/cart.interface';
import cartModel from '@/models/cart.model';
import productModel from '@/models/product.model';
import userModel from '@/models/users.model';
import _reduce from 'lodash/reduce';
import { NextFunction, Request, Response } from 'express';
export class DashboardService {
  users = userModel;
  products = productModel;
  carts = cartModel;
  public getDashboard = async (): Promise<any> => {
    const countProduct = await this.products.count();
    const countUsers = await this.users.count();
    const countCarts = await this.carts.count();
    const totalCost = _reduce(
      await this.carts.find({ status: CartStatus.DONE }),
      (result: any, item) => {
        result += item.finalCost;
        return result;
      },
      0,
    );
    console.log(totalCost);
    const cartTable = await this.carts.find({ status: CartStatus.CREATING }).populate('user list.idProduct');
    console.log(cartTable);

    return { product: countProduct, users: countUsers, carts: countCarts, cartTable: cartTable, totalCost: totalCost };
  };
}
