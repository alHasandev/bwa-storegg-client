/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import Image from 'next/image';
import rupiah from '../../../utilities/Intl/rupiah';

/* eslint-disable object-curly-newline */
type NominalProps = {
  id: string;
  coinQuantity: number;
  coinName: string;
  price: number;
  onChecked?: (value: string) => void;
};

const Nominal = ({
  id,
  coinQuantity,
  coinName,
  price,
  onChecked,
}: NominalProps) => (
  <label className="col-lg-4 col-sm-6 ps-md-15 pe-md-15 pt-md-15 pb-md-15 pt-10 pb-10">
    <input
      className="d-none"
      type="radio"
      name="topup"
      value={id}
      onChange={(e) => onChecked?.(e.target.value)}
    />
    <div className="detail-card">
      <div className="d-flex justify-content-between">
        <p className="text-3xl color-palette-1 m-0">
          <span className="fw-medium">{coinQuantity}</span>
          &nbsp;
          {coinName}
        </p>
        <Image
          src="/icon/check.svg"
          className="icon-check"
          width={20}
          height={20}
          alt="icon-check"
        />
      </div>
      <p className="text-lg color-palette-1 m-0">{rupiah(price)}</p>
    </div>
  </label>
);

Nominal.defaultProps = {
  onChecked: (id: string) => {},
};

export default Nominal;
