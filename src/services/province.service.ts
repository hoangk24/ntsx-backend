import axios, { AxiosRequestConfig } from 'axios';

class ProvinceService {
  private API_ENPOINT = {
    CITY: '/province',
    DISTRICT: '/province/district',
    WARD: '/province/ward',
  };
  private BASE_URL = 'https://vapi.vnappmob.com/api';
  private config: AxiosRequestConfig = {
    baseURL: this.BASE_URL,
    headers: {
      Accept: 'application/json',
    },
  };
  public async getCity() {
    const res: any = await axios.get(this.API_ENPOINT.CITY, this.config);
    return res.data.results;
  }
  public async getDistrict(id: string) {
    const res: any = await axios.get(`${this.API_ENPOINT.DISTRICT}/${id}`, this.config);
    return res.data.results;
  }
  public async getWard(id: string) {
    const res: any = await axios.get(`${this.API_ENPOINT.WARD}/${id}`, this.config);
    return res.data.results;
  }
}

export default ProvinceService;
