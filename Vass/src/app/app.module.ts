import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductosComponent } from './productos/productos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PipetransformPipe } from './pipes/pipetransform.pipe';
import { SubproductosComponent } from './subproductos/subproductos.component';
import { NgSelectConfig, NgSelectModule } from '@ng-select/ng-select';
import { PersistenceModule } from 'angular-persistence';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductosComponent,
    PipetransformPipe,
    SubproductosComponent,
    BreadcrumbComponent,
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
    NgbTooltipModule,
    NgxPaginationModule
  ],
  exports: [NgSelectModule, NgbTooltipModule],
  providers: [CurrencyPipe],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private config: NgSelectConfig) {}
}
