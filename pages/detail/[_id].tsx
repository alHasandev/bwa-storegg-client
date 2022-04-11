/* eslint-disable object-curly-newline */
import type { GetStaticPaths, NextPage } from 'next';

import Footer from '../../components/organisms/Footer';
import Navbar from '../../components/organisms/Navbar';
import TopUpForm from '../../components/organisms/TopUpForm';
import TopUpItem from '../../components/organisms/TopUpItem';
import { BASE_PATH, IMAGE_URL } from '../../services';
import {
  getFeaturedGame,
  getGameDetail,
  TGameDetail,
} from '../../services/players';
import SEOHead from '../../components/molecules/SEOHead';

type DetailProps = {
  gameDetail: TGameDetail;
};

const Detail: NextPage<DetailProps> = ({ gameDetail }: DetailProps) => {
  const { _id, name, thumbnail, category, nominals, payments } = gameDetail;

  return (
    <>
      <SEOHead
        title={`Store GG - Top Up ${name}`}
        meta={{
          description: `Topup & Perkuat akun dan jadilah pemenang, Category: ${category.name}`,
          type: 'e-commerce',
          url: `${BASE_PATH}/detail/${_id}`,
          image: `${IMAGE_URL}/${thumbnail}`,
        }}
      />
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
              <TopUpItem data={gameDetail} type="mobile" />
            </div>
            <div className="col-xl-9 col-lg-8 col-md-7 ps-md-25">
              {/* <!-- Desktop: Game title --> */}
              <TopUpItem data={gameDetail} type="desktop" />
              <hr />
              <TopUpForm
                voucher={{
                  _id,
                  name,
                  thumbnail,
                  category,
                }}
                nominals={nominals}
                payments={payments}
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

export const getStaticPaths: GetStaticPaths = async () => {
  const { data: featuredGames } = await getFeaturedGame();
  const paths = featuredGames.map((game) => ({
    params: {
      _id: game._id,
    },
  }));

  return {
    paths,
    fallback: false, // true / 'blocking'
    /**
     * false => only pages that are generated during next build will be visible.
     * true => revalidate page of paths on request and re-build static path if page not exist
     * true: pages that don't exist => Nextjs will return error and must be handled (notFound: true)
     * 'blocking' => Like (true) but browser will blocking (hang) until requested page complete
     * Link: https://stackoverflow.com/questions/67787456/what-is-the-difference-between-fallback-false-vs-true-vs-blocking-of-getstaticpa
     */
  };
};

interface GetStaticPropsParams {
  params: {
    _id: string;
  };
}

export const getStaticProps = async ({ params }: GetStaticPropsParams) => {
  const { data: gameDetail } = await getGameDetail(params._id);

  return {
    props: {
      gameDetail,
    },
  };
};
