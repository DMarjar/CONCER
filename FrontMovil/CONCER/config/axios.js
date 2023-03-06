import axios from "axios";

//generar url base
const SERVER_URL = "http://localhost:8080/controlCertificaciones";

//crear instancia de axios
const AxiosInstance = axios.create({
	baseURL: SERVER_URL, //url base
	timeout: 3000, //si se demora mas de 3 segundos, se cancela la peticion
});

//exportar instancia
export default AxiosInstance;
