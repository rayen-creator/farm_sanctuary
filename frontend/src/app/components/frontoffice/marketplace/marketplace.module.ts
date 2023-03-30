import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketplaceRoutingModule } from './marketplace-routing.module';
import { MarketplaceComponent } from './marketplace.component';
import { ProductsComponent } from './products/products.component';
import { ProductFormComponent } from './product-form/product-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { UserProductsComponent } from './user-products/user-products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import {Ng2SearchPipeModule} from "ng2-search-filter";
import { CategoryProductsComponent } from './category-products/category-products.component';

@NgModule({
  declarations: [
    MarketplaceComponent,
    ProductsComponent,
    ProductFormComponent,
    UserProductsComponent,
    ProductDetailsComponent,
    CategoryProductsComponent
  ],
    imports: [
        CommonModule,
        MarketplaceRoutingModule,
        ReactiveFormsModule,
        FormsModule,
      Ng2SearchPipeModule

    ]
})
export class MarketplaceModule { }
