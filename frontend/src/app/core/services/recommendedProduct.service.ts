import { Apollo} from 'apollo-angular';
import { Injectable } from '@angular/core';

import { RecommendedProductsByCategory, recommendedproducts } from '../graphql/queries/graphql.queries.recommended';
import { RecommendedProduct } from '../models/recommandedprod';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
  })
  
export class recommendedProductService {

    constructor(private apollo : Apollo){}


    getRecommendedProducts(): Observable<RecommendedProduct[]> {
      return this.apollo
        .watchQuery({
          query: recommendedproducts,
        })
        .valueChanges.pipe(
          map((res: any) => res.data.getRecommendedProducts as RecommendedProduct[]),
          catchError((err) => {
            console.log(err);
            return of([]);
          })
        );
    }

    getRecommendedProductsByCategory(category: string): Observable<RecommendedProduct[]> {
      return this.apollo.watchQuery({
        query: RecommendedProductsByCategory,
        variables: { category }
      }).valueChanges.pipe(
        map((res: any) => res.data.getRecommendedProductsByCategory as RecommendedProduct[]),
        catchError((err) => {
          console.log(err);
          return of([]);
        })
      );
    }
    
  
    
    
    



}