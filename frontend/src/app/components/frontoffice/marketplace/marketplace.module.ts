import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketplaceRoutingModule } from './marketplace-routing.module';
import { MarketplaceComponent } from './marketplace.component';
import { ProductsComponent } from './products/products.component';


@NgModule({
  declarations: [
    MarketplaceComponent,
    ProductsComponent
  ],
  imports: [
    CommonModule,
    MarketplaceRoutingModule,

  ]
})
export class MarketplaceModule { }
