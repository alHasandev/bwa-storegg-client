/* eslint-disable function-paren-newline */
/* eslint-disable comma-dangle */
/* eslint-disable implicit-arrow-linebreak */
import { useRouter } from 'next/router';
import { FormEventHandler, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useFormData from '../../../hooks/useFormData';
import { TNominal, TBank } from '../../../services/players';

import NominalItem from '../../molecules/NominalItem';
import PaymentItem from '../../molecules/PaymentItem';

type TopUpFormProps = {
  voucher: string;
  nominals: TNominal[];
  payments: {
    type: string;
    _id: string;
    banks: TBank[];
  }[];
};

function TopUpForm({ nominals, payments, voucher }: TopUpFormProps) {
  const router = useRouter();
  const { formData, changeFormValue } = useFormData({
    verifyID: '',
    bankAccount: '',
  });
  const [nominal, setNominal] = useState('');
  const [payment, setPayment] = useState('');
  const [bankID, setBankID] = useState('');

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    console.log('formData', {
      ...formData,
      nominal,
      payment,
      bank: bankID,
    });

    if (!formData.verifyID && !formData.bankAccount) {
      return toast.warning('Silahkan mengisi Verify ID dan bank account');
    }

    if (!nominal && !payment && !bankID) {
      return toast.warning('Silahkan memilih nominal dan metode pembayaran');
    }

    localStorage.setItem(
      'topup-detail',
      JSON.stringify({
        ...formData,
        voucher,
        nominal,
        payment,
        bank: bankID,
      })
    );

    // Redirect to checkout page
    return router.push('/checkout');
  };

  const setPaymentAndBank = (paymentID: string, bankId: string) => {
    setPayment(paymentID);
    setBankID(bankId);
  };

  return (
    <form action="./checkout.html" method="POST" onSubmit={onSubmit}>
      <ToastContainer />
      <div className="pt-md-50 pt-30">
        <div className="">
          <label
            htmlFor="ID"
            className="form-label text-lg fw-medium color-palette-1 mb-10"
          >
            Verify ID
          </label>
          <input
            type="text"
            className="form-control rounded-pill text-lg"
            id="verifyID"
            name="verifyID"
            aria-describedby="verifyID"
            placeholder="Enter your ID"
            value={formData.verifyID}
            onChange={changeFormValue}
          />
        </div>
      </div>
      <div className="pt-md-50 pb-md-50 pt-30 pb-20">
        <p className="text-lg fw-medium color-palette-1 mb-md-10 mb-0">
          Nominal Top Up
        </p>
        <div className="row justify-content-between">
          {nominals.map((nomi) => (
            <NominalItem
              key={nomi._id}
              id={nomi._id}
              coinQuantity={nomi.coinQuantity}
              coinName={nomi.coinName}
              price={nomi.price}
              onChecked={(nominalID) => setNominal(nominalID)}
            />
          ))}
          <div className="col-lg-4 col-sm-6">{/* <!-- Blank --> */}</div>
        </div>
      </div>
      <div className="pb-md-50 pb-20">
        <p className="text-lg fw-medium color-palette-1 mb-md-10 mb-0">
          Payment Method
        </p>
        <fieldset id="paymentMethod">
          <div className="row justify-content-between">
            {payments.map(({ _id, type, banks }) =>
              banks.map((bank) => (
                <PaymentItem
                  key={bank._id}
                  type={type}
                  _id={bank._id}
                  bankName={bank.bankName}
                  noRekening={bank.noRekening}
                  name={bank.name}
                  onChecked={(bankId) => setPaymentAndBank(_id, bankId)}
                />
              ))
            )}
            <div className="col-lg-4 col-sm-6">{/* <!-- Blank --> */}</div>
          </div>
        </fieldset>
      </div>
      <div className="pb-50">
        <label
          htmlFor="bankAccount"
          className="form-label text-lg fw-medium color-palette-1 mb-10"
        >
          Bank Account Name
        </label>
        <input
          type="text"
          className="form-control rounded-pill text-lg"
          id="bankAccount"
          name="bankAccount"
          aria-describedby="bankAccount"
          placeholder="Enter your Bank Account Name"
          value={formData.bankAccount}
          onChange={changeFormValue}
        />
      </div>
      <div className="d-sm-block d-flex flex-column w-100">
        <button
          type="submit"
          className="btn btn-submit rounded-pill fw-medium text-white border-0 text-lg"
        >
          Continue
        </button>
      </div>
    </form>
  );
}

export default TopUpForm;
