import jwtDecode from 'jwt-decode';
import type { GetServerSidePropsContext, NextPage } from 'next';
import Sidebar from '../../../components/organisms/Sidebar';
import TransactionsContent from '../../../components/organisms/TransactionsContent';
import { JwtData } from '../../../services/auth';

type TransactionsProps = {
  jwtToken: string;
};

const Transactions: NextPage<TransactionsProps> = ({
  jwtToken,
}: TransactionsProps) => (
  <section className="transactions overflow-auto">
    <Sidebar activeMenu="transactions" />
    <TransactionsContent jwtToken={jwtToken} />
  </section>
);

export default Transactions;

export const getServerSideProps = ({ req }: GetServerSidePropsContext) => {
  try {
    const { token } = req.cookies;

    if (!token) throw new Error('Silahkan login terlebih dahulu!');

    const jwtToken = Buffer.from(token, 'base64').toString('ascii');
    const { player: user }: JwtData = jwtDecode(jwtToken);

    if (!user) throw new Error('Silahkan login terlebih dahulu!');

    return {
      props: {
        user,
        jwtToken,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: '/sign-in',
        permanent: false,
      },
    };
  }
};
