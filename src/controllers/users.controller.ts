import { NextFunction, Request, Response } from 'express';
import { RegisterUserDto } from '@dtos/users.dto';
import { IUser } from '@interfaces/users.interface';
import userService from '@services/users.service';

class UsersController {
  public userService = new userService();

  public getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllUsersData: IUser[] = await this.userService.findAllUser();
      res.status(200).json({ data: findAllUsersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const findOneUserData: IUser = await this.userService.findUserById(userId);

      res.status(200).json({ data: findOneUserData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: RegisterUserDto = req.body;
      const createUserData: IUser = await this.userService.createUser(userData);
      res.status(201).json({ data: createUserData, message: 'Tạo user thành công' });
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const userData: RegisterUserDto = req.body;
      const updateUserData: IUser = await this.userService.updateUser(userId, userData);

      res.status(200).json({ data: updateUserData, message: 'Cật nhật user thành công!' });
    } catch (error) {
      next(error);
    }
  };
  public async activeMailUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId: string = req.params.id;
      const updateUserData: IUser = await this.userService.activeMail(userId);
      res.status(200).json({ data: updateUserData, message: 'Cật nhật user thành công!' });
    } catch (error) {
      next(error);
    }
  }

  public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const deleteUserData: IUser = await this.userService.deleteUser(userId);
      res.status(200).json({ data: deleteUserData, message: 'Xoá user thành công' });
    } catch (error) {
      next(error);
    }
  };
  public changeRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const { role } = req.body;
      const changeRole: IUser = await this.userService.changeRole(userId, role);
      res.status(200).json({ data: changeRole, message: 'Change role thành công' });
    } catch (error) {
      next(error);
    }
  };
}

export default UsersController;
