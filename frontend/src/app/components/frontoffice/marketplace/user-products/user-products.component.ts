import { Component, OnInit } from '@angular/core';
import {Product} from "../../../../core/models/product";
import {ProductService} from "../../../../core/services/product.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../../../../core/services/auth.service";
import {DecodedToken} from "../../../../core/graphql/graphqlResponse/decodedToken";
import jwt_decode from "jwt-decode";
import {Subscription} from "rxjs";

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
  constructor(private productService: ProductService, private router:Router, private toastr:ToastrService, private auth: AuthService) { }

  ngOnInit(): void {
    this.token = this.auth.getToken();
    this.decodedToken = jwt_decode(this.token) as DecodedToken;
    this.userId = this.decodedToken.id;
    this.getAllProducts()
  }
  getAllProducts(){
    this.productService.getProductsByUser(this.userId).subscribe({
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
