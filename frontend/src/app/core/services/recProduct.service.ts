import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../models/product';


@Injectable({
    providedIn: 'root'
  })
  export class ProductService {
    constructor(private apollo: Apollo) {}
  
    getProduct(asin: string): Observable<Product> {
      const query = gql`
        query GetProduct($asin: String!) {
          product(asin: $asin) {
            asin
            title
            price
            image
            description
            rating
            recommendedProducts {
              title
              price
              image
              url
            }
          }
        }
      `;
  
      return this.apollo
        .query<{ product: Product }>({
          query,
          variables: { asin },
        })
        .pipe(map(result => result.data.product));
    }
  }