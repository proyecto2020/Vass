import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import * as data from 'src/data.productos.json';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  constructor(private htpp: HttpClient) {}

  /**
   * obtiene información de los productos.
   *
   * @return {*} 
   * @memberof GeneralService
   */
  getInformation() {
    return of((data as any).default);
  }
}
