import type { NextPage } from 'next';
import TransactionsDetailContent from '../../../components/organisms/TransactionsDetailContent';

const TransactionsDetail: NextPage = () => (
  <section className="transactions-detail overflow-auto">
    <TransactionsDetailContent />
  </section>
);

export default TransactionsDetail;
