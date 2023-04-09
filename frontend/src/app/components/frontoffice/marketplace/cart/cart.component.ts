import { Component, OnInit } from '@angular/core';
import {CartService} from "../../../../core/services/cart.service";
import {Product} from "../../../../core/models/product";
import Swal from "sweetalert2";


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  private cartProducts: Product[];

  constructor( private cartService: CartService) { }

  ngOnInit(): void {
    this.cartProducts = this.cartService.getItems()
    console.log(this.cartProducts)
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
}
