import baseAxios, { axiosClient } from "./axiosClient";

const orderApi = (accessToken) => {
  return {
    getAll(params) {
      const url = "/orders";
      return axiosClient(accessToken).get(url, { params });
    },
    getNoUser(id) {
      const url = `/orders/${id}`;
      return baseAxios.get(url);
    },
    get(id) {
      const url = `/orders/${id}`;
      return axiosClient(accessToken).get(url);
    },
    getByUserId(id) {
      const url = `/orders/user/${id}`;
      return axiosClient(accessToken).get(url);
    },
    postNoUser(data) {
      const url = `/orders`;
      return baseAxios.post(url, data);
    },
    post(data) {
      const url = `/orders`;
      return axiosClient(accessToken).post(url, data);
    },
    delete(id) {
      const url = `/orders/${id}`;
      return axiosClient(accessToken).delete(url, id);
    },
  };
};

export default orderApi;
