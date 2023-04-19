import {AfterContentInit, Component} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecommendedProduct } from 'src/app/core/models/recommandedprod';
import { recommendedProductService } from 'src/app/core/services/recommendedProduct.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-category-recommended-products',
  templateUrl: './category-recommended-products.component.html',
  styleUrls: ['./category-recommended-products.component.css']
})
export class CategoryRecommendedProductsComponent implements AfterContentInit {
  public categoryRecommendedProductsList: RecommendedProduct[];
  public visibleRecommendedProducts: RecommendedProduct[];
  public numberOfRecommendedProductsToShow = 9;

  searchText: any;
  category: any;

  constructor(private recommendedproductService: recommendedProductService,private currentRoute: ActivatedRoute,private router : Router) { }

  ngAfterContentInit(): void {
    this.category = this.currentRoute.snapshot.params['category'];
    this.getAllCategoryProducts();
    this.setupSorting();
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
  setupSorting() {
    const selectElement = document.getElementById('sortCategoryRecommendedProducts') as HTMLSelectElement;
    console.log(selectElement)
    selectElement.addEventListener('change', () => {
      const sortCriteria = selectElement.value;
      if (sortCriteria === 'priceAsc') {
        const sortedProducts = [...this.categoryRecommendedProductsList];
        sortedProducts.sort((a, b) => Number(a.price) - Number(b.price));
        this.categoryRecommendedProductsList = sortedProducts;
      } else if (sortCriteria === 'priceDesc') {
        const sortedProducts = [...this.categoryRecommendedProductsList];
        sortedProducts.sort((a, b) => Number(b.price) - Number(a.price));
        this.categoryRecommendedProductsList = sortedProducts;
      }else {
        // sort by any other criteria
      }
      this.visibleRecommendedProducts = this.categoryRecommendedProductsList.slice(0, this.numberOfRecommendedProductsToShow);
    });
  }

  showMoreProducts() {
    this.numberOfRecommendedProductsToShow += 6;
    this.visibleRecommendedProducts = this.categoryRecommendedProductsList.slice(0, this.numberOfRecommendedProductsToShow);
  }
  refreshPage(category: string): void {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate(['recommendedproducts', category]);
    });
  }




  

}
