import { CartStatus } from '@/interfaces/cart.interface';
import cartModel from '@/models/cart.model';
import productModel from '@/models/product.model';
import saleProductModel from '@/models/sale-product.model';
import userModel from '@/models/users.model';
import _reduce from 'lodash/reduce';
export class DashboardService {
  users = userModel;
  products = productModel;
  carts = cartModel;
  sale = saleProductModel;
  public getDashboard = async (data?: { startDate: any; endDate: any }): Promise<any> => {
    const countProduct = await this.products.count();
    const countUsers = await this.users.count();
    const countCarts = await this.carts.find({ status: CartStatus.CREATING }).count();
    const totalCost = _reduce(
      await this.sale.find({
        createdAt: {
          $gte: (data.startDate && new Date(data.startDate)) || new Date('1/1/2000'),
          $lte: (data.endDate && new Date(data.endDate)) || new Date(),
        },
      }),
      (result: any, item) => {
        result += item.cost;
        return result;
      },
      0,
    );

    const saleTable = await this.sale.aggregate([
      {
        $match: {
          createdAt: {
            $gte: (data.startDate && new Date(data.startDate)) || new Date('1/1/2000'),
            $lte: (data.endDate && new Date(data.endDate)) || new Date(),
          },
        },
      },
      {
        $group: {
          _id: '$product',
          totalQuantity: {
            $sum: '$quantity',
          },
        },
      },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'infoProduct',
        },
      },
      { $unwind: '$infoProduct' },
      {
        $project: {
          product: 1,
          totalQuantity: 1,
          infoProduct: {
            posters: 1,
            name: 1,
          },
        },
      },
      {
        $sort: {
          totalQuantity: -1,
        },
      },
    ]);
    const costTable = await this.sale.aggregate([
      {
        $match: {
          createdAt: {
            $gte: (data.startDate && new Date(data.startDate)) || new Date('1/1/2000'),
            $lte: (data.endDate && new Date(data.endDate)) || new Date(),
          },
        },
      },
      {
        $group: {
          _id: '$product',
          totalCost: {
            $sum: '$cost',
          },
        },
      },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'infoProduct',
        },
      },
      { $unwind: '$infoProduct' },
      {
        $project: {
          product: 1,
          totalCost: 1,
          infoProduct: {
            posters: 1,
            name: 1,
          },
        },
      },
      {
        $sort: {
          totalCost: -1,
        },
      },
    ]);

    const cartTable = await this.carts.find({ status: CartStatus.CREATING }).populate('user list.idProduct');
    return {
      product: countProduct,
      users: countUsers,
      carts: countCarts,
      cartTable: cartTable,
      totalCost: totalCost,
      saleTable: saleTable,
      costTable: costTable,
    };
  };
}
