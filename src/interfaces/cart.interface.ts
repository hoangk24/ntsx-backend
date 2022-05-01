export interface ICart {
  user: string;
  list: ICartItem[];
  status: CartStatus;
  address: string;
  phoneNumber: string;
  fullName: string;
  totalQuantity: number;
  totalCost: number;
  discount: number;
  finalCost: number;
  isPaided: boolean;
}
export interface ICartItem {
  _id: string;
  size?: any;
  idProduct: string;
  quantity: number;
  discount: number;
  note: string;
  poster?: string;
}

export enum CartStatus {
  'CANCLE' = 0,
  'CREATING' = 1,
  'CONFIRM' = 2,
  'SHIPPING' = 3,
  'DONE' = 4,
}
