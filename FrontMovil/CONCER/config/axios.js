import axios from "axios";

//generar url base
<<<<<<< Updated upstream
const SERVER_URL = "http://192.168.100.129:8080/controlCertificaciones";
=======
const SERVER_URL = "http://192.168.61.117:8080/controlCertificaciones";
const headers = {

}
>>>>>>> Stashed changes

//crear instancia de axios
const AxiosInstance = axios.create({
	baseURL: SERVER_URL, //url base
	timeout: 3000, //si se demora mas de 3 segundos, se cancela la peticion
});

//exportar instancia
export default AxiosInstance;
