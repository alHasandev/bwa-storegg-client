/* eslint-disable object-curly-newline */
import jwtDecode from 'jwt-decode';
import type { GetServerSidePropsContext, NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import CheckoutConfirmation from '../components/organisms/CheckoutConfirmation';
import CheckoutDetails from '../components/organisms/CheckoutDetails';
import CheckoutItem from '../components/organisms/CheckoutItem';
import useLocalStorage from '../hooks/useLocalStorage';
import { JwtData } from '../services/auth';
import {
  CheckoutData,
  postCheckout,
  TBank,
  TNominal,
  TPayment,
  TPlayer,
  TVoucher,
} from '../services/players';

type TopupDetail = {
  verifyID: string;
  bankAccount: string;
  voucher: TVoucher;
  nominal: TNominal;
  payment: TPayment;
  bank: TBank;
};

type CheckoutProps = {
  user: TPlayer;
  jwtToken: string;
};

const Checkout: NextPage<CheckoutProps> = ({
  user,
  jwtToken,
}: CheckoutProps) => {
  const router = useRouter();
  const [isConfirmed, setIsConfirmed] = useState(false);
  const { localValue } = useLocalStorage<TopupDetail>('topup-detail');

  if (!localValue) return <div>Loading...</div>;
  const { verifyID, bankAccount, voucher, nominal, payment, bank } = localValue;

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    // Confirm if 'I have transferred the money' is checked
    if (!isConfirmed) {
      return toast.warning(
        "Tolong centang 'I have transferred the money' sebelum confirmasi pembayaran"
      );
    }

    const checkoutData: CheckoutData = {
      accountUser: verifyID,
      name: user.name,
      nominal: nominal._id,
      voucher: voucher._id,
      payment: payment._id,
      bank: bank._id,
    };

    toast
      .promise(postCheckout(checkoutData, jwtToken), {
        pending: 'Memproses transaksi... mohon bersabar 🕗',
        success: 'Selamat Topup anda Berhasil 👍',
        error: 'Gagal melakukan topup, silahkan coba lagi 🙏',
      })
      .then(() => {
        return router.push('/complete-checkout');
      });
  };

  return (
    <section className="checkout mx-auto pt-md-100 pb-md-145 pt-30 pb-30">
      <form className="container-fluid" onSubmit={onSubmit}>
        <div className="logo text-md-center text-start pb-50">
          <Image src="/icon/logo.svg" width={60} height={60} alt="logo" />
        </div>
        <div className="title-text pt-md-50 pt-0">
          <h2 className="text-4xl fw-bold color-palette-1 mb-10">Checkout</h2>
          <p className="text-lg color-palette-1 mb-0">
            Waktunya meningkatkan cara bermain
          </p>
        </div>
        <CheckoutItem
          gameName={voucher.name}
          category={voucher.category.name}
          thumbnail={voucher.thumbnail}
        />
        <hr />
        <CheckoutDetails
          verifyID={verifyID}
          bankAccount={bankAccount}
          nominal={nominal}
          payment={payment}
          bank={bank}
        />
        <CheckoutConfirmation
          onConfirmed={(isChecked) => setIsConfirmed(isChecked)}
        />
      </form>
    </section>
  );
};

export default Checkout;

export const getServerSideProps = ({ req }: GetServerSidePropsContext) => {
  try {
    const { token } = req.cookies;

    if (!token) throw new Error('Silahkan login terlebih dahulu!');

    const jwtToken = Buffer.from(token, 'base64').toString('ascii');
    const { player: user }: JwtData = jwtDecode(jwtToken);

    if (!user) throw new Error('Silahkan login terlebih dahulu!');

    return {
      props: {
        user,
        jwtToken,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: '/sign-in',
        permanent: false,
      },
    };
  }
};
