import React, { PropTypes } from 'react';
import classNames from 'classnames';

function DropdownItem({ active, item, onClick, title }) {
  function handleClick(ev) {
    ev.preventDefault();
    onClick(item);
  }

  const itemClasses = classNames('person__dropdown-item', {
    'state--active': active,
  });

  return (
    <a className={itemClasses} onClick={handleClick}>
      {title}
    </a>
  );
}

DropdownItem.propTypes = {
  active: PropTypes.bool,
  item: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  title: PropTypes.string.isRequired,
};

export default DropdownItem;
