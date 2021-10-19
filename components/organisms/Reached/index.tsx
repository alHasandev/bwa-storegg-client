import Divider from '../../atoms/Divider';
import ReachedStat from './ReachedStat';

function Reached() {
  return (
    <section className="reached pt-50 pb-50">
      <div className="container-fluid">
        <div className="d-flex flex-lg-row flex-column align-items-center justify-content-center gap-lg-0 gap-4">
          <ReachedStat value="290M+" desc="Players Top Up" />
          <Divider />
          <ReachedStat value="12.500" desc="Games Available" />
          <Divider />
          <ReachedStat value="99,9%" desc="Happy Players" />
          <Divider />
          <ReachedStat value="4.7" desc="Rating Worldwide" />
        </div>
      </div>
    </section>
  );
}

export default Reached;
