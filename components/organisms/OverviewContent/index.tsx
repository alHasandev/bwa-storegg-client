/* eslint-disable operator-linebreak */
/* eslint-disable object-curly-newline */
import { IMAGE_URL } from '../../../services';
import { TDashboard, useDashboard } from '../../../services/players';
import CategoryCard from './CategoryCard';
import TransactionRecord from './TransactionRecord';
import { TransactionRecordProps } from './types';

const categoryIcons = {
  Mobile: '/icon/category-mobile.svg',
  Desktop: '/icon/category-desktop.svg',
  Other: '/icon/category-other.svg',
};

const getCategoryIcon = (category: 'Desktop' | 'Mobile' | string) => {
  switch (category) {
    case 'Mobile':
    case 'Desktop':
      return categoryIcons[category];

    default:
      return categoryIcons.Other;
  }
};

type OverviewContentProps = {
  jwtToken: string;
};

function OverviewContent({ jwtToken }: OverviewContentProps) {
  const { data, error } = useDashboard<TDashboard>(jwtToken);

  if (!data) return <div>Loading...</div>;
  if (error) return <div>Error!, hubungi admin</div>;

  const { totalSpent, transactions } = data;

  return (
    <main className="main-wrapper">
      <div className="ps-lg-0">
        <h2 className="text-4xl fw-bold color-palette-1 mb-30">Overview</h2>
        <div className="top-up-categories mb-30">
          <p className="text-lg fw-medium color-palette-1 mb-14">
            Top Up Categories
          </p>
          <div className="main-content">
            <div className="row">
              {Object.keys(totalSpent).map((category) => (
                <CategoryCard
                  key={category}
                  title={['Game', category]}
                  iconSrc={getCategoryIcon(category)}
                  nominal={totalSpent[category]}
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
                  <th className="text-start" scope="col">
                    Game
                  </th>
                  <th scope="col">Item</th>
                  <th scope="col">Price</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
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
                    <TransactionRecord
                      key={transaction._id}
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

export default OverviewContent;
