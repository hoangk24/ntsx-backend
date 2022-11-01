import { IProduct } from '@/interfaces/product.interface';

export interface IDiscount {
  _id: string;
  name: string;
  percent: number;
  list: string[] | IProduct[];
  startDate: Date;
  endDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
  status: boolean;
}
