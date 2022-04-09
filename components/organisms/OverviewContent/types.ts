export type GameProps = {
  img: string;
  title: string;
  category: 'Desktop' | 'Mobile' | 'Other';
};

export interface TransactionRecordProps {
  game: GameProps;
  item: string;
  price: number;
  status: 'pending' | 'success' | 'failed';
}
