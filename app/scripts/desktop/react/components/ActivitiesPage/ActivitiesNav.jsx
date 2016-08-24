/*global i18n */
import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router';

function ActivitiesNav(props) {
  const {
    active,
    filters,
  } = props;

  return (
    <div className="navs-line navs-left">
      <nav className="filter-nav">
        <ul className="filter-nav__list">
          {filters.map(({ href, filterTitle }, idx) => (
            <li className={classNames('filter-nav__item', { 'state--active': active === idx })} key={`nav-${idx}`}>
              <Link
                className="filter-nav__link"
                title={i18n.t(filterTitle)}
                to={href}
              >
                {i18n.t(filterTitle)}
              </Link>
            </li>
            ))
          }
        </ul>
      </nav>
    </div>
  );
}

ActivitiesNav.propTypes = {
  active: PropTypes.number.isRequired,
  filters: PropTypes.array.isRequired,
};

export default ActivitiesNav;
