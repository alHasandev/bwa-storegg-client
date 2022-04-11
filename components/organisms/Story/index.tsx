import Image from 'next/image';
import Button from '../../atoms/Button';

function Story() {
  return (
    <section className="story pt-50 pb-50">
      <div className="container-xxl container-fluid">
        <div className="row align-items-center px-lg-5 mx-auto gap-lg-0 gap-4">
          <div
            className="col-lg-7 col-12 d-lg-flex d-none justify-content-lg-end pe-lg-60"
            data-aos="zoom-in"
          >
            <Image
              src="/img/Header-9.png"
              width="612"
              height="452"
              className="img-fluid"
              alt=""
            />
          </div>
          <div className="col-lg-5 col-12 ps-lg-60">
            <div className="">
              <h2 className="text-4xl fw-bold color-palette-1 mb-30">
                Win the battle.
                <br />
                Be the Champion.
              </h2>
              <p className="text-lg color-palette-1 mb-30">
                Kami menyediakan jutaan cara untuk
                <br className="d-sm-block d-none" />
                membantu players menjadi
                <br className="d-sm-block d-none" />
                pemenang sejati
              </p>
              <div className="d-md-block d-flex flex-column w-100">
                <Button href="/" type="Secondary" text="Read Story" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Story;
