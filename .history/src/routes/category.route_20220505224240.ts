import categoryController from '@/controllers/category.controller';
import { CreateCategoryDto, CreateSubCategoryDto } from '@/dtos/category.dto';
import { CreateProductDto } from '@/dtos/product.dto';
import authMiddleware from '@/middlewares/auth.middleware';
import isAdminMiddleware from '@/middlewares/isAdmin.middleware';
import uploadFile from '@/middlewares/upload.middleware';
import validationMiddleware from '@/middlewares/validation.middleware';
import { IRoutes } from '@interfaces/routes.interface';
import { Router } from 'express';
class CategoryRoute implements IRoutes {
  public path = '/category';
  public router = Router();
  public categoryController = new categoryController();

  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.get(`${this.path}/get-category`, this.categoryController.getCategory);
    this.router.post(
      `${this.path}/create-category`,
      authMiddleware,
      isAdminMiddleware,
      validationMiddleware(CreateCategoryDto, 'body'),
      uploadFile.array('logo', 2),
      this.categoryController.createCategory,
    );
    this.router.post(
      `${this.path}/update-category/:id`,
      authMiddleware,
      isAdminMiddleware,
      validationMiddleware(CreateCategoryDto, 'body'),
      uploadFile.single('logo'),
      this.categoryController.updateCategory,
    );
    this.router.post(
      `${this.path}/create-nsx`,
      authMiddleware,
      isAdminMiddleware,
      validationMiddleware(CreateSubCategoryDto, 'body'),
      this.categoryController.createSubCategory,
    );
  }
}

export default CategoryRoute;
