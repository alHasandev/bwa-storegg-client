import StepItem from '../../molecules/StepItem';

function TransactionStep() {
  return (
    <section id="feature" className="feature pt-50 pb-50">
      <div className="container-fluid">
        <h2 className="text-4xl fw-bold color-palette-1 text-center mb-30">
          It’s Really That
          <br />
          Easy to Win the Game
        </h2>
        <div className="row gap-lg-0 gap-4" data-aos="fade-up">
          <StepItem
            iconSrc="/icon/transaction-start.svg"
            title="1. Start"
            description={['Pilih salah satu game', 'yang ingin kamu top up']}
          />
          <StepItem
            iconSrc="/icon/transaction-fillup.svg"
            title="2. Fill Up"
            description={['Top up sesuai dengan', 'nominal yang sudah tersedia']}
          />
          <StepItem
            iconSrc="/icon/transaction-beawinner.svg"
            title="3. Be a Winner"
            description={['Siap digunakan untuk', 'improve permainan kamu']}
          />
        </div>
      </div>
    </section>
  );
}

export default TransactionStep;
