import {units} from "./unit";

export interface CartItem {
  name: string;
  price: number;
  total: number;
  image: string;
  unit: units
  quantity: number;
}
