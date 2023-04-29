
import {CartItem} from "./cartItem";
import {User} from "./user";

export interface Order {
  id: string;
  cartItems: CartItem[];
  totalPrice: number;
  user: User;
  farmer: User;
  isDelivered: boolean;
  createdAt: Date;
  updatedAt: Date;
  isConfirmed: boolean;

}