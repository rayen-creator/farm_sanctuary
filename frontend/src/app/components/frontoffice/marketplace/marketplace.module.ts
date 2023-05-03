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
import {UiSwitchModule} from "ngx-toggle-switch";
import { CartComponent } from './cart/cart.component';
import { PayementComponent } from './payement/payement.component';
import {NgxPayPalModule} from "ngx-paypal";
import { SuccessComponent } from './success/success.component';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { OrdersListClientComponent } from './orders-list-client/orders-list-client.component';

@NgModule({
  declarations: [
    MarketplaceComponent,
    ProductsComponent,
    ProductFormComponent,
    UserProductsComponent,
    ProductDetailsComponent,
    CategoryProductsComponent,
    CartComponent,
    PayementComponent,
    SuccessComponent,
    OrdersListComponent,
    OrdersListClientComponent
  ],
    imports: [
        CommonModule,
        MarketplaceRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        Ng2SearchPipeModule,
        UiSwitchModule,
        NgxPayPalModule

    ]
})
export class MarketplaceModule { }
