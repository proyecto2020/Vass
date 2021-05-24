import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersistenceService } from 'angular-persistence';
import { GeneralService } from '../services/general.service';
import { PersistenceInfoService } from '../utilities/persistence/persistence-info.service';
import { SubProductsObject } from './entities/subproducts.object';

@Component({
  selector: 'app-subproductos',
  templateUrl: './subproductos.component.html',
  styleUrls: ['./subproductos.component.scss'],
})
export class SubproductosComponent implements OnInit {
  subproductForm: FormGroup;
  listPructos: Array<any>;
  listSubProcutos: Array<any>;
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly generalService: GeneralService,
    private readonly persistence: PersistenceInfoService
  ) {}

  ngOnInit(): void {
    this.iniciarFormulario();
    this.obtenerListaProductos();
  }
  iniciarFormulario() {
    this.subproductForm = this.formBuilder.group({
      categoria: ['', Validators.required],
      nombre: ['', Validators.required],
      precio: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
    this.obtenerSubProductos();
  }
  obtenerListaProductos() {
    this.generalService.getInformation().subscribe((rs: any) => {
      this.listPructos = rs.Productos;
    });
  }
  obtenerSubProductos() {
    let subProductos = this.persistence.getInfo('subProductos') as any;
    if (
      subProductos === null ||
      subProductos === '' ||
      subProductos === undefined
    ) {
      subProductos = '[]';
    }
    this.listSubProcutos = JSON.parse(subProductos);
    return this.listSubProcutos;
  }
  saveLocalInformation() {
    const listaElementosCreados = this.obtenerSubProductos();
    const items = new SubProductsObject();
    items.categoria = this.subproductForm.controls.categoria.value;
    items.nombre = this.subproductForm.controls.nombre.value;
    items.precio = this.subproductForm.controls.precio.value;
    items.descripcion = this.subproductForm.controls.descripcion.value;
    if (listaElementosCreados.indexOf(items.nombre) < 0) {
      listaElementosCreados.push(items);
      this.persistence.setInfo(
        'subProductos',
        JSON.stringify(listaElementosCreados)
      );
    }
  }
  borrar(item) {
    const existe = this.listSubProcutos.find((x) => x.nombre === item.nombre);
    if (existe) {
      this.listSubProcutos.splice(item, 1);
      this.persistence.setInfo(
        'subProductos',
        JSON.stringify(this.listSubProcutos)
      );
      this.obtenerSubProductos();
    }
  }
  comprar(item) {}
}
