import { roles } from './role';
import { genders } from './gender';

export type User = {
  id: String;
  username: String;
  phone: Number;
  email: String;
  password: String;
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
};
