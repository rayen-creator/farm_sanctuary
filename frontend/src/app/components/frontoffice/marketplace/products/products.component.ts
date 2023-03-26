import { Component, OnInit } from '@angular/core';
import {Product} from "../../../../core/models/product";
import {ProductService} from "../../../../core/services/product.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public productsList: Product[];
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getAllProducts()
  }
  getAllProducts(){
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.productsList = products;
        console.log(this.productsList);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
