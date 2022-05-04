import { IToken } from '@/interfaces/token.interface';
import emailModel from '@/models/email';
import { createRefreshToken, createToken, decodeToken } from '@/utils/jwt';
import { LoginUserDto, RegisterUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { IDataStoredInToken, ITokenData } from '@interfaces/auth.interface';
import { IUser } from '@interfaces/users.interface';
import userModel from '@models/users.model';
import { isEmpty } from '@utils/util';
import { compare, hash } from 'bcrypt';
import mongoose from 'mongoose';

class AuthService {
  public users = userModel;
  public emails = emailModel;
  public async signup(userData: RegisterUserDto): Promise<{ createUser: IUser; token: ITokenData }> {
    if (isEmpty(userData)) throw new HttpException(400, 'Not found userdata');
    const findUser = await this.emails.findOne({ email: userData.email });
    if (findUser) throw new HttpException(409, `You're email ${userData.email} already exists`);
    const hashedPassword = await hash(userData.password, 10);
    const createMail = await this.emails.create({ _id: new mongoose.Types.ObjectId(), email: userData.email });
    const createUserData: IUser = await this.users.create({
      _id: new mongoose.Types.ObjectId(),
      ...userData,
      email: createMail._id,
      password: hashedPassword,
    });
    const token: ITokenData = await createToken(createUserData);
    const createUserFind: IUser = await this.users.findById(createUserData._id).populate({
      path: 'email',
      model: emailModel,
      select: 'email verified',
    });
    return { createUser: createUserFind, token };
  }

  public async login(userData: LoginUserDto): Promise<{ findUser: IUser; token: any; refreshToken: any }> {
    const { password, email } = userData;
    const findUserEmail = await this.emails.findOne({ email });
    if (!findUserEmail) throw new HttpException(409, `${email} không tồn tại!`);
    const findUser = await this.users.findOne({ email: findUserEmail._id }).populate('email');
    const isPasswordMatching: boolean = await compare(password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, 'Mật khẩu không đúng!');
    // if (!findUser.isDeleted) throw new HttpException(409, 'Tài khoản của bạn đã bị khoá!');
    if (!findUserEmail.verified) throw new HttpException(400, 'Email của bạn chưa được xác thực!');
    const token = await createToken(findUser);
    const refreshToken = await createRefreshToken(findUser);
    return { findUser, token, refreshToken };
  }
  public async getNewToken({ refreshToken }: { refreshToken: string }): Promise<{ token: ITokenData }> {
    const user: IDataStoredInToken = await decodeToken(refreshToken);
    const findUser: IUser = await this.users.findById(user._id);
    const token: ITokenData = await createRefreshToken(findUser);
    return { token };
  }
  public async logout(userData: IUser): Promise<IUser> {
    if (isEmpty(userData)) throw new HttpException(400, 'Không có thông tin user!');

    const findUser: IUser = await this.users.findOne({ email: userData.email, password: userData.password });
    if (!findUser) throw new HttpException(409, ` ${userData.email} không tìm thấy!`);

    return findUser;
  }
}

export default AuthService;
