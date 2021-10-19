import type { NextPage } from 'next';
import { useEffect } from 'react';

import AOS from 'aos';
import Navbar from '../components/organisms/Navbar';
import Footer from '../components/organisms/Footer';
import MainBanner from '../components/organisms/MainBanner';
import TransactionStep from '../components/organisms/TransactionStep';
import FeaturedGame from '../components/organisms/FeaturedGame';
import Reached from '../components/organisms/Reached';
import Story from '../components/organisms/Story';

const Home: NextPage = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
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
