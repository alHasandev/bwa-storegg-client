/* eslint-disable indent */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable comma-dangle */
import useSWR from 'swr';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { RequestError, RequestSuccess } from './type';

export type Payload = FormData | Record<string, unknown>;

export const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
export const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_URL || '';
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

export class UserError {
  status = 0;

  message = '';

  data: unknown = null;

  constructor(status: number, message: string, data?: unknown) {
    this.status = status;
    this.message = message;
    this.data = data;
  }
}

export const postAPI = <T>(
  url: string,
  formData: Payload,
  config?: AxiosRequestConfig<FormData> | undefined
) =>
  axios
    .post(`${API_URL}${url}`, formData, config)
    .then((res: AxiosResponse<T>) => res.data)
    .catch((error: { response: RequestError }) => {
      const { status, message, data } = error.response;
      throw new UserError(status, data?.message || message, data);
    });

export const patchAPI = <T>(
  url: string,
  formData: Payload,
  config?: AxiosRequestConfig<FormData> | undefined
) =>
  axios
    .patch(`${API_URL}${url}`, formData, config)
    .then((res: AxiosResponse<T>) => res.data)
    .catch((error: { response: RequestError }) => {
      const { status, message, data } = error.response;
      throw new UserError(status, message || data.message, data);
    });

export const getAPI = <T>(url: string, config?: AxiosRequestConfig) =>
  axios
    .get(`${API_URL}${url}`, config)
    .then((res: AxiosResponse<T>) => res.data);

export default function useAPI<T>(
  url: string | null,
  config?: AxiosRequestConfig
) {
  if (!url) return useSWR<T, unknown>(null);
  return useSWR<T, RequestError>([url, config], getAPI);
}
