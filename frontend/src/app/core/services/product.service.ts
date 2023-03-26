import { Apollo} from 'apollo-angular';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  createProduct,
  deleteProduct,
  product,
  products, productsByUser,
  updateProduct
} from "../graphql/queries/graphql.queries.product";
import {Product} from "../models/product";
import {CreateProductResponse} from "../graphql/graphqlResponse/createProductResponse";
import {AuthService} from "./auth.service";
import {DecodedToken} from "../graphql/graphqlResponse/decodedToken";
import jwt_decode from "jwt-decode";
import {catchError, Observable, of} from "rxjs";
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})

export class ProductService {

  token: string;
  decodedToken: DecodedToken;
  userId: string;

  constructor(
    private appolo: Apollo,
    private router: Router,
    private toastr: ToastrService,
    private auth: AuthService
  ) { }

  getProducts(){
    return this.appolo
      .watchQuery({
        query: products,
      }).valueChanges.subscribe({
        next: (res) => {
          //get the response
          const productList = res.data as Product[];
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  getProduct(id: string): Observable<Product> {
    // @ts-ignore
    return this.appolo
      .watchQuery({
        query: product,
        variables: {id},
      }).valueChanges.pipe(
        // @ts-ignore
        map((res) => res.data.getProduct as Product),
        catchError((err) => {
          console.log(err);
          return of(null);
        })
      );
  }


  getProductsByUser(userId: string): Observable<Product[]> {
    return this.appolo.watchQuery({
      query: productsByUser,
      variables: { userId },
    }).valueChanges.pipe(
      map((res) => {
        // @ts-ignore
        const products = res.data.getProductsByUser;
        return products as Product[];
      })
    );
  }
  createProduct(product: Product , selectedFile: File) {
    this.token = this.auth.getToken();
    this.decodedToken = jwt_decode(this.token) as DecodedToken;
    this.userId = this.decodedToken.id;
    const input = {
      name: product.name,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
      unit: product.unit,
      user: this.userId,
      expirationDate: product.expirationDate,
      category: product.category,
    };
    return this.appolo
      .mutate({
        mutation: createProduct,
        variables: {
          input: input,
          file: selectedFile
        },
        refetchQueries: [
          {
            query: products
          }],
        context: {
          useMultipart: true
        }
      })
      .subscribe({
        next: (res) => {
          //get the response
          const createProductRes = res.data as CreateProductResponse;

          const message = createProductRes.createProduct.message;

        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  updateProduct(id:string,prod: Product) {
    const input = {
      name: prod.name,
      description: prod.description,
      price: prod.price,
      quantity: prod.quantity,
      unit: prod.unit,
      user: prod.user,
      expirationDate: prod.expirationDate,
      category: prod.category,
    };

    return this.appolo
      .mutate({
        mutation: updateProduct,
        variables: {
          id,
          input: input
        },
        refetchQueries: [{
          query: product,
          variables: {id}
        },
          {
            query: products
          }],
        context: {
          useMultipart: true
        }
      })
      .subscribe({
        next: (res) => {
          //get the response
          const updateProductRes = res.data as CreateProductResponse;

          const message = updateProductRes.createProduct.message;

        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  deleteProduct(id: string){
    return this.appolo
      .watchQuery({
        query: deleteProduct,
        variables: {id},
      }).valueChanges.subscribe({
        next: (res) => {
          //get the response
          const product = res.data as Product;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }


}
