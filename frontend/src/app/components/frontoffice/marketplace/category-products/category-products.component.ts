import { Component, OnInit } from '@angular/core';
import {Product} from "../../../../core/models/product";
import {ProductService} from "../../../../core/services/product.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-category-products',
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.css']
})
export class CategoryProductsComponent implements OnInit {
  public categoryProductsList: Product[];
  public visibleProducts: Product[];
  public numberOfProductsToShow = 9;

  searchText: any;
   category: any;
  constructor(private productService: ProductService,private currentRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.category = this.currentRoute.snapshot.params['category'];
    this.getAllCategoryProducts();
    this.setupSorting();
  }
  getAllCategoryProducts() {
    this.productService.getProductsByCategory(this.category).subscribe({
      next: (products) => {
        this.categoryProductsList = products;
        console.log(this.categoryProductsList);
        this.sortByPopularity();
        this.visibleProducts = this.categoryProductsList.slice(0, this.numberOfProductsToShow);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  showMoreProducts() {
    this.numberOfProductsToShow += 6;
    this.visibleProducts = this.categoryProductsList.slice(0, this.numberOfProductsToShow);
  }

  getStars(average: number = 0): number[] {
    const stars = [];
    const roundedAverage = Math.round(average);
    for (let i = 0; i < roundedAverage; i++) {
      stars.push(i);
    }
    return stars;
  }

  setupSorting() {
    const selectElement = document.getElementById('sortProducts') as HTMLSelectElement;
    selectElement.addEventListener('change', () => {
      const sortCriteria = selectElement.value;
      if (sortCriteria === 'priceAsc') {
        const sortedProducts = [...this.categoryProductsList];
        sortedProducts.sort((a, b) => a.price - b.price);
        this.categoryProductsList = sortedProducts;
      } else if (sortCriteria === 'priceDesc') {
        const sortedProducts = [...this.categoryProductsList];
        sortedProducts.sort((a, b) => b.price - a.price);
        this.categoryProductsList = sortedProducts;
      } else if (sortCriteria === 'popularity') {
        const sortedProducts = [...this.categoryProductsList];
        sortedProducts.sort((a, b) => b.rating.count - a.rating.count);
        this.categoryProductsList = sortedProducts;
      } else if (sortCriteria === 'country') {
        const sortedProducts = [...this.categoryProductsList];
        sortedProducts.sort((a, b) => a.country.localeCompare(b.country));
        this.categoryProductsList = sortedProducts;
      } else {
        // sort by any other criteria
      }
      this.visibleProducts = this.categoryProductsList.slice(0, this.numberOfProductsToShow);
    });
  }

  sortByPopularity() {
    if (Array.isArray(this.categoryProductsList)) {
      const sortedProducts = [...this.categoryProductsList];
      sortedProducts.sort((a, b) => b.rating.count - a.rating.count);
      this.categoryProductsList = sortedProducts;
    }
  }
}
