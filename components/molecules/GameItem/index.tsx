import Image from 'next/image';
import Link from 'next/link';

interface GameItemProps {
  imgSrc: string;
  title: string;
  category: 'Mobile' | 'Desktop' | 'Web';
}

function GameItem(props: GameItemProps) {
  const { imgSrc, title, category: platform } = props;

  return (
    <div className="featured-game-card position-relative">
      <Link href="/detail">
        <a>
          <div className="blur-sharp">
            <img src={imgSrc} className="thumbnail" width={205} height={270} alt="Game thumbnail" />
          </div>
          <div className="cover position-absolute bottom-0 m-32">
            <div className="d-flex flex-column h-100 justify-content-between text-decoration-none">
              <div className="game-icon mx-auto">
                <Image
                  src="/icon/game-console.svg"
                  width={54}
                  height={36}
                  alt="game console icon"
                />
              </div>
              <div>
                <p className="fw-semibold text-white text-xl m-0">{title}</p>
                <p className="fw-light text-white m-0">{platform}</p>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
}

export default GameItem;
