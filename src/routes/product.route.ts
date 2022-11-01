import productController from '@/controllers/product.controller';
import { CreateProductDto } from '@/dtos/product.dto';
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
    this.router.get(`${this.path}`, this.productController.getProduct);
    this.router.get(`${this.path}/search`, this.productController.searchProduct);
    this.router.get(`${this.path}/:id`, this.productController.getProductDetail);
    this.router.get(`${this.path}/top10`, this.productController.getTop10Product);
    this.router.get(`${this.path}/category/:path`, this.productController.getProductByCategory);
    this.router.get(`${this.path}/nsx/:path`, this.productController.getProductByNsx);
    this.router.put(`${this.path}/:id`, authMiddleware, isAdminMiddleware, this.productController.updateProduct);
    this.router.post(
      `${this.path}/create-product`,
      validationMiddleware(CreateProductDto, 'body'),
      uploadFile.array('posters', 12),
      authMiddleware,
      isAdminMiddleware,
      this.productController.createProduct,
    );
    this.router.delete(`${this.path}`, authMiddleware, isAdminMiddleware, this.productController.deleteProduct);
  }
}

export default ProductRoute;
