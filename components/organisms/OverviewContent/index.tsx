import CategoryCard from './CategoryCard';
import TransactionRecord from './TransactionRecord';

function OverviewContent() {
  return (
    <main className="main-wrapper">
      <div className="ps-lg-0">
        <h2 className="text-4xl fw-bold color-palette-1 mb-30">Overview</h2>
        <div className="top-up-categories mb-30">
          <p className="text-lg fw-medium color-palette-1 mb-14">Top Up Categories</p>
          <div className="main-content">
            <div className="row">
              <CategoryCard
                title={['Game', 'Desktop']}
                iconSrc="/icon/category-desktop.svg"
                nominal={18000500}
              />
              <CategoryCard
                title={['Game', 'Mobile']}
                iconSrc="/icon/category-mobile.svg"
                nominal={8455000}
              />
              <CategoryCard
                title={['Other', 'Categories']}
                iconSrc="/icon/category-other.svg"
                nominal={5000000}
              />
            </div>
          </div>
        </div>
        <div className="latest-transaction">
          <p className="text-lg fw-medium color-palette-1 mb-14">Latest Transactions</p>
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
                <TransactionRecord
                  game={{
                    img: '/img/overview-1.png',
                    title: 'Mobile Legends: The New Battle 2021',
                    category: 'Desktop',
                  }}
                  item="200 Gold"
                  price={290000}
                  status="pending"
                />
                <TransactionRecord
                  game={{
                    img: '/img/overview-2.png',
                    title: 'Call of Duty:Modern',
                    category: 'Desktop',
                  }}
                  item="550 Gold"
                  price={740000}
                  status="success"
                />
                <TransactionRecord
                  game={{
                    img: '/img/overview-3.png',
                    title: 'Clash of Clans',
                    category: 'Mobile',
                  }}
                  item="100 Gold"
                  price={120000}
                  status="failed"
                />
                <TransactionRecord
                  game={{
                    img: '/img/overview-4.png',
                    title: 'The Royal Game',
                    category: 'Mobile',
                  }}
                  item="225 Gold"
                  price={200000}
                  status="pending"
                />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}

export default OverviewContent;
