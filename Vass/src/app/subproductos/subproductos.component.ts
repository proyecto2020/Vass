import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { GeneralService } from '../services/general.service';
import { PersistenceInfoService } from '../utilities/persistence/persistence-info.service';
import { SubProductsObject } from './entities/subproducts.object';
import { Router } from '@angular/router';
import { GenericMessage } from '../core/genericmessage';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-subproductos',
  templateUrl: './subproductos.component.html',
  styleUrls: ['./subproductos.component.scss'],
})
export class SubproductosComponent implements OnInit {
  subproductForm: FormGroup;
  listPructos: Array<any>;
  listSubProcutos: Array<any>;
  filterSubProducts: string = '';
  listFormaPago: Array<any>;
  isComprar: Boolean;
  genericMessage: GenericMessage;
  submit: boolean;
  paginas: number;
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly generalService: GeneralService,
    private readonly persistence: PersistenceInfoService,
    private readonly router: Router,
    private currencyPipe: CurrencyPipe
  ) {
    this.isComprar = false;
    this.genericMessage = new GenericMessage();
    this.submit = false;
    this.paginas = 1;
  }

  ngOnInit(): void {
    this.iniciarFormulario();
    this.obtenerListaProductos();
  }

  /**
   * Renderiza el precio a formato moneda.
   *
   * @param {*} element
   * @memberof SubproductosComponent
   */
  transformAmount(element) {
    let valueFormated = this.currencyPipe.transform(
      this.subproductForm.controls.precio.value,
      '$'
    );
    element.target.value = valueFormated;
  }
  /**
   * Primera instacia del formulario reactivo
   *
   * @memberof SubproductosComponent
   */
  iniciarFormulario() {
    this.subproductForm = this.formBuilder.group({
      categoria: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      precio: ['', [Validators.required, Validators.pattern('^([0-9]*)')]],
      descripcion: ['', Validators.required],
      nombreApellido: [''],
      cantidad: [''],
      numeroTrg: [''],
      codigo: [''],
      formaPago: [''],
    });
    this.obtenerSubProductos();
  }
  get genericControl() {
    return this.subproductForm.controls;
  }

  /**
   * Obtiene información de JSON.
   *
   * @memberof SubproductosComponent
   */
  obtenerListaProductos() {
    this.generalService.getInformation().subscribe((rs: any) => {
      this.listPructos = rs.Productos;
      this.listFormaPago = rs.FormaPago;
    });
  }

  /**
   * Valida que tenga subProductos,
   *
   * @return {*}
   * @memberof SubproductosComponent
   */
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

  /**
   * Guarda la información local.
   *
   * @memberof SubproductosComponent
   */
  guardarInformacionLocal() {
    if (this.subproductForm.invalid) {
      this.submit = true;
    } else {
      const listaElementosCreados = this.obtenerSubProductos();
      const items = new SubProductsObject();
      items.categoria = this.subproductForm.controls.categoria.value;
      items.nombre = this.subproductForm.controls.nombre.value;
      items.precio = this.subproductForm.controls.precio.value;
      items.descripcion = this.subproductForm.controls.descripcion.value;
      items.vendido = 'No';
      if (listaElementosCreados.indexOf(items.nombre) < 0) {
        listaElementosCreados.push(items);
        this.persistence.setInfo(
          'subProductos',
          JSON.stringify(listaElementosCreados)
        );
        this.limpiar();
      }
    }
  }

  /**
   * Borra el registro.
   *
   * @param {*} item
   * @memberof SubproductosComponent
   */
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

  /**
   * pagina anterior.
   *
   * @memberof SubproductosComponent
   */
  navegarProductos() {
    this.router.navigate(['/products']);
  }

  /**
   * Valida que si se pueda comprar el producto.
   *
   * @param {*} item
   * @memberof SubproductosComponent
   */
  comprar(item) {
    if (item.vendido === 'Si') {
      this.genericMessage.showMessage(
        'info',
        'El registro seleccionado ya fue vendido',
        3000
      );
    } else {
      this.isComprar = true;
      this.submit = false;
      this.subproductForm.patchValue({
        categoria: item.categoria,
        nombre: item.nombre,
        precio: item.precio,
        descripcion: item.descripcion,
      });
      this.subproductForm.controls.categoria.disable();
      this.subproductForm.controls.nombre.disable();
      this.subproductForm.controls.precio.disable();
      this.nuevaInstanciaFormulario();
    }
  }

  /**
   * Realiza nueva instancia del formulario cuando selecciona el boton comprar.
   *
   * @memberof SubproductosComponent
   */
  nuevaInstanciaFormulario() {
    const nombreApellido = this.subproductForm.get('nombreApellido');
    nombreApellido.setValidators([Validators.required]);
    nombreApellido.updateValueAndValidity();
    const cantidad = this.subproductForm.get('cantidad');
    cantidad.setValidators([
      Validators.required,
      Validators.pattern('^([0-9]*)'),
    ]);
    cantidad.updateValueAndValidity();
    const numeroTrg = this.subproductForm.get('numeroTrg');
    numeroTrg.setValidators([
      Validators.required,
      Validators.pattern('^([0-9]*)'),
      Validators.maxLength(16),
      Validators.minLength(16),
    ]),
      numeroTrg.updateValueAndValidity();
    const codigo = this.subproductForm.get('codigo');
    codigo.setValidators([
      Validators.required,
      Validators.pattern('^([0-9]*)'),
      Validators.maxLength(3),
      Validators.minLength(3),
    ]),
      codigo.updateValueAndValidity();
    const formaPago = this.subproductForm.get('formaPago');
    formaPago.setValidators([Validators.required]);
    formaPago.updateValueAndValidity();
  }

  /**
   * Simula que compra el prioducto y cambia su estado.
   *
   * @memberof SubproductosComponent
   */
  comprarProducto() {
    if (this.subproductForm.invalid) {
      this.submit = true;
    } else {
      const listaElementosCreados = this.obtenerSubProductos();
      const items = listaElementosCreados.filter((x) => {
        const existe = x.nombre === this.subproductForm.controls.nombre.value;
        if (existe) {
          x.vendido = 'Si';
          x.categoria = this.subproductForm.controls.categoria.value;
          x.nombre = this.subproductForm.controls.nombre.value;
          x.precio = this.subproductForm.controls.precio.value;
          x.descripcion = this.subproductForm.controls.descripcion.value;
          x.nombreApellido = this.subproductForm.controls.nombreApellido.value;
          x.cantidad = this.subproductForm.controls.cantidad.value;
          x.numeroTrg = this.subproductForm.controls.numeroTrg.value;
          x.codigo = this.subproductForm.controls.codigo.value;
          x.formaPago = this.subproductForm.controls.formaPago.value;
          x.descripcion = this.subproductForm.controls.descripcion.value;
          this.persistence.setInfo(
            'subProductos',
            JSON.stringify(listaElementosCreados)
          );
          this.limpiar();
          return existe;
        }
      });
    }
  }

  /**
   * Limpia el formulario.
   *
   * @memberof SubproductosComponent
   */
  limpiar() {
    this.isComprar = false;
    this.submit = false;
    this.subproductForm.controls.categoria.enable();
    this.subproductForm.controls.nombre.enable();
    this.subproductForm.controls.precio.enable();
    this.ngOnInit();
  }
}
