import Image from 'next/image';

export interface StepItemProps {
  iconSrc: string;
  title: string;
  description: string[];
}

function StepItem(props: StepItemProps) {
  const { iconSrc, title, description } = props;
  const pargCount = description.length;

  return (
    <div className="col-lg-4">
      <div className="card feature-card border-0">
        <div className="mb-4">
          <Image src={iconSrc} width={80} height={80} alt="icon step" />
        </div>
        <p className="fw-semibold text-2xl mb-2 color-palette-1">{title}</p>
        <div className="text-lg color-palette-1 mb-0">
          {description.map((desc, i) => {
            if (i < pargCount) {
              return <p key={`${desc}`}>{desc}</p>;
            }
            return desc;
          })}
        </div>
      </div>
    </div>
  );
}

export default StepItem;
