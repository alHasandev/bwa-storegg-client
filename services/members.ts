/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { API_URL, Payload } from '.';
import { TTransaction } from './players';

const route = 'players';

type SuccessResponse = {
  status: number;
  statusText: string;
  data: { data: Payload };
};

type ErrorResponse = {
  status: number;
  statusText: string;
  data: {
    error: string;
  };
};

export class ServerErrorResponse {
  constructor(error: ErrorResponse) {
    this.message = `[${error.status}] ${error.statusText}: ${error.data?.error}`;
    this.status = error.status;
    this.statusText = error.statusText;
  }

  status = 0;

  statusText = '';

  message = '';
}

export default async function getTransactionDetail(
  id: string | null,
  token: string
): Promise<TTransaction> {
  try {
    if (!id) throw new Error('Transaction ID is missing');

    const { data } = await axios.get<TTransaction>(
      `${API_URL}/${route}/history/${id}/detail`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
}
