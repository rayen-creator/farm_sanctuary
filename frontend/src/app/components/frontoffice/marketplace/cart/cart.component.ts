import { Component, OnInit } from '@angular/core';
import {CartService} from "../../../../core/services/cart.service";
import {Product} from "../../../../core/models/product";

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

}
