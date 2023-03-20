import { roles } from './role';
import { genders } from './gender';

export type User = {
  id: string;
  username: string;
  phone: Number;
  email: string;
  password: string;
  location:string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  isBlocked: boolean;
  gender: genders;
  role: roles;
  image: string
  two_FactAuth_Option:boolean;
  email_change_option: boolean;
};
