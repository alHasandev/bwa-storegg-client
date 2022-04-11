interface DetailRowProps {
  label: string;
  value: string;
  highlight?: boolean;
}

function DetailRow(props: Partial<DetailRowProps>) {
  const { label, value, highlight } = props;

  return (
    <p className="text-lg color-palette-1 mb-20">
      {label}
      <span
        className={`purchase-details ${highlight ? 'color-palette-4' : ''}`}
      >
        {value}
      </span>
    </p>
  );
}

export default DetailRow;
