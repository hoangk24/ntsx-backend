import { Request } from 'express';
import { IUser } from '@interfaces/users.interface';
import { JwtPayload } from 'jsonwebtoken';

export interface IDataStoredInToken extends JwtPayload {
  _id: string;
}

export interface ITokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithUser extends Request {
  user: IUser;
}

export interface IEmail {
  email: string;
  verified: boolean;
}
