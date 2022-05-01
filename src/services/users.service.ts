import emailModel from '@/models/email';
import { RegisterUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { Role, IUser } from '@interfaces/users.interface';
import userModel from '@models/users.model';
import { isEmpty } from '@utils/util';
import { hash } from 'bcrypt';
import mongoose from 'mongoose';
class UserService {
  public users = userModel;
  public emails = emailModel;
  public async findAllUser(): Promise<IUser[]> {
    const users: IUser[] = await this.users.find({ isDeleted: false }).populate('email');
    return users;
  }
  public async findUserById(userId: string): Promise<IUser> {
    if (isEmpty(userId)) throw new HttpException(400, 'Không tìm thấy id!');
    const findUser: IUser = await this.users.findOne({ _id: userId }).populate('email');
    if (!findUser) throw new HttpException(409, 'Không tìm thấy người dùng này!');
    return findUser;
  }

  public async activeMail(userId: string): Promise<IUser> {
    if (isEmpty(userId)) throw new HttpException(400, 'Không tìm thấy id!');
    const findUser: IUser = await this.users.findOne({ _id: userId }).populate('email');
    if (!findUser) throw new HttpException(409, 'Không tìm thấy người dùng này!');
    await this.emails.findOneAndUpdate({ email: findUser?.email?.email }, { verified: true });
    return findUser;
  }
  public async changeRole(userId: string, role: Role): Promise<IUser> {
    if (isEmpty(userId)) throw new HttpException(400, 'Không tìm thấy id!');
    const findUser: IUser = await this.users.findByIdAndUpdate(userId, { role });
    if (!findUser) throw new HttpException(409, 'Không tìm thấy người dùng này!');
    return findUser;
  }

  public async createUser(userData: RegisterUserDto): Promise<IUser> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findEmail = await this.emails.findOne({ email: userData.email });
    if (findEmail) throw new HttpException(409, `${userData.email} này đã có người sử dụng!`);
    const createEmail = await this.emails.create({
      _id: new mongoose.Types.ObjectId(),
      email: userData.email,
    });
    const hashedPassword = await hash(userData.password, 10);
    const createUserData: IUser = await this.users.create({
      _id: new mongoose.Types.ObjectId(),
      ...userData,
      password: hashedPassword,
      email: createEmail._id,
    });
    if (!createUserData) throw new HttpException(400, 'Tạo user không thành công!');
    return createUserData;
  }

  public async updateUser(userId: string, userData: RegisterUserDto): Promise<IUser> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");
    if (userData.email) {
      const findUser: IUser = await this.users.findOne({ email: userData.email });
      if (findUser && findUser._id != userId) throw new HttpException(409, `You're email ${userData.email} already exists`);
    }
    if (userData.password) {
      const hashedPassword = await hash(userData.password, 10);
      userData = { ...userData, password: hashedPassword };
    }
    const updateUserById: IUser = await this.users.findByIdAndUpdate(userId, { userData });
    if (!updateUserById) throw new HttpException(409, "You're not user");
    return updateUserById;
  }

  public async deleteUser(userId: string): Promise<IUser> {
    const isUserDeleteAdmin: IUser = await this.users.findById(userId);
    if (isUserDeleteAdmin.role === Role.ADMIN) throw new HttpException(400, 'User này không thể xoá!');
    const deleteUserById: IUser = await this.users.findByIdAndUpdate(userId, { isDeleted: !isUserDeleteAdmin.isDeleted }, { new: true });
    return deleteUserById;
  }
}

export default UserService;
