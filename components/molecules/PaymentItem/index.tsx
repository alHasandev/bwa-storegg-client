import { TBank } from '../../../services/players';

type PaymentItemProps = {
  type: string;
} & TBank;

const PaymentItem = ({ type, _id: bankID, bankName }: PaymentItemProps) => (
  <label className="col-lg-4 col-sm-6 ps-md-15 pe-md-15 pt-md-15 pb-md-15 pt-10 pb-10">
    <input
      className="d-none"
      type="radio"
      name="paymentMethod"
      value={bankID}
    />
    <div className="detail-card">
      <div className="d-flex justify-content-between">
        <p className="text-3xl color-palette-1 fw-medium m-0">{type}</p>
        <img
          src="/icon/check.svg"
          className="icon-check"
          width={20}
          height={20}
          alt="icon-check"
        />
      </div>
      <p className="text-lg color-palette-1 m-0">{bankName}</p>
    </div>
  </label>
);

export default PaymentItem;
