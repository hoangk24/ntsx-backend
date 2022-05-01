export interface IComment {
  _id?: string;
  product?: any;
  user: any;
  rate?: number;
}

export interface Request {
  room: string;
  [x: string]: any;
}
