import { AutoRun } from '@/services/auto.service';
import DiscountService from '@/services/discount.service';
import { NextFunction, Request, Response } from 'express';

class DiscountController {
  discountService = new DiscountService();
  autoService = new AutoRun();

  public getDiscount = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const discounts = await this.discountService.getDiscount();
      res.status(200).json({ data: discounts, message: 'Get discount successfully' });
    } catch (error) {
      next(error);
    }
  };
  public addDiscount = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const discounts = await this.discountService.addDiscount(req.body);
      res.status(200).json({ data: discounts, message: 'add discount successfully' });
    } catch (error) {
      next(error);
    }
  };
  public applyDiscount = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const discounts = await this.discountService.applyDiscount(req.body);
      await this.autoService.run();
      res.status(200).json({ data: discounts, message: 'apply discount successfully' });
    } catch (error) {
      next(error);
    }
  };
  public updateDiscount = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const discounts = await this.discountService.updateDiscount(id as string, req.body);
      await this.autoService.run().catch(err => console.log(err));
      res.status(200).json({ data: discounts, message: 'update discount successfully' });
    } catch (error) {
      next(error);
    }
  };
}

export default DiscountController;
