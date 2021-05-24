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
  save(data: any) {
    return this.htpp.post(`data.productos.json`, JSON.stringify(data));
  //   var requestoptions = new RequestOptions({
  //     method: RequestMethod.Post,
  //     url: this.apiURL + url,
  //     headers: headers,
  //     body: JSON.stringify(data)
  // })
  }
}
