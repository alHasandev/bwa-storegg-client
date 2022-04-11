/* eslint-disable implicit-arrow-linebreak */
import useAPI, { getAPI, patchAPI, postAPI } from '.';

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
  banks: TBank[];
};

export type TTotalSpent = { [s: string]: number };

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

export type TGameDetail = {
  nominals: TNominal[];
  payments: TPayment[];
} & TVoucher;

export type GetFeaturedGameResult = {
  data: TVoucher[];
};

export type GetGameDetailResult = {
  data: TGameDetail;
};

export type GetFeaturedGame = () => Promise<GetFeaturedGameResult>;
// eslint-disable-next-line no-unused-vars
export type GetGameDetail = (voucherID: string) => Promise<GetGameDetailResult>;

export const useCategories = <T>() => useAPI<T>(`${route}/categories`);

export const useFeaturedGame = <T>() => useAPI<T>(`${route}/landing`);

export const getFeaturedGame: GetFeaturedGame = () =>
  getAPI(`${route}/landing`);

export const getGameDetail: GetGameDetail = (voucherID: string) =>
  getAPI(`${route}/detail/${voucherID}`);

export const useDashboard = <T>(token: string) =>
  useAPI<T>(`${route}/dashboard`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const useTransactionsHistory = <T>(
  token: string,
  status?: string | null
) => {
  const queryURL = status ? `?status=${status}` : '';
  return useAPI<T>(`${route}/history${queryURL}`, {
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

export const updateProfile = <T>(data: FormData, token: string) =>
  patchAPI<T>(`${route}/profile`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
