import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import store from 'src/store';
import { logout } from 'src/store/user.slice';

export const axiosClient = axios.create({
  baseURL: 'http://localhost:4000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosClient.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    const token = localStorage.getItem('token');

    if (!config.headers) {
      return config;
    }
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  async (error: any) => {
    return await Promise.reject(error);
  }
);
axiosClient.interceptors.response.use(
  async (response: AxiosResponse) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  async (error: any) => {
    if (error.response && error.response.status === 403) {
      store.dispatch(logout());
      window.location.href = '/';
    }
    console.log(error);
    return error.response;
  }
);

export default axiosClient;
