import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductsComponent} from "./products/products.component";
import {ProductFormComponent} from "./product-form/product-form.component";

const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'addProduct', component: ProductFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarketplaceRoutingModule { }
