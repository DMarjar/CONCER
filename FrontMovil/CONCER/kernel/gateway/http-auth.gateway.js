import AxiosInstance from "../../config/axios";

export default {
  doPost(endPoint, payLoad) {
    return AxiosInstance.post(endPoint, payLoad);
  },
  doPut(endPoint, payLoad) {
    return AxiosInstance.put(endPoint, payLoad);
  },
  doGet(endPoint, payLoad) {
    return AxiosInstance.post(endPoint, payLoad);
  },
};
