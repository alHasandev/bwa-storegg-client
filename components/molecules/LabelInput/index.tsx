interface LabelInputProps {
  label: string;
  type: 'text' | 'number' | 'tel' | 'email' | 'password';
  id: string;
  name: string;
  placeholder: string;
}

function LabelInput(props: LabelInputProps) {
  const {
    label, type, id, name, placeholder, ...nativeProps
  } = props;

  return (
    <div className="pt-30">
      <label htmlFor={id} className="form-label text-lg fw-medium color-palette-1 mb-10">
        {label}
      </label>
      <input
        type={type}
        className="form-control rounded-pill text-lg"
        id={id}
        name={name}
        aria-describedby={name}
        placeholder={placeholder}
        {...nativeProps}
      />
    </div>
  );
}

export default LabelInput;
