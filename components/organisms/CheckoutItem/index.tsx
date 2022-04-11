import Image from 'next/image';
import { IMAGE_URL } from '../../../services';

/* eslint-disable react/jsx-one-expression-per-line */
type CheckoutItemProps = {
  gameName: string;
  category: string;
  thumbnail: string;
};

function CheckoutItem({ gameName, category, thumbnail }: CheckoutItemProps) {
  return (
    <>
      <div className="game-checkout d-flex flex-row align-items-center pt-md-50 pb-md-50 pt-30 pb-30">
        <div className="pe-4">
          <div className="cropped">
            <Image
              src={`${IMAGE_URL}/${thumbnail}`}
              className="img-fluid"
              layout="fill"
              objectFit="cover"
              alt=""
            />
          </div>
        </div>
        <div>
          <p className="fw-bold text-xl color-palette-1 mb-10">{gameName}</p>
          <p className="color-palette-2 m-0">Category: {category}</p>
        </div>
      </div>
    </>
  );
}

export default CheckoutItem;
