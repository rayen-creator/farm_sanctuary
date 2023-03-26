import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketplaceRoutingModule } from './marketplace-routing.module';
import { MarketplaceComponent } from './marketplace.component';
import { ProductsComponent } from './products/products.component';
import { ProductFormComponent } from './product-form/product-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import { UserProductsComponent } from './user-products/user-products.component';


@NgModule({
  declarations: [
    MarketplaceComponent,
    ProductsComponent,
    ProductFormComponent,
    UserProductsComponent
  ],
  imports: [
    CommonModule,
    MarketplaceRoutingModule,
    ReactiveFormsModule,

  ]
})
export class MarketplaceModule { }
