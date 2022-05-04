import { SECRET_KEY } from '@/config';
import { CreateMailDto, ResendMailDto } from '@/dtos/users.dto';
import { HttpException } from '@/exceptions/HttpException';
import { IDataStoredInToken, ITokenData } from '@/interfaces/auth.interface';
import { IUser } from '@/interfaces/users.interface';
import emailModel from '@/models/email';
import { createToken, decodeToken } from '@/utils/jwt';
import userModel from '@models/users.model';
import jwt from 'jsonwebtoken';
class EmailService {
  public users = userModel;
  public emails = emailModel;
  public async forgotPassword(email: string): Promise<any> {
    const findEmail = await this.emails.findOne({ email });
    if (!findEmail) throw new HttpException(400, 'Email này không trùng với tài khoản nào');
    const findUser = await this.users.findOne({ email: findEmail._id });
    const token = await createToken(findUser);
    return token;
  }
  public async verifiedEmail(token: string): Promise<IUser> {
    const data: any = await jwt.verify(token, SECRET_KEY);
    const user = await this.users.findById(data._id);
    await this.emails.findByIdAndUpdate(user.email, { verified: true });
    return user;
  }
  public async resendMail(userData: ResendMailDto): Promise<{ createUser: IUser; token: ITokenData }> {
    const findUser: IUser = await this.users.findById(userData.id).populate({
      path: 'email',
      model: emailModel,
      select: 'email verified',
    });
    const token = await createToken(findUser);
    return { createUser: findUser, token };
  }

  public async createEmail(createData: CreateMailDto): Promise<{ findEmail: IUser }> {
    const findUser: IUser = await this.users.findById(createData.idUser).populate({
      path: 'email',
      model: emailModel,
      select: 'email verified',
    });

    return { findEmail: findUser };
  }
}

export default EmailService;
