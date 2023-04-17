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
    const selectElement = document.getElementById('sortProducts') as HTMLSelectElement;
    if (selectElement) {
      selectElement.addEventListener('change', () => {
        const sortCriteria = selectElement.value;
        if (sortCriteria === 'priceAsc') {
          this.recommendedproductsList.sort((a, b) => Number(a.price) - Number(b.price));
        } else if (sortCriteria === 'priceDesc') {
          this.recommendedproductsList.sort((a, b) => Number(b.price) - Number(a.price));
        } else {
          // sort by any other criteria
        }
      });
    }
  }
  

  showMoreProducts() {
    this.numberOfRecommendedProductsToShow += 6;
    this.visibleRecommendedProducts = this.recommendedproductsList.slice(0, this.numberOfRecommendedProductsToShow);
  }

}
