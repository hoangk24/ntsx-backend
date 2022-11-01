import ProvinceService from '@/services/province.service';
import { NextFunction, Request, Response } from 'express';

class ProvinceController {
  public provinceService = new ProvinceService();
  public getCity = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.provinceService.getCity();
      res.status(200).json({ data: data, message: 'get city success' });
    } catch (error) {
      next(error);
    }
  };
  public getDistrict = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: any = req.params.id;
      const data = await this.provinceService.getDistrict(id);
      res.status(200).json({ data: data, message: 'get city success' });
    } catch (error) {
      next(error);
    }
  };
  public getWard = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: any = req.params.id;
      const data = await this.provinceService.getWard(id);
      res.status(200).json({ data: data, message: 'get city success' });
    } catch (error) {
      next(error);
    }
  };
}

export default ProvinceController;
