import { roles } from './role';
import { genders } from './gender';
import { Post } from './post';
import { Badge } from './badge';

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
  likedPost:Post[];
  badges:Badge[];

  birthday: Date;
  bio: string;

};
