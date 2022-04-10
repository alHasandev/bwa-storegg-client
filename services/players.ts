/* eslint-disable implicit-arrow-linebreak */
import useAPI, { postAPI } from '.';

const route = '/players';

export type CheckoutData = {
  accountUser: string;
  name: string;
  nominal: string;
  voucher: string;
  payment: string;
  bank: string;
};

export type TPlayer = {
  _id: string;
  avatar: string;
  name: string;
  username: string;
  email: string;
  password: string;
  phoneNumber: string;
};

export type TCategory = {
  _id: string;
  name: 'Mobile' | 'Desktop' | 'Web';
};

export type TVoucher = {
  _id: string;
  category: TCategory;
  name: string;
  thumbnail: string;
};

export type TNominal = {
  _id: string;
  coinQuantity: number;
  coinName: string;
  price: number;
};

export type TBank = {
  _id: string;
  bankName: string;
  noRekening: string;
  name: string;
};

export type TPayment = {
  _id: string;
  type: string;
  banks: TBank[] | string;
};

export type TTotalSpent = {
  Mobile: number;
  Desktop: number;
  Other: number;
};

export type TTransaction = {
  _id: string;
  accountUser: string;
  category: TCategory;
  historyPayment: TBank & TPayment;
  historyUser: { name: string; phoneNumber: string };
  historyVoucherTopup: {
    gameName: string;
    category: 'Mobile' | 'Desktop' | 'Other';
    thumbnail: string;
    coinName: string;
    coinQuantity: number;
    price: number;
  };
  name: string;
  player: string;
  status: 'pending' | 'success' | 'failed';
  tax: number;
  value: number;
  createdAt: string;
  updatedAt: string;
};

export type TDashboard = {
  totalSpent: TTotalSpent;
  transactions: TTransaction[];
};

export const useCategories = () => useAPI(`${route}/categories`);

export const useFeaturedGame = () => useAPI(`${route}/landing`);

export const useDashboard = (token: string) =>
  useAPI(`${route}/dashboard`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const useTransactionsHistory = (
  token: string,
  status?: string | null
) => {
  const queryURL = status ? `?status=${status}` : '';
  return useAPI(`${route}/history${queryURL}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const postCheckout = (data: CheckoutData, token: string) =>
  postAPI(`${route}/checkout`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
