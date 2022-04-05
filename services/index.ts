/* eslint-disable comma-dangle */
import useSWR from 'swr';
import axios, { AxiosRequestConfig } from 'axios';

export const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
export const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_URL || '';

export const postAPI = (
  url: string,
  formData: FormData,
  config?: AxiosRequestConfig<FormData> | undefined
) => axios.post(`${API_URL}${url}`, formData, config).then((res) => res.data);

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function useAPI(url: string) {
  return useSWR(`${API_URL}${url}`, fetcher);
}
