import { UI_URL } from '@/config';
import sendMail, { MessageSendMail } from '@/utils/sendMail';
import { LoginUserDto, RegisterUserDto } from '@dtos/users.dto';
import { RequestWithUser } from '@interfaces/auth.interface';
import AuthService from '@services/auth.service';
import { NextFunction, Request, Response } from 'express';

class AuthController {
  public authService = new AuthService();

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: RegisterUserDto = req.body;
      const { createUser, token } = await this.authService.signup(userData);
      const message: MessageSendMail = {
        subject: 'Xác minh Email NTH Team',
        title: 'EMAIL VERIFIED',
        message: {
          title: 'Vui lòng click Xác minh để xác minh tài khoản của bạn',
          link: `${UI_URL}/verified-emal?token=$${token.token}`,
        },
      };
      await sendMail({ email: createUser?.email?.email, message, type: 'verify' }).then(() => {
        res.status(201).json({ data: createUser, message: 'Vui lòng check email để kích hoạt tài khoản!' });
      });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: LoginUserDto = req.body;
      const { findUser, token, refreshToken } = await this.authService.login(userData);
      res.status(200).json({
        data: {
          user: findUser,
          token,
          refreshToken,
        },
        message: 'Đăng nhập thành công!',
      });
    } catch (error) {
      next(error);
    }
  };
  public getAccessToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { refreshToken } = req.body;
      const { token } = await this.authService.getNewToken(refreshToken);
      res.status(200).json({ data: { token }, message: 'Lấy token mới thành công!' });
    } catch (error) {
      next(error);
    }
  };
  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      res.status(200).json({ data: {}, message: 'Đăng xuất thành công!' });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
