import Link from 'next/link';

interface ButtonProps {
  type: 'Primary' | 'Secondary' | 'Submit';
  text: string;
  href?: string;
}

function Button(props: Partial<ButtonProps>) {
  const { type, text, href = '#' } = props;
  let typeClass;

  switch (type) {
    case 'Primary':
      typeClass = 'btn-primary';
      break;
    case 'Secondary':
      typeClass = 'btn-read';
      break;
    case 'Submit':
      typeClass = 'btn-submit text-white';
      break;
    default:
      typeClass = 'btn-get text-white';
      break;
  }

  return (
    <Link href={href}>
      <a role="button" className={`btn ${typeClass} text-lg rounded-pill`}>
        {text}
      </a>
    </Link>
  );
}

export default Button;
