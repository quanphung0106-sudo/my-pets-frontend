import baseAxios, { axiosClient } from './axiosClient';

const axiosRequest = axiosClient();

const itemApi = {
  getAll(params) {
    const url = '/items';
    return baseAxios.get(url, { params });
  },
  get(id) {
    const url = `/items/${id}`;
    return baseAxios.get(url);
  },
  post(data) {
    const url = `/items`;
    return axiosRequest.post(url, data);
  },
  update(id, data) {
    const url = `/items/${id}`;
    return axiosRequest.put(url, data);
  },
  delete(id) {
    const url = `/items/${id}`;
    return axiosRequest.delete(url, id);
  },
};

export default itemApi;
