import { Apollo} from 'apollo-angular';
import { Injectable } from '@angular/core';
import {catchError, Observable, of, Subscription} from "rxjs";
import { RecommendedProduct } from '../models/recommandedprod';
import { recommendedProduct } from '../graphql/queries/graphql.queries.recommended';

@Injectable({
    providedIn: 'root',
  })
  
export class recommendedProductService {

    constructor(private appolo : Apollo){}

getrecommendedProduct(asin: string): Observable<RecommendedProduct> {
    // @ts-ignore
    return this.appolo
      .watchQuery({
        query: recommendedProduct,
        variables: {asin},
      }).valueChanges.pipe(
        // @ts-ignore
        map((res) => res.data.getrecommendedProduct as RecommendedProduct),
        catchError((err) => {
          console.log(err);
          return of(null);
        })
      );
  }

}