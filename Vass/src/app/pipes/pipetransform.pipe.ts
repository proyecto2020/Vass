import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipetransform',
})
export class PipetransformPipe implements PipeTransform {
  /**
   * Filtar la informacion por tipeo por nombre o tipo de tecnologia,
   *
   * @param {Array<any>} value
   * @param {*} arg
   * @return {*}
   * @memberof FilterPipe
   */
  transform(value: Array<any>, arg: any) {
    if (arg === '' || arg.length < 3) return value;
    const resultadoFilter = [];
    for (const item of value) {
      if (
        item.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
        item.categoria.toLowerCase().indexOf(arg.toLowerCase()) > -1
      ) {
        resultadoFilter.push(item);
      }
    }
    return resultadoFilter;
  }
}
