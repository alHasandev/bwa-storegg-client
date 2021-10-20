import rupiah from '../../../utilities/Intl/rupiah';

type GameProps = {
  img: string;
  title: string;
  category: 'Desktop' | 'Mobile' | 'Other';
};

interface TransactionRecordProps {
  game: GameProps;
  item: string;
  price: number;
  status: 'pending' | 'success' | 'failed';
}

const uppercase = (s: string, i?: number) => {
  if (i) {
    const rest = s.slice(i, s.length);
    const upper = s.slice(0, i).toUpperCase();

    return upper + rest;
  }

  return s.toUpperCase();
};

function TransactionRecord(props: TransactionRecordProps) {
  const {
    game, item, price, status,
  } = props;

  return (
    <tr className="align-middle">
      <th scope="row">
        <img
          className="float-start me-3 mb-lg-0 mb-3"
          src={game.img}
          width={80}
          height={60}
          alt="game thumb"
        />
        <div className="game-title-header">
          <p className="game-title fw-medium text-start color-palette-1 m-0">{game.title}</p>
          <p className="text-xs fw-normal text-start color-palette-2 m-0">{game.category}</p>
        </div>
      </th>
      <td>
        <p className="fw-medium color-palette-1 m-0">{item}</p>
      </td>
      <td>
        <p className="fw-medium text-start color-palette-1 m-0">{rupiah(price)}</p>
      </td>
      <td>
        <div>
          <span className={`float-start icon-status ${status}`} />
          <p className="fw-medium text-start color-palette-1 m-0 position-relative">
            {uppercase(status, 1)}
          </p>
        </div>
      </td>
    </tr>
  );
}

export default TransactionRecord;