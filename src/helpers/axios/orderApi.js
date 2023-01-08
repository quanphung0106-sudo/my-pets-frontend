import baseAxios, { axiosClient } from './axiosClient';

const axiosRequest = axiosClient()

const orderApi = {
  getAll(params) {
    const url = '/orders';
    return axiosRequest.get(url, { params });
  },
  getNoUser(id) {
    const url = `/orders/${id}`;
    return baseAxios.get(url);
  },
  get(id) {
    const url = `/orders/${id}`;
    return axiosRequest.get(url);
  },
  postNoUser(data) {
    const url = `/orders`;
    return baseAxios.post(url, data);
  },
  post(data) {
    const url = `/orders`;
    return axiosRequest.post(url, data);
  },
  delete(id) {
    const url = `/orders/${id}`;
    return axiosRequest.delete(url, id);
  },
};

export default orderApi;
