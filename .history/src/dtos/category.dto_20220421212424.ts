import { ISubCategory } from '@/interfaces/product.interface';
import { IsArray, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  name: string;
  @IsString()
  path: string;
  @IsArray()
  subCategory: ISubCategory[];
}
export class CreateSubCategoryDto {
  @IsString()
  category: string;
  @IsString()
  name: string;
  @IsString()
  path: string;
}
