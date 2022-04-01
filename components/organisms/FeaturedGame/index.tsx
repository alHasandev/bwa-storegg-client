/* eslint-disable no-underscore-dangle */
import useSWR from 'swr';
import axios from 'axios';

import GameItem from '../../molecules/GameItem';

const API_URL = 'https://bwa-storeg-server.herokuapp.com';
const IMAGE_URL = 'https://bwa-storeg-server.herokuapp.com/uploads';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

type TCategory = {
  _id: string;
  name: 'Mobile' | 'Desktop' | 'Web';
};

type TVoucher = {
  _id: string;
  category: TCategory;
  name: string;
  thumbnail: string;
};

function FeaturedGame() {
  const {
    data: { data },
    error,
  } = useSWR(`${API_URL}/api/v1/players/landing`, fetcher);

  if (!data) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;

  return (
    <section className="featured-game pt-50 pb-50">
      <div className="container-fluid">
        <h2 className="text-4xl fw-bold color-palette-1 mb-30">
          Our Featured
          <br />
          Games This Year
        </h2>
        <div
          className="d-flex flex-row flex-lg-wrap overflow-setting justify-content-lg-between gap-lg-3 gap-4"
          data-aos="fade-up"
        >
          {data.map((game: TVoucher) => (
            <GameItem
              key={game._id}
              imgSrc={`${IMAGE_URL}/${game.thumbnail}`}
              title={game.name}
              category={game.category.name}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedGame;
