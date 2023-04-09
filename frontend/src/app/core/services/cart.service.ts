import { Injectable } from '@angular/core';
import {Product} from "../models/product";
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: Product[] = [];
  cartUpdated = new Subject<void>();

  constructor() {
    // Retrieve cart data from local storage
    const cartData = localStorage.getItem('cart');
    if (cartData) {
      this.items = JSON.parse(cartData);
    }
  }

  addToCart(product: Product) {
    this.items.push(product);
    // Save cart data to local storage
    localStorage.setItem('cart', JSON.stringify(this.items));
    // Emit cartUpdated event
    this.cartUpdated.next();
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    // Remove cart data from local storage
    localStorage.removeItem('cart');
    // Emit cartUpdated event
    this.cartUpdated.next();
    return this.items;
  }
}
