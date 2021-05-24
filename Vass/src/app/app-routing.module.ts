import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductosComponent } from './productos/productos.component';
import { SubproductosComponent } from './subproductos/subproductos.component';

const routes: Routes = [
  {
    path: 'products',
    component: ProductosComponent,
    canActivate: [],
  },
  {
    path: 'subproducts',
    component: SubproductosComponent,
    canActivate: [],
  },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
