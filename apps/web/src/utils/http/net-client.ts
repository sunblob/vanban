import { BACKEND_URL } from '../constants';
import axios, { AxiosError, type AxiosRequestConfig } from 'axios';

const AxiosInstance = axios.create({
  baseURL: BACKEND_URL,
});

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
