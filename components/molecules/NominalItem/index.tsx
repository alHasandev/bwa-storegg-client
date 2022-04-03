import rupiah from '../../../utilities/Intl/rupiah';

/* eslint-disable object-curly-newline */
type NominalProps = {
  id: string;
  coinQuantity: number;
  coinName: string;
  price: number;
};

const Nominal = ({ id, coinQuantity, coinName, price }: NominalProps) => (
  <label className="col-lg-4 col-sm-6 ps-md-15 pe-md-15 pt-md-15 pb-md-15 pt-10 pb-10">
    <input className="d-none" type="radio" name="topup" value={id} />
    <div className="detail-card">
      <div className="d-flex justify-content-between">
        <p className="text-3xl color-palette-1 m-0">
          <span className="fw-medium">{coinQuantity}</span>
          {coinName}
        </p>
        <img
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

export default Nominal;
