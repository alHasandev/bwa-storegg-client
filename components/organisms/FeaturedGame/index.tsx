/* eslint-disable no-underscore-dangle */

import { IMAGE_URL } from '../../../services';
import { TVoucher, useFeaturedGame } from '../../../services/players';
import GameItem from '../../molecules/GameItem';

function FeaturedGame() {
  const { data, error } = useFeaturedGame<{ data: TVoucher[] }>();

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
          {data?.data.map((game: TVoucher) => (
            <GameItem
              id={game._id}
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
