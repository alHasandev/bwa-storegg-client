import type { NextPage } from 'next';
import Sidebar from '../../../components/organisms/Sidebar';
import TransactionsContent from '../../../components/organisms/TransactionsContent';

const Transactions: NextPage = () => (
  <section className="transactions overflow-auto">
    <Sidebar activeMenu="transactions" />
    <TransactionsContent />
  </section>
);

export default Transactions;
