import useSWR from 'swr';
import axios from 'axios';

export const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_URL;

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function useAPI(url: string) {
  return useSWR(`${API_URL}/api/v1/${url}`, fetcher);
}
