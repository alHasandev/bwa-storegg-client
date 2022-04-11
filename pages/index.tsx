import type { NextPage } from 'next';
import { useEffect } from 'react';

import AOS from 'aos';
import Navbar from '../components/organisms/Navbar';
import MainBanner from '../components/organisms/MainBanner';
import TransactionStep from '../components/organisms/TransactionStep';
import FeaturedGame from '../components/organisms/FeaturedGame';
import Reached from '../components/organisms/Reached';
import Story from '../components/organisms/Story';
import Footer from '../components/organisms/Footer';
import SEOHead from '../components/molecules/SEOHead';
import { BASE_PATH } from '../services';

const Home: NextPage = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      <SEOHead
        title="Store GG - Get a New Experience in Gaming"
        meta={{
          description:
            'Topup & Get a New Experience in Gaming, Kami menyediakan jutaan cara untuk membantu players menjadi pemenang sejati',
          type: 'e-commerce',
          url: BASE_PATH,
          image: `${BASE_PATH}/img/preview-web.png`,
        }}
      />
      <Navbar />
      <MainBanner />
      <TransactionStep />
      <FeaturedGame />
      <Reached />
      <Story />
      <Footer />
    </>
  );
};

export default Home;
