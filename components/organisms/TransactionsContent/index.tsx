/* eslint-disable operator-linebreak */
/* eslint-disable object-curly-newline */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { IMAGE_URL } from '../../../services';
import {
  TTransaction,
  useTransactionsHistory,
} from '../../../services/players';
import rupiah from '../../../utilities/Intl/rupiah';
import TagButton from '../../atoms/TagButton';
import { TransactionRecordProps } from '../OverviewContent/types';
import TableRow from './TableRow';

// Dummy data for filter tag
const tags = [
  { filter: '', text: 'All' },
  { filter: 'success', text: 'Success' },
  { filter: 'pending', text: 'Pending' },
  { filter: 'failed', text: 'Failed' },
];

type TransactionHistory = {
  data: TTransaction[];
  totalValue: number;
};

type TransactionsContentProps = {
  jwtToken: string;
};

function TransactionsContent({ jwtToken }: TransactionsContentProps) {
  const { asPath, isReady } = useRouter();

  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const { data, error } = useTransactionsHistory<TransactionHistory>(
    jwtToken,
    selectedTag
  );

  useEffect(() => {
    if (isReady) {
      const hash = asPath.split('#')[1];
      if (hash) {
        setSelectedTag(hash);
      } else {
        setSelectedTag('');
      }
    }
  }, [asPath, isReady]);

  if (!data) return <div>Loading...</div>;
  if (error) return <div>Error!, hubungi admin</div>;

  const { data: transactions, totalValue } = data;

  return (
    <main className="main-wrapper">
      <div className="ps-lg-0">
        <h2 className="text-4xl fw-bold color-palette-1 mb-30">
          My Transactions
        </h2>
        <div className="mb-30">
          <p className="text-lg color-palette-2 mb-12">You’ve spent</p>
          <h3 className="text-5xl fw-medium color-palette-1">
            {rupiah(totalValue)}
          </h3>
        </div>
        <div className="row mt-30 mb-20">
          <div className="col-lg-12 col-12 main-content">
            <div id="list_status_title">
              {tags.map((tag) => (
                <TagButton
                  key={tag.filter}
                  filter={tag.filter}
                  text={tag.text}
                  active={selectedTag === tag.filter}
                  onClickTag={setSelectedTag}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="latest-transaction">
          <p className="text-lg fw-medium color-palette-1 mb-14">
            Latest Transactions
          </p>
          <div className="main-content main-content-table overflow-auto">
            <table className="table table-borderless">
              <thead>
                <tr className="color-palette-1">
                  <th className="" scope="col">
                    Game
                  </th>
                  <th scope="col">Item</th>
                  <th scope="col">Price</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody id="list_status_item">
                {transactions.map((transaction) => {
                  const { historyVoucherTopup: gameData } = transaction;
                  const { game, item, price, status }: TransactionRecordProps =
                    {
                      game: {
                        img: `${IMAGE_URL}/${gameData.thumbnail}`,
                        title: gameData.gameName,
                        category: gameData.category,
                      },
                      item: `${gameData.coinQuantity} ${gameData.coinName}`,
                      price: transaction.value,
                      status: transaction.status,
                    };
                  return (
                    <TableRow
                      key={transaction._id}
                      detailID={transaction._id}
                      game={game}
                      item={item}
                      price={price}
                      status={status}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}

export default TransactionsContent;
