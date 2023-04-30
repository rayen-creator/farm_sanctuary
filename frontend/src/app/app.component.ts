import { AuthService } from 'src/app/core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { recommendedProductService } from './core/services/recommendedProduct.service';
import { GET_PRODUCTS_QUERY_INPUTS, GET_PRODUCTS_QUERY_TYRES, GET_PRODUCTS_QUERY_WORKSHOP } from './core/graphql/queries/graphql.queries.recommended';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  productstyres: any[];
  productsworkhop: any[];
  productsinputs: any[];

  constructor(private auth: AuthService, private apollo : Apollo , private recommendedProductService: recommendedProductService) {

  }
  ngOnInit(): void {
    this.auth.autoAuthUser();
    this.apollo
    .query({ query: GET_PRODUCTS_QUERY_TYRES })
    .subscribe((result: any) => {
      this.productstyres = result.data.productstyres;
    });
    this.apollo
    .query({ query: GET_PRODUCTS_QUERY_WORKSHOP })
    .subscribe((result: any) => {
      this.productsworkhop = result.data.productsworkhop;
    });
    this.apollo
    .query({ query: GET_PRODUCTS_QUERY_INPUTS })
    .subscribe((result: any) => {
      this.productsinputs = result.data.productsinputs;
    });
  }


}
