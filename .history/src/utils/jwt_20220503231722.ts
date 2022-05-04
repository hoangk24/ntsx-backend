import { SECRET_KEY } from '@/config';
import { IDataStoredInToken, ITokenData } from '@/interfaces/auth.interface';
import { IUser } from '@/interfaces/users.interface';
import { sign, verify } from 'jsonwebtoken';

async function decodeToken(token: string): Promise<any> {
  const secretKey: string = SECRET_KEY;
  const data = await verify(token, secretKey);
  console.log(data);
  return data;
}
function createToken(user: IUser): ITokenData {
  const dataStoredInToken: IDataStoredInToken = { _id: user._id };
  const secretKey: string = SECRET_KEY;
  const expiresIn: number = 60 * 60;
  return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
}
function createRefreshToken(user: IUser): ITokenData {
  const dataStoredInToken: IDataStoredInToken = { _id: user._id };
  const secretKey: string = SECRET_KEY;
  const expiresIn: number = 60 * 60 * 2;

  return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
}

export { decodeToken, createToken, createRefreshToken };
