import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../core/models/product';
import { ProductService } from '../../../../core/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public productsList: Product[];
  public visibleProducts: Product[];
  public numberOfProductsToShow = 9;
  searchText: any;

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
        this.sortByExpiration();
        this.visibleProducts = this.productsList.slice(0, this.numberOfProductsToShow);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  showMoreProducts() {
    this.numberOfProductsToShow += 6;
    this.visibleProducts = this.productsList.slice(0, this.numberOfProductsToShow);
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
        const sortedProducts = [...this.productsList];
        sortedProducts.sort((a, b) => a.price - b.price);
        this.productsList = sortedProducts;
      } else if (sortCriteria === 'priceDesc') {
        const sortedProducts = [...this.productsList];
        sortedProducts.sort((a, b) => b.price - a.price);
        this.productsList = sortedProducts;
      } else if (sortCriteria === 'popularity') {
        const sortedProducts = [...this.productsList];
        sortedProducts.sort((a, b) => b.rating.count - a.rating.count);
        this.productsList = sortedProducts;
      } else if (sortCriteria === 'country') {
        const sortedProducts = [...this.productsList];
        sortedProducts.sort((a, b) => a.country.localeCompare(b.country));
        this.productsList = sortedProducts;
      } else if (sortCriteria === 'expiration') {
        const sortedProducts = [...this.productsList];
        sortedProducts.sort((a, b) => new Date(a.expirationDate).getTime() - new Date(b.expirationDate).getTime());
        this.productsList = sortedProducts;
      } else {
        // sort by any other criteria
      }
      this.visibleProducts = this.productsList.slice(0, this.numberOfProductsToShow);
    });
  }

  sortByExpiration() {
    if (Array.isArray(this.productsList)) {
      const sortedProducts = [...this.productsList];
      sortedProducts.sort((a, b) => new Date(a.expirationDate).getTime() - new Date(b.expirationDate).getTime());
      this.productsList = sortedProducts;
    }
  }
}
