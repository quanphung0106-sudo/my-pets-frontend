import baseAxios, { axiosClient } from "./axiosClient";

const userApi = (accessToken) => {
  return {
    login(data) {
      const url = "/auth/login";
      return baseAxios.post(url, data);
    },
    register(data) {
      const url = "/auth/register";
      return baseAxios.post(url, data);
    },
    getAll(params) {
      const url = "/users";
      return axiosClient(accessToken).get(url, { params });
    },
    get(id) {
      const url = `/users/${id}`;
      return axiosClient(accessToken).get(url);
    },
    post(data) {
      const url = `/users`;
      return axiosClient(accessToken).post(url, data);
    },
    delete(id) {
      const url = `/users/${id}`;
      return axiosClient(accessToken).delete(url, id);
    },
    logout() {
      const url = "/auth/logout";
      return baseAxios.post(url);
    },
    active(token) {
      const url = "/auth/token";
      return baseAxios.post(url, { token });
    },
  };
};
export default userApi;
