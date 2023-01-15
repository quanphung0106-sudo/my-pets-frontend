import axios from "axios";
import jwt_decode from "jwt-decode";
import storage from "../localStorage";

const baseAxios = axios.create({
  baseURL: process.env.REACT_APP_SERVER,
  withCredentials: true,
});

export const axiosClient = (token) => {
  const axiosJWT = axios.create({
    baseURL: process.env.REACT_APP_SERVER,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer " + token,
    },
  });

  // axiosJWT.interceptors.response.use(
  //   (response) => {
  //     console.log(response);
  //     if ([200, 201].includes(response.status) && response.data) {
  //       return response;
  //     }
  //     Promise.reject(response.statusText || "");
  //   },
  //   (error) => {
  //     console.error({ error });
  //     if (error.response.status === 401 || error.response.status === 403) {
  //       // storage.removeAccessToken()
  //       // storage.removeRefreshToken()
  //       // backToLogin();
  //       // window.location.href = '/login'
  //     }
  //     return Promise.reject(error);
  //   }
  // );

  const refreshToken = async () => {
    const refreshToken = storage.getRefreshToken();
    console.log(refreshToken);
    try {
      if (refreshToken) {
        const response = await axios.post(
          `${process.env.REACT_APP_SERVER}/auth/refresh-token`,
          { refreshToken: refreshToken },
          {
            withCredentials: true,
          }
        );
        if (response) return response.data;
      }
    } catch (err) {
      window.location.pathname = "/signin";
      console.log("Client: Error refresh token: ", err);
    }
  };

  axiosJWT.interceptors.request.use(
    async (config) => {
      let currentDate = new Date();
      const decodeToken = jwt_decode(token);
      if (decodeToken.exp < currentDate.getTime() / 1000) {
        const data = await refreshToken();
        if (data?.newAccessToken && data) {
          storage.setAccessToken(data.newAccessToken);
          storage.setRefreshToken(data.newRefreshToken);
          axiosJWT.defaults.headers["Authorization"] =
            "Bearer " + data.newAccessToken;
          config.headers["Authorization"] = "Bearer " + data?.newAccessToken;
        }
      }
      return config;
    },
    (error) => {
      console.log({ requestErr: error });
      return Promise.reject(error);
    }
  );

  return axiosJWT;
};

export default baseAxios;
