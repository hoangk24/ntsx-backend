import { CreateSubCategoryDto } from '@/dtos/category.dto';
import { HttpException } from '@/exceptions/HttpException';
import { ICategory, IImage } from '@/interfaces/product.interface';
import categoryModel from '@/models/category.model';
import subCategoryModel from '@/models/sub-category.models';
import cloudinaryUpload, { ForderName } from '@/utils/uploadImage';
import fs from 'fs';
import mongoose from 'mongoose';
class CategoryService {
  public category = categoryModel;
  public subCategory = subCategoryModel;

  public async getCategory(): Promise<ICategory[]> {
    const category: ICategory[] = await this.category.find({}).populate({
      path: 'subCategory',
      select: 'name  path',
    });
    return category;
  }
  public async createCategory(categoryData: any, logo: any): Promise<ICategory> {
    const data = await cloudinaryUpload.upload(logo.path, ForderName.LOGO);
    const logoUploaded: IImage = { public_id: data.public_id, url: data.url };
    fs.unlinkSync(logo.path);
    const createCategory = await this.category.create({
      _id: new mongoose.Types.ObjectId(),
      ...categoryData,
      logos: logoUploaded,
    });
    if (!createCategory) throw new HttpException(400, 'Tạo danh mục không thành công!');
    return createCategory;
  }
  public async updateCategory(id: string, update: any, logo?: any): Promise<ICategory> {
    const data = await cloudinaryUpload.upload(logo.path, ForderName.LOGO);
    if (logo) {
      const logoUploaded: IImage = { public_id: data.public_id, url: data.url };
      fs.unlinkSync(logo.path);
      const updateCategory = await this.category.findByIdAndUpdate(id, {
        ...update,
        logos: logoUploaded,
      });
    }

    if (!updateCategory) throw new HttpException(400, 'update danh mục không thành công!');
    return updateCategory;
  }
  public async createSubCategory(subCategoryData: CreateSubCategoryDto): Promise<any> {
    const createSubCate = await this.subCategory.create({
      _id: new mongoose.Types.ObjectId(),
      ...subCategoryData,
    });
    const updateSubCateOfCate = await this.category.updateOne(
      { _id: subCategoryData.category },
      {
        $push: {
          subCategory: createSubCate._id,
        },
      },
    );
    if (!updateSubCateOfCate) throw new HttpException(400, 'Tạo danh mục không thành công!');

    return updateSubCateOfCate;
  }
}

export default CategoryService;
