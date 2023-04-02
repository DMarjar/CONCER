import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const Alert = withReactContent(Swal);

export const confirmMsj =
  'Le solicitamos esperar un momento a que la solicitud termine';
export const confirmTitle = '¿Está seguro de realizar la acción?';
export const successMsj =
  'La actividad solicitada, se ha realizado correctamente';
export const successTitle = 'Acción realizada exitosamente';
export const errorMsj =
  'No se ha logrado realizar la actividad solicitada, por lo cual le pedimos intentar nuevamente, en caso contrario contactar a soporte técnico para solucionar el problema';
export const errorTitle = 'Error al realizar la acción';
export default Alert;
