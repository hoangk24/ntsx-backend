import { PASS, UI_URL, USER } from '@/config';
import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import path from 'path';
export interface DataSendMail {
  email: string;
  message: MessageSendMail;
  type: 'verify' | 'email';
}

export interface MessageSendMail {
  subject: string;
  title: string;
  message: any;
}

async function sendMail(data: DataSendMail): Promise<any> {
  const { email, message, type } = data;

  const options = {
    viewEngine: {
      extname: '.hbs', // handlebars extension
      layoutsDir: null, // location of handlebars templates
      defaultLayout: null, // name of main template
    },
    viewPath: path.resolve('src/views/layout'),
    extName: '.hbs',
  };
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: USER,
      pass: PASS,
    },
  });
  transporter.use('compile', hbs(options));
  const mail = {
    from: '"NTH TEAM 👻', // sender address
    to: email,
    subject: message.subject,
    title: message.title,
    template: type,
    context: {
      ...message,
    },
  };
  await transporter.sendMail(mail);
}

export default sendMail;
