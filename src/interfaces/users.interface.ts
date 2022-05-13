export interface IUser {
  _id: string;
  email: any;
  password: string;
  fullName: string;
  role: Role;
  avatar: string;
  isDeleted: boolean;
}
export enum Role {
  'MASTER' = 0,
  'ADMIN' = 1,
  'USER' = 2,
}
