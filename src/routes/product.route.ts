import productController from '@/controllers/product.controller';
import { CreateProductDto, GetProductDetailDto, UpdateProductDto } from '@/dtos/product.dto';
import authMiddleware from '@/middlewares/auth.middleware';
import isAdminMiddleware from '@/middlewares/isAdmin.middleware';
import uploadFile from '@/middlewares/upload.middleware';
import validationMiddleware from '@/middlewares/validation.middleware';
import { IRoutes } from '@interfaces/routes.interface';
import { Router } from 'express';
class ProductRoute implements IRoutes {
  public path = '/product';
  public router = Router();
  public productController = new productController();

  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.get(`${this.path}/get-all-product`, this.productController.getProduct);
    this.router.get(`${this.path}/get-detail-product/:id`, this.productController.getProductDetail);
    this.router.get(`${this.path}/get-top10-product`, this.productController.getTop10Product);
    this.router.get(`${this.path}/get-product-by-category/:path`, this.productController.getProductByCategory);
    this.router.get(`${this.path}/get-product-by-nsx/:path`, this.productController.getProductByNsx);

    this.router.post(
      `${this.path}/create-product`,
      validationMiddleware(CreateProductDto, 'body'),
      uploadFile.array('posters', 12),
      authMiddleware,
      isAdminMiddleware,
      this.productController.createProduct,
    );
    this.router.delete(`${this.path}/delete-product`, authMiddleware, isAdminMiddleware, this.productController.deleteProduct);
  }
}

export default ProductRoute;
