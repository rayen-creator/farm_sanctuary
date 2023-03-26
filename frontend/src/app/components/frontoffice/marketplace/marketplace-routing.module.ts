import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductsComponent} from "./products/products.component";
import {ProductFormComponent} from "./product-form/product-form.component";
import {UserProductsComponent} from "./user-products/user-products.component";
import {UserProfileComponent} from "../users/user-profile/user-profile.component";
import {ProductDetailsComponent} from "./product-details/product-details.component";

const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'addProduct', component: ProductFormComponent },
  { path: 'myProducts', component: UserProductsComponent },
  { path: 'product/:id', component: ProductDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarketplaceRoutingModule { }
