import cx from 'classnames';

export interface TagButtonProps {
  filter: string;
  text: string;
  active?: boolean;
}

function TagButton(props: Partial<TagButtonProps>) {
  const { filter, text, active } = props;

  const classTag = cx({
    'btn btn-status': true,
    'rounded-pill': true,
    'text-sm me-3': true,
    'btn-active': active,
  });

  return (
    <a data-filter={filter} href="#" className={classTag}>
      {text}
    </a>
  );
}

export default TagButton;
