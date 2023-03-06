import AxiosInstance from "../../../config/axios";

export default {
	doPostAuth(endPoint, payLoad) {
		return AxiosInstance.post(endPoint, payLoad);
	}
};