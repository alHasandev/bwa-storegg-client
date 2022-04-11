/* eslint-disable object-curly-newline */
import Image from 'next/image';
import { IMAGE_URL } from '../../../services';
import { TVoucher } from '../../../services/players';

interface TopUpItemProps {
  type: 'desktop' | 'mobile';
  data: TVoucher;
}

function TopUpItem(props: TopUpItemProps) {
  const {
    data: { category, name, thumbnail },
    type,
  } = props;

  if (type === 'desktop') {
    return (
      <div className="pb-50 d-md-block d-none">
        <h2 className="text-4xl fw-bold color-palette-1 text-start mb-10 mt-10">
          {name}
        </h2>
        <p className="text-lg color-palette-2 mb-0">
          Category:
          {category.name}
        </p>
      </div>
    );
  }

  return (
    <div className="row align-items-center">
      <div className="col-md-12 col-4">
        <Image
          src={`${IMAGE_URL}/${thumbnail}`}
          width="280"
          height="380"
          className="img-fluid"
          alt=""
        />
      </div>
      {/* <!-- Mobile: Game title --> */}
      <div className="col-md-12 col-8 d-md-none d-block">
        <h2 className="text-xl fw-bold color-palette-1 text-start mb-10">
          Mobile Legends:
          <br />
          The New Battle 2021
        </h2>
        <p className="text-sm color-palette-2 text-start mb-0">
          Category: Mobile
        </p>
      </div>
    </div>
  );
}

export default TopUpItem;
