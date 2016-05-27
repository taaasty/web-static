import React, { PropTypes } from 'react';
import classNames from 'classnames';

function MenuItem({ isActive, onClick, title, totalCount }) {
  const menuItemClasses = classNames({
    'tabs-nav__link': true,
    'state--active': isActive,
  });

  return (
    <li className="tabs-nav__item">
      <a
        className={menuItemClasses}
        onClick={onClick}
        title={title}
      >
        {title}
        <span className="tabs-nav__count">
          {totalCount}
        </span>
      </a>
    </li>
  );
}

MenuItem.displayName = 'PersonsPopupMenuItem';

MenuItem.propTypes = {
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  totalCount: PropTypes.number,
};

export default MenuItem;
