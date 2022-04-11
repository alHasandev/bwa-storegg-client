import jwtDecode from 'jwt-decode';
import { GetServerSidePropsContext } from 'next';
import OverviewContent from '../../components/organisms/OverviewContent';
import Sidebar from '../../components/organisms/Sidebar';
import { JwtData } from '../../services/auth';

type MemberOverviewProps = {
  jwtToken: string;
};

function MemberOverview({ jwtToken }: MemberOverviewProps) {
  return (
    <section className="overview overflow-auto">
      <Sidebar activeMenu="overview" />
      <OverviewContent jwtToken={jwtToken} />
    </section>
  );
}

export default MemberOverview;

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
