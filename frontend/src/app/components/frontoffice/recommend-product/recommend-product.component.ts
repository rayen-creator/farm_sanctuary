import { recommendedProductService } from './../../../core/services/recommendedProduct.service';
import {AfterContentInit, Component} from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_PRODUCTS_QUERY_INPUTS, GET_PRODUCTS_QUERY_TYRES, GET_PRODUCTS_QUERY_WORKSHOP } from 'src/app/core/graphql/queries/graphql.queries.recommended';
import { RecommendedProduct } from 'src/app/core/models/recommandedprod';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-recommend-product',
  templateUrl: './recommend-product.component.html',
  styleUrls: ['./recommend-product.component.css']
})
export class RecommendProductComponent implements AfterContentInit {
  public recommendedproductsList: RecommendedProduct[];
  public visibleRecommendedProducts: RecommendedProduct[];
  public numberOfRecommendedProductsToShow = 9;
  searchText: any;
  products:any[];
  productstyres: any[];
  productsworkhop: any[];
  productsinputs: any[];
  destroy$: Subject<void> = new Subject();



  constructor(private recommendedProductService: recommendedProductService,private apollo : Apollo) {
    
   }

  ngAfterContentInit(): void {
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
    this.getAllRecommendedProducts();
    this.setupSorting();
}





   
  
  getAllRecommendedProducts(){
    this.recommendedProductService.getRecommendedProducts().subscribe({
      next: (products) => {
        this.recommendedproductsList = products;
        console.log(this.recommendedproductsList);
        this.visibleRecommendedProducts = this.recommendedproductsList.slice(0, this.numberOfRecommendedProductsToShow);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }


  setupSorting() {
    const selectElement = document.getElementById('sortRecommendedProducts') as HTMLSelectElement;
    console.log(selectElement)
    selectElement.addEventListener('change', () => {
      const sortCriteria = selectElement.value;
      if (sortCriteria === 'priceAsc') {
        const sortedProducts = [...this.recommendedproductsList];
        sortedProducts.sort((a, b) => Number(a.price) - Number(b.price));
        this.recommendedproductsList = sortedProducts;
      } else if (sortCriteria === 'priceDesc') {
        const sortedProducts = [...this.recommendedproductsList];
        sortedProducts.sort((a, b) => Number(b.price) - Number(a.price));
        this.recommendedproductsList = sortedProducts;
      }else {
        // sort by any other criteria
      }
      this.visibleRecommendedProducts = this.recommendedproductsList.slice(0, this.numberOfRecommendedProductsToShow);
    });
  }
  
  

  showMoreProducts() {
    this.numberOfRecommendedProductsToShow += 6;
    this.visibleRecommendedProducts = this.recommendedproductsList.slice(0, this.numberOfRecommendedProductsToShow);
  }

}
