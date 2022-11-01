import ProvinceController from '@/controllers/province.controller';
import { IRoutes } from '@interfaces/routes.interface';
import { Router } from 'express';

class ProvinceRoute implements IRoutes {
  public path = '/province';
  public router = Router();
  public provinceController = new ProvinceController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/city`, this.provinceController.getCity);
    this.router.get(`${this.path}/district/:id`, this.provinceController.getDistrict);
    this.router.get(`${this.path}/ward/:id`, this.provinceController.getWard);
  }
}

export default ProvinceRoute;
