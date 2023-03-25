import { ProductCategory } from './productCategory';

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  location: {
    type: string;
    coordinates: number[];
  };
  user: string;
  expirationDate: Date;
  rating: {
    total: number;
    count: number;
    average: number;
  };
  reviews: {
    userReview: string;
    rating: number;
    comment: string;
    createdAt: Date;
  }[];
  category: ProductCategory;
  createdAt: Date;
  updatedAt: Date;
  image?: string;
};
