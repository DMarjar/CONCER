import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const Alert = withReactContent(Swal);

// CONFIRMAR ACCION /////////////////////////////////////////////////////////

// Titulo de la alerta de confirmacion
export const confirmTitle = '¿Estás seguro de realizar la acción?';

// Mensaje de confirmacion
export const confirmMsg = 'Espera un momento, esta acción no se puede deshacer';


// ACCION EXITOSA ///////////////////////////////////////////////////////////

// Titulo de la alerta de exito
export const successTitle = 'Acción realizada exitosamente';

// Mensaje de exito
export const successMsg = 'La acción se ha realizado correctamente';


// ACCION FALLIDA ///////////////////////////////////////////////////////////

// Titulo de la alerta de error
export const errorTitle = 'Error al realizar la acción';

// Mensaje de error
export const errorMsg = 'No se ha podido realizar la acción solicitada';


export default Alert;
