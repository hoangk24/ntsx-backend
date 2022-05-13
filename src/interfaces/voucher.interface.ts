export interface IVoucher {
  _id: string;
  voucher: string;
  percent: number;
  startDate: Date;
  endDate: Date;
  status: boolean;
}
