import { CreateProductDto } from '@/dtos/product.dto';
import { IProduct } from '@/interfaces/product.interface';
import productService from '@/services/product.service';
import { NextFunction, Request, Response } from 'express';

class ProductController {
  public productService = new productService();
  public getTop10Product = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllProduct: IProduct[] = await this.productService.getTop10Product();
      res.status(200).json({ data: findAllProduct, message: 'Get top 10 product successfully' });
    } catch (error) {
      next(error);
    }
  };
  public getProductByCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { path } = req.params;
      const findAllProduct: IProduct[] = await this.productService.getProductByCategory(path as string);
      res.status(200).json({ data: findAllProduct, message: 'Get product successfully' });
    } catch (error) {
      next(error);
    }
  };
  public getProductByNsx = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { path } = req.params;
      const findAllProduct: IProduct[] = await this.productService.getProductByNsx(path as string);
      res.status(200).json({ data: findAllProduct, message: 'Get product successfully' });
    } catch (error) {
      next(error);
    }
  };
  public getProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllProduct: IProduct[] = await this.productService.getProduct();
      res.status(200).json({ data: findAllProduct, message: 'Get product successfully' });
    } catch (error) {
      next(error);
    }
  };
  public getProductDetail = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productId: any = req.params.id;
      const findProduct: IProduct = await this.productService.getProductDetail(productId);
      res.status(200).json({ data: findProduct, message: 'Get product detail successfully' });
    } catch (error) {
      next(error);
    }
  };
  public createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productData: CreateProductDto = req.body;
      const files = req.files;
      console.log(files);

      const createProduct: IProduct = await this.productService.createProduct(productData, files);
      res.status(200).json({ data: createProduct, message: 'Create product successfully' });
    } catch (error) {
      next(error);
    }
  };
  public updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // const productData: any = req.body;
      // const files = req.files;
      // const createProduct: Product = await this.productService.createProduct(productData, files);
      res.status(200).json({ data: {}, message: 'Create product successfully' });
    } catch (error) {
      next(error);
    }
  };
  public deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.query;
      const deleteProduct = await this.productService.deleteProduct(id as any);
      res.status(200).json({ data: deleteProduct, message: 'Delete product successfully' });
    } catch (error) {
      next(error);
    }
  };
  public unDeleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.query;
      const deleteProduct = await this.productService.unDeleteProduct(id as any);
      res.status(200).json({ data: deleteProduct, message: 'update status product successfully' });
    } catch (error) {
      next(error);
    }
  };
}

export default ProductController;
