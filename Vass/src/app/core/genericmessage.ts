import Swal from 'sweetalert2';

export class GenericMessage {

  /**
   * Renderiza el mensaje segun su tipo.
   *
   * @param {string} icon
   * @param {*} mensaje
   * @param {number} [timer]
   * @param {string} [titulo]
   * @memberof GenericMessage
   */
  public showMessage(icon: string, mensaje, timer?: number, titulo?: string) {
    Swal.fire({
      icon: `${icon}` as any,
      text: mensaje,
      title: titulo === undefined ? '' : titulo,
      showConfirmButton: false,
      timer: timer,
    });
  }
}
