import { Component, OnInit } from '@angular/core';
import {Product} from "../../../../core/models/product";
import {ProductService} from "../../../../core/services/product.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../../../../core/services/auth.service";
import {DecodedToken} from "../../../../core/graphql/graphqlResponse/decodedToken";
import jwt_decode from "jwt-decode";
import {Subscription} from "rxjs";
import Swal from "sweetalert2";

@Component({
  selector: 'app-user-products',
  templateUrl: './user-products.component.html',
  styleUrls: ['./user-products.component.css']
})
export class UserProductsComponent implements OnInit {
  public productsList: Product[];
  token: string;
  decodedToken: DecodedToken;
  userId: string;
  private tokenSubs: Subscription;
  public visibleProducts: Product[];
  public numberOfProductsToShow = 9;
  searchText: any;
  constructor(private productService: ProductService, private router:Router, private toastr:ToastrService, private auth: AuthService) { }

  ngOnInit(): void {
    this.tokenSubs = this.auth.getToken().subscribe((token) => {
      this.token = token
      this.decodedToken = jwt_decode(this.token) as DecodedToken;
      this.userId = this.decodedToken.id;
    });
    this.getAllProducts()
    this.setupSorting();
  }
  getAllProducts(){
    this.productService.getProductsByUser(this.userId).subscribe({
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
  deleteProduct(id:string) {
      Swal.fire({
        title: 'Are you sure you want to delete this product ?',
        text: 'This action cannot be undone.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete',
      }).then((result) => {
        if (result.isConfirmed) {
          this.productService.deleteProduct(id, this.userId)
          Swal.fire('deleted', 'Product has been created successfully.', 'success');
        }
      });
    }

  setupSorting() {
    const selectElement = document.getElementById('sortProducts') as HTMLSelectElement;
    selectElement.value = "expiration"
    selectElement.addEventListener('change', () => {
      const sortCriteria = selectElement.value;
      if (sortCriteria === 'quantity') {
        const sortedProducts = [...this.productsList];
        sortedProducts.sort((a, b) => a.quantity - b.quantity);
        this.productsList = sortedProducts;
      } else if (sortCriteria === 'popularity') {
        const sortedProducts = [...this.productsList];
        sortedProducts.sort((a, b) => b.rating.count - a.rating.count);
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
