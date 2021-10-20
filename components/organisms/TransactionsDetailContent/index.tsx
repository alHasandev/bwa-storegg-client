import rupiah from '../../../utilities/Intl/rupiah';
import Button from '../../atoms/Button';
import DetailRow from './DetailRow';

function TransactionsDetailContent() {
  return (
    <main className="main-wrapper">
      <div className="ps-lg-0">
        <h2 className="text-4xl fw-bold color-palette-1 mb-30">Details #GG001</h2>
        <div className="details">
          <div className="main-content main-content-card overflow-auto">
            <section className="checkout mx-auto">
              <div className="d-flex flex-row  align-items-center justify-content-between mb-30">
                <div className="game-checkout d-flex flex-row align-items-center">
                  <div className="pe-4">
                    <div className="cropped">
                      <img
                        src="/img/Thumbnail-3.png"
                        width="200"
                        height="130"
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                  </div>
                  <div>
                    <p className="fw-bold text-xl color-palette-1 mb-10">
                      Mobile Legends:
                      <br />
                      The New Battle 2021
                    </p>
                    <p className="color-palette-2 m-0">Category: Mobile</p>
                  </div>
                </div>
                <div>
                  <p className="fw-medium text-center label pending m-0 rounded-pill">Pending</p>
                </div>
              </div>
              <hr />
              <div className="purchase pt-30">
                <h2 className="fw-bold text-xl color-palette-1 mb-20">Purchase Details</h2>
                <DetailRow label="Your Game ID" value="masayoshizero" />
                <DetailRow label="Order ID" value="#GG001" />
                <DetailRow label="Item" value="250 Diamonds" />
                <DetailRow label="Price" value={rupiah(42280500)} />
                <DetailRow label="Tax (10%)" value={rupiah(4228000)} />
                <DetailRow label="Total" value={rupiah(55000600)} highlight />
              </div>
              <div className="payment pt-10 pb-10">
                <h2 className="fw-bold text-xl color-palette-1 mb-20">Payment Informations</h2>
                <DetailRow label="Your Account Name" value="Masayoshi Angga Zero" />
                <DetailRow label="Type" value="Worldwide Transfer" />
                <DetailRow label="Bank Name" value="Mandiri" />
                <DetailRow label="Bank Account Name" value="PT Store GG Indonesia" />
                <DetailRow label="Bank Number" value="1800 - 9090 - 2021" />
              </div>
              <div className="d-md-block d-flex flex-column w-100">
                <Button type="Primary" text="WhatsApp ke Admin" />
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

export default TransactionsDetailContent;
