interface ButtonProps {
  type: 'Primary' | 'Secondary';
  text: string;
  href?: string;
}

function Button(props: Partial<ButtonProps>) {
  const { type, text, href = '/' } = props;
  let typeClass;

  switch (type) {
    case 'Primary':
      typeClass = 'btn-get text-white';
      break;
    case 'Secondary':
      typeClass = 'btn-read';
      break;
    default:
      typeClass = 'btn-get text-white';
      break;
  }

  return (
    <a className={`btn ${typeClass} text-lg rounded-pill`} href={href} role="button">
      {text}
    </a>
  );
}

export default Button;
