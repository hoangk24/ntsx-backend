import { SECRET_KEY } from '@/config';
import { CreateMailDto, ResendMailDto } from '@/dtos/users.dto';
import { HttpException } from '@/exceptions/HttpException';
import { IDataStoredInToken, ITokenData } from '@/interfaces/auth.interface';
import { IUser } from '@/interfaces/users.interface';
import emailModel from '@/models/email';
import { createToken } from '@/utils/jwt';
import userModel from '@models/users.model';
import jwt from 'jsonwebtoken';
class EmailService {
  public users = userModel;
  public emails = emailModel;

  public async verifiedEmail(token: string): Promise<IUser> {
    const data = await jwt.verify(token, SECRET_KEY);
    console.log(data);

    if (!data) throw new HttpException(400, 'Token invalid');
    const verify = await this.emails.findByIdAndUpdate(data._id, { verified: true });
    const findUser: IUser = await this.users.findOne({ email: verify.email });
    return findUser;
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
