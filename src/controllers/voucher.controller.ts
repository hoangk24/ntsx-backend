import { VoucherService } from '@/services/voucher.service';
import { NextFunction, Request, Response } from 'express';

class VoucherController {
  voucherService = new VoucherService();
  public getVoucher = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const vouchers = await this.voucherService.getVoucher();
      res.status(200).json({ data: vouchers, message: 'Lấy danh sách voucher thành công!' });
    } catch (error) {
      next(error);
    }
  };
  public createVoucher = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const vouchers = await this.voucherService.addVoucher(req.body);
      res.status(200).json({ data: vouchers, message: 'Tạo voucher thành công!' });
    } catch (error) {
      next(error);
    }
  };
  public updateVoucher = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const vouchers = await this.voucherService.updateVoucher(id, req.body);
      res.status(200).json({ data: vouchers, message: 'Cật nhật voucher thành công!' });
    } catch (error) {
      next(error);
    }
  };
  public removeVoucher = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.query.id;
      const vouchers = await this.voucherService.removeVoucher(id as string);
      res.status(200).json({ data: vouchers, message: 'Xoá voucher thành công' });
    } catch (error) {
      next(error);
    }
  };
}

export default VoucherController;
