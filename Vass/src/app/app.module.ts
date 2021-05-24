import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductosComponent } from './productos/productos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PipetransformPipe } from './pipes/pipetransform.pipe';
import { SubproductosComponent } from './subproductos/subproductos.component';
import { NgSelectConfig, NgSelectModule } from '@ng-select/ng-select';
import { PersistenceModule } from 'angular-persistence';

@NgModule({
  declarations: [
    AppComponent,
    ProductosComponent,
    PipetransformPipe,
    SubproductosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    PersistenceModule,
  ],
  exports: [NgSelectModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private config: NgSelectConfig) {}
}
