import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { ProductLeftSidebarComponent } from './products/product-left-sidebar/product-left-sidebar.component';
import { HomeThreeComponent } from './home-three/home-three.component';



// Routes
const routes: Routes = [
  { path: 'one', component: HomeComponent },
  { path: 'products/:category', component: ProductLeftSidebarComponent },
  { path: 'product/:id', component: ProductDetailsComponent }


];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
