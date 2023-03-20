import { roles } from './role';
import { genders } from './gender';

export type User = {
  id: string;
  username: string;
  phone: Number;
  email: string;
  password: string;
  location:string;
  isActive: Boolean;
  createdAt: Date;
  updatedAt: Date;
  isBlocked: Boolean;
  gender: genders;
  role: roles;
  image: {
    url: string;
    contentType: string;
  };
  two_FactAuth_Option:boolean;
};
