/* eslint-disable object-curly-newline */
import type { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';

import Footer from '../../components/organisms/Footer';
import Navbar from '../../components/organisms/Navbar';
import TopUpForm from '../../components/organisms/TopUpForm';
import TopUpItem from '../../components/organisms/TopUpItem';
import useAPI from '../../services';
import { TVoucher } from '../../services/players';

const Detail: NextPage = () => {
  const { query, isReady } = useRouter();
  const { data, error } = useAPI(isReady ? `/players/detail/${query._id}` : '');

  if (!data) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  const { _id, name, thumbnail, category }: TVoucher = data?.data;

  return (
    <>
      <Navbar />
      <section className="detail pt-lg-60 pb-50">
        <div className="container-xxl container-fluid">
          <div className="detail-header pb-50">
            <h2 className="text-4xl fw-bold color-palette-1 text-start mb-10">
              Top Up
            </h2>
            <p className="text-lg color-palette-1 mb-0">
              Perkuat akun dan jadilah pemenang
            </p>
          </div>
          <div className="row">
            <div className="col-xl-3 col-lg-4 col-md-5 pb-30 pb-md-0 pe-md-25 text-md-start">
              <TopUpItem data={data.data} type="mobile" />
            </div>
            <div className="col-xl-9 col-lg-8 col-md-7 ps-md-25">
              {/* <!-- Desktop: Game title --> */}
              <TopUpItem data={data.data} type="desktop" />
              <hr />
              <TopUpForm
                voucher={{
                  _id,
                  name,
                  thumbnail,
                  category,
                }}
                nominals={data.data?.nominals}
                payments={data.data?.payments}
              />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Detail;
