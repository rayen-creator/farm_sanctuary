import { RecommendedProduct } from './recommandedprod';
export interface Product {
    asin: string;
    title?: string;
    price?: number;
    image?: string;
    description?: string;
    rating?: number;
    recommendedProducts?: RecommendedProduct[];
  }
  