import AxiosClient from "./plugins/Axios.js";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  doPost: async (url, data) => {
    return await AxiosClient.post(url, data);
  },
  doGet: async (url, data) => {
    return await AxiosClient.get(url, data);
  },
  doPut: async (url, data) => {
    return await AxiosClient.put(url, data);
  },
  doDelete: async (url, data) => {
    return await AxiosClient.delete(url, data);
  },
};
