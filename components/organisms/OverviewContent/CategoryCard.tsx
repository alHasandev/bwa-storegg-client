import Image from 'next/image';
import rupiah from '../../../utilities/Intl/rupiah';

interface CategoryCardProps {
  title: string[];
  nominal: number;
  iconSrc: string;
}

function CategoryCard(props: CategoryCardProps) {
  const { title, nominal, iconSrc } = props;

  return (
    <div className="col-lg-4 ps-15 pe-15 pb-lg-0 pb-4">
      <div className="categories-card">
        <div className="d-flex align-items-center mb-24">
          <Image src={iconSrc} width={60} height={60} alt="category icon" />
          <p className="color-palette-1 mb-0 ms-12">
            {title[0]}
            <br />
            {title[1]}
          </p>
        </div>
        <div>
          <p className="text-sm color-palette-2 mb-1">Total Spent</p>
          <p className="text-2xl color-palette-1 fw-medium m-0">
            {rupiah(nominal)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CategoryCard;
