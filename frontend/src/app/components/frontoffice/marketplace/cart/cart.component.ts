import { Component, OnInit } from '@angular/core';
import {CartService} from "../../../../core/services/cart.service";
import Swal from "sweetalert2";
import {CartItem} from "../../../../core/models/cartItem";
import {Router} from "@angular/router";


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
 cartProducts: CartItem[];
  cartTotal = 0;

  constructor( private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cartProducts = this.cartService.getItems();
    console.log(this.cartProducts)
    this.cartTotal = this.cartProducts.reduce((total, item) => total + item.total, 0);
    this.cartService.cartUpdated.subscribe(() => {
      this.cartProducts = this.cartService.getItems();
      this.cartTotal = this.cartProducts.reduce((total, item) => total + item.total, 0);
    });
  }
  clearCart() {
    Swal.fire({
      title: 'Are you sure you want to clear the cart?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, clear cart',
    }).then((result) => {
      if (result.isConfirmed) {
        this.cartService.clearCart();
        this.cartProducts = [];
        Swal.fire('Cleared', 'Cart has been cleared successfully.', 'success');
      }
    });
  }

  updateQuantity(product: any, modifier: number) {
    if (product.quantity + modifier > 0) {
      product.quantity += modifier;
      product.total = product.quantity * product.price;

      // Update cart data in local storage
      localStorage.setItem('cart', JSON.stringify(this.cartService.cartItems));

      this.cartService.cartUpdated.next();
    }
  }

  removeFromCart(product: CartItem) {
    Swal.fire({
      title: 'Are you sure you want to remove this item from the cart?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove item'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cartService.removeFromCart(product);
        Swal.fire('Removed', 'Item has been removed from the cart.', 'success');
      }
    });

  }

  checkout() {
    localStorage.setItem('cart_total', JSON.stringify(this.cartTotal))
    this.router.navigate(['marketplace/payment'])
}
}
