import axios from 'axios';
import { API_URL } from '.';
import { TTransaction } from './players';

const route = 'players';

export class ServerErrorResponse {
  constructor(error: any) {
    this.message = `[${error.status}] ${error.statusText}: ${error.data?.error}`;
    this.status = error.status;
    this.statusText = error.statusText;
  }

  status = 0;

  statusText = '';

  message = '';
}

export default async function getTransactionDetail(
  id: any,
  token: string
): Promise<TTransaction> {
  try {
    if (!id) throw new Error('Transaction ID is missing');

    const response = await axios.get(
      `${API_URL}/${route}/history/${id}/detail`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new ServerErrorResponse(error?.response);
  }
}
