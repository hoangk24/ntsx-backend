import { IsEmail, IsString } from 'class-validator';

export class RegisterUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;

  @IsString()
  public fullName: string;
}

export class LoginUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}

export class ResendMailDto {
  @IsString()
  id: string;
}
export class CreateMailDto {
  @IsString()
  idUser: string;
  @IsString()
  subject: string;
  @IsString()
  title: string;
  @IsString()
  message: string;
}
