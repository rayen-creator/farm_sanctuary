import { Apollo} from 'apollo-angular';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  createProduct,
  deleteProduct,
  product,
  products,
  updateProduct
} from "../graphql/queries/graphql.queries.product";
import {Product} from "../models/product";
import {CreateProductResponse} from "../graphql/graphqlResponse/createProductResponse";


@Injectable({
  providedIn: 'root',
})

export class ProductService {

  constructor(
    private appolo: Apollo,
    private router: Router,
    private toastr: ToastrService
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

  getProduct(id: string){
    return this.appolo
      .watchQuery({
        query: product,
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

  createProduct(product: Product) {
    const input = {
      name: product.name,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
      location: product.location,
      user: product.user,
      expirationDate: product.expirationDate,
      category: product.category,
    };

    return this.appolo
      .mutate({
        mutation: createProduct,
        variables: {
          input: input,
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
      location: prod.location,
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
