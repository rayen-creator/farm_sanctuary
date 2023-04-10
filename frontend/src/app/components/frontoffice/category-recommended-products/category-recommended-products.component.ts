import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecommendedProduct } from 'src/app/core/models/recommandedprod';
import { recommendedProductService } from 'src/app/core/services/recommendedProduct.service';

@Component({
  selector: 'app-category-recommended-products',
  templateUrl: './category-recommended-products.component.html',
  styleUrls: ['./category-recommended-products.component.css']
})
export class CategoryRecommendedProductsComponent implements OnInit {
  public categoryRecommendedProductsList: RecommendedProduct[];
  public visibleRecommendedProducts: RecommendedProduct[];
  public numberOfRecommendedProductsToShow = 9;

  searchText: any;
  category: any;

  constructor(private recommendedproductService: recommendedProductService,private currentRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.category = this.currentRoute.snapshot.params['category'];
    this.getAllCategoryProducts();
  }
  getAllCategoryProducts() {
    this.recommendedproductService.getRecommendedProductsByCategory(this.category).subscribe({
      next: (products) => {
        this.categoryRecommendedProductsList = products;
        console.log(this.categoryRecommendedProductsList);
      
        this.visibleRecommendedProducts = this.categoryRecommendedProductsList.slice(0, this.numberOfRecommendedProductsToShow);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }




  

}
