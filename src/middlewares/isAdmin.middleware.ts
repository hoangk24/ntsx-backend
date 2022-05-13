import { Role } from '@/interfaces/users.interface';
import { HttpException } from '@exceptions/HttpException';
import { RequestWithUser } from '@interfaces/auth.interface';
import { NextFunction, Response } from 'express';

const isAdminMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  const user = req.user;
  if ([Role.ADMIN, Role.MASTER].includes(user.role)) next();
  else {
    next(new HttpException(401, 'Không đủ quyền!'));
  }
};

export default isAdminMiddleware;
