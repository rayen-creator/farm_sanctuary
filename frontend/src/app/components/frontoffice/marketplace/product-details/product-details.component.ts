import { Component, OnInit } from '@angular/core';
import {Product} from "../../../../core/models/product";
import {ProductService} from "../../../../core/services/product.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  public product: Product;
  constructor(private productService: ProductService, private router:Router, private currentRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getProduct()
  }
  getProduct(){
    let id = this.currentRoute.snapshot.params['id'];
    this.productService.getProduct(id).subscribe({
      next: (product: Product) => {
        this.product = product;
        console.log(this.product);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
