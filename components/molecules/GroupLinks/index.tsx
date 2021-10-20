type GroupItems = {
  link: string;
  text: string;
};

interface GroupLinkProps {
  title: string;
  items: GroupItems[];
}

function GroupLinks(props: GroupLinkProps) {
  const { title, items } = props;

  return (
    <div className="col-md-4 col-6 mb-lg-0 mb-25">
      <p className="text-lg fw-semibold color-palette-1 mb-12">{title}</p>
      <ul className="list-unstyled">
        {items.map((item) => (
          <li className="mb-6" key={item.text}>
            <a href={item.link} className="text-lg color-palette-1 text-decoration-none">
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GroupLinks;
