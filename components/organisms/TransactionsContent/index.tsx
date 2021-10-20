import rupiah from '../../../utilities/Intl/rupiah';
import TagButton from '../../atoms/TagButton';
import TableRow from './TableRow';

function TransactionsContent() {
  return (
    <main className="main-wrapper">
      <div className="ps-lg-0">
        <h2 className="text-4xl fw-bold color-palette-1 mb-30">My Transactions</h2>
        <div className="mb-30">
          <p className="text-lg color-palette-2 mb-12">You’ve spent</p>
          <h3 className="text-5xl fw-medium color-palette-1">{rupiah(4518000500)}</h3>
        </div>
        <div className="row mt-30 mb-20">
          <div className="col-lg-12 col-12 main-content">
            <div id="list_status_title">
              <TagButton filter="*" text="All Trx" active />
              <TagButton filter="success" text="Success" />
              <TagButton filter="pending" text="Pending" />
              <TagButton filter="failed" text="Failed" />
            </div>
          </div>
        </div>
        <div className="latest-transaction">
          <p className="text-lg fw-medium color-palette-1 mb-14">Latest Transactions</p>
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
                <TableRow
                  game={{
                    img: '/img/overview-1.png',
                    title: 'Mobile Legends: The New Battle 2021',
                    category: 'Desktop',
                  }}
                  item="200 Gold"
                  price={290000}
                  status="pending"
                />
                <TableRow
                  game={{
                    img: '/img/overview-2.png',
                    title: 'Call of Duty:Modern',
                    category: 'Desktop',
                  }}
                  item="550 Gold"
                  price={740000}
                  status="success"
                />
                <TableRow
                  game={{
                    img: '/img/overview-3.png',
                    title: 'Clash of Clans',
                    category: 'Mobile',
                  }}
                  item="100 Gold"
                  price={120000}
                  status="failed"
                />
                <TableRow
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

export default TransactionsContent;
