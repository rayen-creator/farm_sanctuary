import { recommendedProductService } from './../../../core/services/recommendedProduct.service';
import { Component, OnInit } from '@angular/core';
import { RecommendedProduct } from 'src/app/core/models/recommandedprod';

@Component({
  selector: 'app-recommend-product',
  templateUrl: './recommend-product.component.html',
  styleUrls: ['./recommend-product.component.css']
})
export class RecommendProductComponent implements OnInit {
  public recommendedproductsList: RecommendedProduct[];
  public visibleRecommendedProducts: RecommendedProduct[];
  public numberOfRecommendedProductsToShow = 9;
  searchText: any;
  constructor(private recommendedProductService: recommendedProductService) { }

  ngOnInit(): void {
    this.getAllRecommendedProducts();
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

  showMoreProducts() {
    this.numberOfRecommendedProductsToShow += 6;
    this.visibleRecommendedProducts = this.recommendedproductsList.slice(0, this.numberOfRecommendedProductsToShow);
  }

}
