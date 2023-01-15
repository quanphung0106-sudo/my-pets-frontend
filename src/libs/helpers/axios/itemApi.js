import baseAxios, { axiosClient } from "./axiosClient";

const itemApi = (accessToken) => {
  return {
    getAll(params) {
      const url = "/items";
      return baseAxios.get(url, { params });
    },
    get(id) {
      const url = `/items/${id}`;
      return baseAxios.get(url);
    },
    post(data) {
      const url = `/items`;
      return axiosClient(accessToken).post(url, data);
    },
    update(id, data) {
      const url = `/items/${id}`;
      return axiosClient(accessToken).put(url, data);
    },
    delete(id) {
      const url = `/items/${id}`;
      return axiosClient(accessToken).delete(url, id);
    },
  };
};
export default itemApi;
