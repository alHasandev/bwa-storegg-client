import useAPI from '.';

const route = '/players';

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

export const useCategories = () => useAPI(`${route}/categories`);

export const useFeaturedGame = () => useAPI(`${route}/landing`);
