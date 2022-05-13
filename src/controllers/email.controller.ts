import { UI_URL } from '@/config';
import { CreateMailDto, ResendMailDto } from '@/dtos/users.dto';
import { IUser } from '@/interfaces/users.interface';
import emailModel from '@/models/email';
import EmailService from '@/services/email.service';
import sendMail, { MessageSendMail } from '@/utils/sendMail';
import { Request, Response, NextFunction } from 'express';

export class EmailController {
  public emails = emailModel;
  public emailService = new EmailService();
  public async resendVerifyEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const userData: ResendMailDto = req.body;
      const { createUser, token } = await this.emailService.resendMail(userData);
      const message: MessageSendMail = {
        subject: 'Xác minh Email NTH Team',
        title: 'EMAIL VERIFIED',
        message: {
          text: 'Click vào xác minh để xác minh email của bạn',
          title: 'Chào bạn mừng bạn để NTH STORE',
          link: `${UI_URL}/verified-emal?token=$${token.token}`,
        },
      };
      await sendMail({ email: createUser?.email?.email, message, type: 'verify' }).then(() => {
        res.status(201).json({ data: createUser, message: 'Gửi mail thành công!' });
      });
    } catch (error) {
      next(error);
    }
  }
  public async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;

      const token = await this.emailService.forgotPassword(email);
      const message: MessageSendMail = {
        subject: 'Xác minh Email NTH Team',
        title: 'EMAIL VERIFIED',
        message: {
          text: 'Click vào xác minh để đổi mật khẩu của bạn',
          title: 'Chào bạn mừng bạn để NTH STORE',
          link: `${UI_URL}/change-password?token=${token.token}`,
        },
      };
      await sendMail({ email: email, message, type: 'verify' }).then(() => {
        res.status(201).json({ data: {}, message: 'Gửi mail thành công!' });
      });
    } catch (error) {
      next(error);
    }
  }
  public async verifiedEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const { token }: any = req.body;
      const user: IUser = await this.emailService.verifiedEmail(token);
      res.status(200).json({
        data: user,
        message: 'Xác nhận tài khoản thành công!',
      });
    } catch (error) {
      next(error);
    }
  }
  public async createEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const createMail: CreateMailDto = req.body;
      const { findEmail } = await this.emailService.createEmail(createMail);
      const message: MessageSendMail = {
        subject: createMail.subject,
        title: createMail.title,
        message: {
          title: createMail.title,
          message: createMail.message,
        },
      };
      await sendMail({ email: findEmail?.email?.email, message, type: 'email' }).then(() => {
        res.status(201).json({ data: findEmail, message: 'Gửi mail thành công!' });
      });
    } catch (error) {
      next(error);
    }
  }
}
