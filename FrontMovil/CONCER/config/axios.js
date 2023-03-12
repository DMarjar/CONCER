import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

//generar url base
const SERVER_URL = "http://192.168.100.129:8080/controlCertificaciones";
const headers = {

}

//crear instancia de axios
const AxiosInstance = axios.create({
baseURL: SERVER_URL, //url base
timeout: 3000, //si se demora mas de 3 segundos, se cancela la peticion
});

AxiosInstance.interceptors.request.use(async (config) => {
const token = await AsyncStorage.getItem("token");
if (token) {
config.headers.Authorization = `Bearer ${token}`;
}
return config;
});

//exportar instancia
export default AxiosInstance;



