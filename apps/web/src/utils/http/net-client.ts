import axios, { AxiosError, type AxiosRequestConfig } from 'axios';
import { BACKEND_URL } from '../constants';

const AxiosInstance = axios.create({
  baseURL: BACKEND_URL,
});

AxiosInstance.interceptors.request.use(
  (config) => {
    config.headers['Authorization'] = localStorage.getItem('token');

    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

AxiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error instanceof AxiosError) {
      if (error.response?.data.reason === 'TOKEN_EXPIRED') {
        const res = await AxiosInstance.post('/api/auth/refresh-token', {
          refreshToken: localStorage.getItem('refreshToken'),
        });

        localStorage.setItem('token', res.data.token);
        localStorage.setItem('refreshToken', res.data.refreshToken);

        return AxiosInstance.request(originalRequest);
      }
    }

    return Promise.reject(error);
  },
);

export class NetClient {
  static async request<T>(config: AxiosRequestConfig) {
    try {
      const { data } = await AxiosInstance.request<T>(config);

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data?.error || error.message);
      }
    }
  }

  static async get<T>(url: string, config?: AxiosRequestConfig) {
    return AxiosInstance.get<T>(url, { ...config });
  }

  static async post<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    return AxiosInstance.post<T>(url, data, { ...config });
  }

  static async patch<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    return AxiosInstance.patch<T>(url, data, { ...config });
  }

  static async delete<T>(url: string, config?: AxiosRequestConfig) {
    return AxiosInstance.delete<T>(url, { ...config });
  }
}
