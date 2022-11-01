import { ISize } from '@/interfaces/product.interface';
import { IsArray, IsNumber, IsString } from 'class-validator';

export class GetEntityPagination {
  @IsNumber()
  perpage: number;

  @IsNumber()
  page: number;
}

export class CreateProductDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsString()
  size: string;

  @IsNumber()
  discount: number;

  @IsString()
  category: string;

  @IsString()
  nsx: string;

  @IsString()
  note: string;
}

export class UpdateProductDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsArray()
  size: ISize[];

  @IsNumber()
  discount: number;

  @IsString()
  category: string;

  @IsString()
  nsx: string;

  @IsString()
  note: string;
}

export class GetProductDetailDto {
  @IsString()
  id: string;
}
