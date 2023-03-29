import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketplaceRoutingModule } from './marketplace-routing.module';
import { MarketplaceComponent } from './marketplace.component';
import { ProductsComponent } from './products/products.component';
import { ProductFormComponent } from './product-form/product-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import { UserProductsComponent } from './user-products/user-products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';


@NgModule({
  declarations: [
    MarketplaceComponent,
    ProductsComponent,
    ProductFormComponent,
    UserProductsComponent,
    ProductDetailsComponent
  ],
  imports: [
    CommonModule,
    MarketplaceRoutingModule,
    ReactiveFormsModule,

  ]
})
export class MarketplaceModule { }
