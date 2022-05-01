export interface IProduct {
  _id: string;
  name: string;
  price: number;
  size: ISizes[];
  posters: IImage[];
  discount: number;
  category: string;
  note: string;
  nsx: string;
  totalQuantity: number;
  rate: {
    terribly: number;
    bad: number;
    normal: number;
    good: number;
    well: number;
  };
}

export interface ISizes {
  size: number;
  quantity: number;
}

export interface IImage {
  public_id: string;
  url: string;
}

export interface ICategory {
  _id: string;
  name: string;
  path: string;
  logo: IImage;
  subCategory: ISubCategory[];
}

export interface ISubCategory {
  name: string;
  path: string;
}
