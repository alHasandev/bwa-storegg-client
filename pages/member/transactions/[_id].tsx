/* eslint-disable operator-linebreak */
import jwtDecode from 'jwt-decode';
import type { GetServerSideProps, NextPage } from 'next';
import TransactionsDetailContent from '../../../components/organisms/TransactionsDetailContent';
import { JwtData } from '../../../services/auth';
import getTransactionDetail from '../../../services/members';
import { TTransaction } from '../../../services/players';

type TransactionsDetailProps = {
  transaction: TTransaction;
};

const TransactionsDetail: NextPage<TransactionsDetailProps> = ({
  transaction,
}: TransactionsDetailProps) => (
  <section className="transactions-detail overflow-auto">
    <TransactionsDetailContent data={transaction} />
  </section>
);

export default TransactionsDetail;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  try {
    const { token } = req.cookies;

    if (!token) throw new Error('Silahkan login terlebih dahulu!');

    const jwtToken = Buffer.from(token, 'base64').toString('ascii');
    const { player: user }: JwtData = jwtDecode(jwtToken);

    if (!user) throw new Error('Silahkan login terlebih dahulu!');

    const transaction: TTransaction = await getTransactionDetail(
      params?._id,
      jwtToken
    );

    return {
      props: { transaction },
    };
  } catch (error: any) {
    return {
      redirect: {
        destination: '/sign-in',
        permanent: false,
      },
    };
  }
};
