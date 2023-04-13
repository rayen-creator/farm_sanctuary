import { Injectable } from '@angular/core';
import {Product} from "../models/product";
import { Subject } from 'rxjs';
import {CartItem} from "../models/cartItem";


@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: CartItem[] = [];
  cartUpdated = new Subject<void>();

  constructor() {
    // Retrieve cart data from local storage
    const cartData = localStorage.getItem('cart');
    if (cartData) {
      this.cartItems = JSON.parse(cartData);
    }
  }

  addToCart(product: Product) {
    // Check if the product is already in the cart
    const existingCartItem = this.cartItems.find(item => item.name === product.name);
    if (existingCartItem) {
      // Increase the quantity of the existing cart item by 1
      existingCartItem.quantity++;
      existingCartItem.total= existingCartItem.price * existingCartItem.quantity
    } else {
      // Create a new cart item with the product name, price, and image
      const newCartItem: CartItem = {
        name: product.name,
        price: product.price,
        unit: product.unit,
        total: product.price,
        // @ts-ignore
        image: product.image,
        quantity: 1
      };
      // Add the cart item to the cart
      this.cartItems.push(newCartItem);
    }
    // Save cart data to local storage
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    // Emit cartUpdated event
    this.cartUpdated.next();
  }

  removeFromCart(product: CartItem) {
    // Find the index of the cart item with the specified product name
    const index = this.cartItems.findIndex(item => item.name === product.name);
    if (index > -1) {
      // Remove the cart item from the cartItems array
      this.cartItems.splice(index, 1);
      // Save cart data to local storage
      localStorage.setItem('cart', JSON.stringify(this.cartItems));
      // Emit cartUpdated event
      this.cartUpdated.next();
    }
  }
  getItems() {
    return this.cartItems;
  }

  clearCart() {
    this.cartItems = [];
    // Remove cart data from local storage
    localStorage.removeItem('cart');
    // Emit cartUpdated event
    this.cartUpdated.next();
  }
}
