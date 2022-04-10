/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable comma-dangle */
import useSWR from 'swr';
import axios, { AxiosRequestConfig } from 'axios';
import { RequestError } from './type';

export const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
export const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_URL || '';

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
      console.log('error', error);
      throw new UserError(status, data?.message || message, data);
    });

const fetcher = (url: string, config?: AxiosRequestConfig) =>
  axios.get(url, config).then((res) => res.data);

export default function useAPI(
  url: string | null,
  config?: AxiosRequestConfig
) {
  if (!url) return useSWR(null);
  return useSWR(`${API_URL}${url}`, (_url) => fetcher(_url, config));
}
