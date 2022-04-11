/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable comma-dangle */
import useSWR from 'swr';
import axios, { AxiosRequestConfig } from 'axios';
import { RequestError } from './type';

export const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
export const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_URL || '';
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

export class UserError {
  status = 0;

  message = '';

  data = null;

  constructor(status: number, message: string, data?: any) {
    this.status = status;
    this.message = message;
    this.data = data;
  }
}

export const postAPI = (
  url: string,
  formData: FormData | any,
  config?: AxiosRequestConfig<FormData> | undefined
) =>
  axios
    .post(`${API_URL}${url}`, formData, config)
    .then((res) => res.data)
    .catch((error): RequestError => {
      const {
        response: { status, message, data },
      } = error;
      throw new UserError(status, data?.message || message, data);
    });

export const patchAPI = (
  url: string,
  formData: FormData | any,
  config?: AxiosRequestConfig<FormData> | undefined
) =>
  axios
    .patch(`${API_URL}${url}`, formData, config)
    .then((res) => res.data)
    .catch((error): RequestError => {
      const {
        response: { status, message, data },
      } = error;
      throw new UserError(status, data?.message || message, data);
    });

export const getAPI = (url: string, config?: AxiosRequestConfig) =>
  axios.get(`${API_URL}${url}`, config).then((res) => res.data);

export default function useAPI(
  url: string | null,
  config?: AxiosRequestConfig
) {
  if (!url) return useSWR(null);
  return useSWR([url, config], (_url, _config) => getAPI(_url, _config));
}
