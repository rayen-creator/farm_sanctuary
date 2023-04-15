import { ProductCategory } from './productCategory';
import {units} from "./unit";
import {User} from "./user";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  unit: units
  country: string;
  user: string;
  expirationDate: Date;
  inSale: boolean;
  expirationDiscount: boolean;
  rating: {
    total: number;
    count: number;
    average: number;
  };
  reviews: {
    userReview: User;
    rating: number;
    comment: string;
    createdAt: Date;
  }[];
  category: ProductCategory;
  createdAt: Date;
  updatedAt: Date;
  image?: string;
};
