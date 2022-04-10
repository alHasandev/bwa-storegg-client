/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-vars */
import cx from 'classnames';

export interface TagButtonProps {
  filter: string;
  text: string;
  onClickTag: (tagFilter: string) => void;
  active?: boolean;
}

function TagButton(props: TagButtonProps) {
  const { filter, text, onClickTag, active } = props;

  const classTag = cx({
    'btn btn-status': true,
    'rounded-pill': true,
    'text-sm me-3': true,
    'btn-active': active,
  });

  return (
    <a
      data-filter={filter}
      href={`#${filter}`}
      className={classTag}
      onClick={() => onClickTag(filter)}
    >
      {text}
    </a>
  );
}

export default TagButton;
