import { CreateProductDto } from '@/dtos/product.dto';
import { HttpException } from '@/exceptions/HttpException';
import { IComment } from '@/interfaces/comment.interface';
import { IProduct } from '@/interfaces/product.interface';
import categoryModel from '@/models/category.model';
import commentModel from '@/models/comment.model';
import productModel from '@/models/product.model';
import subCategoryModel from '@/models/sub-category.models';
import cloudinaryUpload, { ForderName } from '@/utils/uploadImage';
import fs from 'fs';
import mongoose from 'mongoose';
class ProductService {
  product = productModel;
  category = categoryModel;
  subCate = subCategoryModel;
  comment = commentModel;
  public async getProduct(): Promise<IProduct[]> {
    const allProduct = await this.product.find({ isDeleted: false }).populate('category nsx');
    return allProduct;
  }
  public async getTop10Product(): Promise<IProduct[]> {
    const allProduct = await this.product.find({ isDeleted: false }).sort({ createdAt: 1 }).limit(10).populate('category nsx');
    return allProduct;
  }
  public async getProductByCategory(path: string): Promise<any> {
    const findCate = await this.category.findOne({ path });
    if (!findCate) throw new HttpException(400, 'Danh mục này không tồn tại!');
    const allProduct = await this.product.find({ isDeleted: false, category: findCate._id }).populate('category nsx');
    return allProduct;
  }
  public async getProductByNsx(path: string): Promise<IProduct[]> {
    const findCate = await this.subCate.findOne({ path });
    const allProduct = await this.product.find({ isDeleted: false, nsx: findCate._id }).populate('category nsx');
    return allProduct;
  }

  public async getProductDetail(id: string): Promise<{ product: IProduct; comments: IComment[] }> {
    const getProduct = await this.product.findById(id).populate('nsx category');
    if (!getProduct) throw new HttpException(400, 'Wrong id product');
    const comments = await this.comment.find({ product: getProduct._id }).populate('user');
    return { product: getProduct, comments: comments };
  }
  public async createProduct(productData: CreateProductDto, posters: any): Promise<IProduct> {
    const urlPosters = [];
    for (const file of posters) {
      const { path } = file;
      const data = await cloudinaryUpload.upload(path, ForderName.POSTERS);
      urlPosters.push({ public_id: data.public_id, url: data.url });
      fs.unlinkSync(path);
    }
    const createProduct: IProduct = await this.product.create({
      _id: new mongoose.Types.ObjectId(),
      ...productData,
      size: JSON.parse(productData.size),
      posters: urlPosters,
    });
    return createProduct;
  }
  public async searchProduct(search: string): Promise<IProduct[]> {
    const test = await this.product.find({
      $text: {
        $search: search,
      },
    });
    return test;
  }
  public async deleteProduct(id: string): Promise<IProduct> {
    const deleteProduct: IProduct = await this.product.findByIdAndUpdate(id, { isDeleted: true });
    if (!deleteProduct) throw new HttpException(400, 'Xoá sản phẩm không thành công!');
    return deleteProduct;
  }
  public async unDeleteProduct(id: string): Promise<IProduct> {
    const deleteProduct: IProduct = await this.product.findByIdAndUpdate(id, { isDeleted: false });
    if (!deleteProduct) throw new HttpException(400, 'Hoàn tác sản phẩm không thành công!');
    return deleteProduct;
  }
  public async updateProduct(id: string, data: Partial<IProduct>): Promise<IProduct> {
    const findProduct = await this.product.findByIdAndUpdate(id, { ...data });
    if (!findProduct) throw new HttpException(400, 'Cật nhật sản phẩm không thành công!');
    return findProduct;
  }
}

export default ProductService;
