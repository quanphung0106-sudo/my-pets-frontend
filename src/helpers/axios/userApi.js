import baseAxios, { axiosClient } from './axiosClient';

const axiosRequest = axiosClient();

const userApi = {
  login(data) {
    const url = '/auth/login';
    return baseAxios.post(url, data);
  },
  register(data) {
    const url = '/auth/register';
    return axiosRequest.post(url, data);
  },
  getAll(params) {
    const url = '/users';
    return axiosRequest.get(url, { params });
  },
  get(id) {
    const url = `/users/${id}`;
    return axiosRequest.get(url);
  },
  post(data) {
    const url = `/users`;
    return axiosRequest.post(url, data);
  },
  delete(id) {
    const url = `/users/${id}`;
    return axiosRequest.delete(url, id);
  },
  logout() {
    const url = '/auth/logout';
    return baseAxios.post(url);
  },
  active(token) {
    const url = '/auth/token';
    return baseAxios.post(url, { token });
  },
};

export default userApi;
