import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from '../services/general.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
})
export class ProductosComponent implements OnInit {
  listPructos: Array<any>;
  filterProducts: string = '';
  constructor(
    private readonly generalService: GeneralService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.obtenerListaProductos();
  }
  obtenerListaProductos() {
    this.generalService.getInformation().subscribe((rs: any) => {
      this.listPructos = rs.Productos;
    });
  }
  /**
   * Ordenar Asc
   *
   * @memberof ListsComponent
   */
  ordenarAscendente() {
    this.listPructos.sort((itemOne, itemTwo) =>
      itemOne.nombre.localeCompare(itemTwo.nombre)
    );
  }

  /**
   * Ordenas Desc
   *
   * @memberof ListsComponent
   */
  ordenarDescendente() {
    this.listPructos.sort((temOne, itemTwo) =>
      itemTwo.nombre.localeCompare(temOne.nombre)
    );
  }
  navegarSubProductos(item) {
    this.router.navigate(['/subproducts'], item);
  }
}
