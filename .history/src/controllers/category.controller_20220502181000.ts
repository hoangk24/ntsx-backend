import categoryService from '@/services/catgory.service';
import { NextFunction, Request, Response } from 'express';
class CateogryController {
  public categoryService = new categoryService();
  public getCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllCategory: any = await this.categoryService.getCategory();
      res.status(200).json({ data: findAllCategory, message: 'Get category successfully' });
    } catch (error) {
      next(error);
    }
  };
  public createCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categoryData: any = req.body;
      const files = req.files;
      const createCategory = await this.categoryService.createCategory(categoryData, files[0]);
      res.status(200).json({ data: createCategory, message: 'Create category successfully' });
    } catch (error) {
      next(error);
    }
  };
  public createSubCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const subCategoryData: any = req.body;
      console.log(subCategoryData);

      const createCategory = await this.categoryService.createSubCategory(subCategoryData);
      res.status(200).json({ data: createCategory, message: 'Create sub category successfully' });
    } catch (error) {
      next(error);
    }
  };
}

export default CateogryController;
