import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProductComponent } from './create-product/create-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ProductListComponent } from './product-list/product-list.component';

const routes: Routes = [
  {path:'create-product',component:CreateProductComponent},
  {path:'edit-product/:id',component:EditProductComponent},
  {path:'product-list',component:ProductListComponent},
  {path:'',redirectTo:'create-product', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
