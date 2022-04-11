/* eslint-disable object-curly-newline */
import Link from 'next/link';
import cx from 'classnames';
import Image from 'next/image';

interface MenuItemProps {
  title: string;
  iconSrc: string;
  link: string;
  active?: boolean;
  onClick?: () => void;
}

function MenuItem(props: Partial<MenuItemProps>) {
  const { title, iconSrc = '', active, link = '/', onClick } = props;

  const classItem = cx({
    item: true,
    'mb-30': true,
    active,
  });

  return (
    <div className={classItem}>
      <div className="me-3">
        <Image src={iconSrc} width={25} height={25} alt="Sidebar icon" />
      </div>
      <p className="item-title m-0">
        {typeof onClick === 'function' ? (
          <a
            href="#"
            role="button"
            className="text-lg text-decoration-none"
            onClick={onClick}
          >
            {title}
          </a>
        ) : (
          <Link href={link}>
            <a className="text-lg text-decoration-none">{title}</a>
          </Link>
        )}
      </p>
    </div>
  );
}

export default MenuItem;
