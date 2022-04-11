import Image from 'next/image';
import { IMAGE_URL } from '../../../services';
import { TTransaction } from '../../../services/players';
import rupiah from '../../../utilities/Intl/rupiah';
import Button from '../../atoms/Button';
import DetailRow from './DetailRow';

type TransactionsDetailContentProps = {
  data: TTransaction;
};

function TransactionsDetailContent({ data }: TransactionsDetailContentProps) {
  const { historyVoucherTopup: game, historyPayment: payment } = data;

  return (
    <main className="main-wrapper">
      <div className="ps-lg-0">
        <h2 className="text-4xl fw-bold color-palette-1 mb-30">
          Details&nbsp;#
          {data._id}
        </h2>
        <div className="details">
          <div className="main-content main-content-card overflow-auto">
            <section className="checkout mx-auto">
              <div className="d-flex flex-row  align-items-center justify-content-between mb-30">
                <div className="game-checkout d-flex flex-row align-items-center">
                  <div className="pe-4">
                    <div className="cropped">
                      <Image
                        src={`${IMAGE_URL}/${game.thumbnail}`}
                        width="200"
                        height="130"
                        className="img-fluid"
                        alt={game.gameName}
                      />
                    </div>
                  </div>
                  <div>
                    <p className="fw-bold text-xl color-palette-1 mb-10">
                      {game.gameName}
                    </p>
                    <p className="color-palette-2 m-0">
                      Category:&nbsp;
                      {game.category}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="fw-medium text-center label pending m-0 rounded-pill">
                    {data.status}
                  </p>
                </div>
              </div>
              <hr />
              <div className="purchase pt-30">
                <h2 className="fw-bold text-xl color-palette-1 mb-20">
                  Purchase Details
                </h2>
                <DetailRow label="Your Game ID" value={data.accountUser} />
                <DetailRow label="Order ID" value={`#${data._id}`} />
                <DetailRow
                  label="Item"
                  value={`${game.coinQuantity} ${game.coinName}`}
                />
                <DetailRow label="Price" value={rupiah(game.price)} />
                <DetailRow label="Tax (10%)" value={rupiah(data.tax)} />
                <DetailRow label="Total" value={rupiah(data.value)} highlight />
              </div>
              <div className="payment pt-10 pb-10">
                <h2 className="fw-bold text-xl color-palette-1 mb-20">
                  Payment Informations
                </h2>
                <DetailRow label="Your Account Name" value={data.name} />
                <DetailRow label="Type" value={payment.type} />
                <DetailRow label="Bank Name" value={payment.bankName} />
                <DetailRow label="Bank Account Name" value={payment.name} />
                <DetailRow label="Bank Number" value={payment.noRekening} />
              </div>
              <div className="d-flex flex-column d-md-block w-100">
                <a
                  role="button"
                  href={`https://wa.me/6282149259826/?text=Konfirmasi%20order%20dengan%20ID%20${data._id}`}
                  rel="noreferrer"
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="btn btn-primary fw-medium text-lg color-palette-1 rounded-pill"
                >
                  Whatsapp ke Admin
                </a>
                <Button
                  href="/member/transactions"
                  type="Secondary"
                  text="Kembali"
                />
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

export default TransactionsDetailContent;
