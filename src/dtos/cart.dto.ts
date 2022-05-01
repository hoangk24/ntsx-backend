import { CartStatus, ICartItem } from '@/interfaces/cart.interface';
import { IsArray, IsBoolean, IsNumber, IsPhoneNumber, IsString } from 'class-validator';

export class CreateCartDto {
  @IsString()
  user: string;
  @IsString()
  address: string;
  @IsString()
  fullName: string;
  @IsPhoneNumber()
  phoneNumber: string;
  @IsArray()
  list: ICartItem[];
  @IsNumber()
  status: CartStatus;
  @IsNumber()
  totalCost: number;
  @IsNumber()
  totalQuantity: number;
  @IsNumber()
  discount: number;
  @IsNumber()
  finalCost: number;
  @IsString()
  note: string;
  @IsBoolean()
  isPaided: boolean;
}

export class RejectCartDto {
  @IsString()
  id: string;
  // @IsString()
  // reason: string;
}

export class ChangeStatusDto {
  @IsString()
  id: string;
  @IsNumber()
  status: CartStatus;
}
