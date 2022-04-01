import useAPI from '.';

const route = 'players';

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

export const useFeaturedGame = () => useAPI(`${route}/landing`);
