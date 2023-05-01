import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductsComponent} from "./products/products.component";
import {ProductFormComponent} from "./product-form/product-form.component";
import {UserProductsComponent} from "./user-products/user-products.component";
import {ProductDetailsComponent} from "./product-details/product-details.component";
import {CategoryProductsComponent} from "./category-products/category-products.component";
import {CartComponent} from "./cart/cart.component";
import {PayementComponent} from "./payement/payement.component";
import {SuccessComponent} from "./success/success.component";
import {OrdersListComponent} from "./orders-list/orders-list.component";
import {OrdersListClientComponent} from "./orders-list-client/orders-list-client.component";

const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'products/:category', component: CategoryProductsComponent },
  { path: 'addProduct', component: ProductFormComponent },
  { path: 'myProducts', component: UserProductsComponent },
  { path: 'product/:id', component: ProductDetailsComponent},
  { path: 'product/:id/edit', component: ProductFormComponent},
  { path: 'cart', component: CartComponent},
  { path: 'payment', component: PayementComponent},
  { path: 'success', component: SuccessComponent},
  { path: 'orders', component: OrdersListComponent},
  { path: 'myOrders', component: OrdersListClientComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarketplaceRoutingModule { }
