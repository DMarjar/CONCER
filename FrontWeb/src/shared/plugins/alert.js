import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const Alert = withReactContent(Swal);
export const confirmMsg =
  'Le solicitamos esperar un momento a que la acción termine';
export const confirmTitle = '¿Estás seguro de realizar la acción?';
export const successMsg =
  'La actividad realizada, se ha terminado correctamente';
export const successTitle = 'Acción realizada exitosamente';
export const errorMsg = 'No se ha realizado la acción solicitada';
export const errorTitle = 'Error al realizar la acción';
export default Alert;
