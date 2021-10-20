import Link from 'next/link';
import cx from 'classnames';

interface MenuItemProps {
  title: string;
  iconSrc: string;
  link: string;
  active?: boolean;
}

function MenuItem(props: Partial<MenuItemProps>) {
  const {
    title, iconSrc, active, link = '/',
  } = props;

  const classItem = cx({
    item: true,
    'mb-30': true,
    active,
  });

  return (
    <div className={classItem}>
      <img src={iconSrc} className="me-3" width={25} height={25} alt="Sidebar icon" />
      <p className="item-title m-0">
        <Link href={link}>
          <a className="text-lg text-decoration-none">{title}</a>
        </Link>
      </p>
    </div>
  );
}

export default MenuItem;
