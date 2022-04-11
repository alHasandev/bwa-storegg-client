/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import Image from 'next/image';
import { TBank } from '../../../services/players';

type PaymentItemProps = {
  type: string;
  onChecked?: (value: string) => void;
} & TBank;

const PaymentItem = ({
  type,
  _id: bankID,
  bankName,
  onChecked,
}: PaymentItemProps) => (
  <label className="col-lg-4 col-sm-6 ps-md-15 pe-md-15 pt-md-15 pb-md-15 pt-10 pb-10">
    <input
      className="d-none"
      type="radio"
      name="paymentMethod"
      value={bankID}
      onChange={(event) => onChecked?.(event.target.value)}
    />
    <div className="detail-card">
      <div className="d-flex justify-content-between">
        <p className="text-3xl color-palette-1 fw-medium m-0">{type}</p>
        <Image
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

PaymentItem.defaultProps = {
  onChecked: (id: string) => {},
};

export default PaymentItem;
