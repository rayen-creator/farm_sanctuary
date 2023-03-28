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
    this.getAllProducts();
    this.setupSorting();
  }

  getAllProducts() {
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

  setupSorting() {
    const selectElement = document.getElementById('sortProducts') as HTMLSelectElement;
    selectElement.addEventListener('change', () => {
      const sortCriteria = selectElement.value;
      if (sortCriteria === 'priceAsc') {
        const sortedProducts = [...this.productsList];
        sortedProducts.sort((a, b) => a.price - b.price);
        this.productsList = sortedProducts;
      } else if (sortCriteria === 'priceDesc') {
        const sortedProducts = [...this.productsList];
        sortedProducts.sort((a, b) => b.price - a.price);
        this.productsList = sortedProducts;
      } else {
        // sort by popularity or any other criteria
      }
    });
  }
}
