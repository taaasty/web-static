/*global i18n */
import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router';
import uri from 'urijs';
import { pure } from 'recompose';

function NavFilters({ navFiltersItems, navFiltersActive }) {
  const items = navFiltersItems
    .map(({ href, filterTitle }) => ({ href, title: i18n.t(filterTitle) }));

  return (
    <nav className="filter-nav">
      <ul className="filter-nav__list">
        {items.map(({ href, title }, idx) =>
          <li className={classNames('filter-nav__item', { 'state--active': idx === navFiltersActive })} key={idx}>
            <Link
              className="filter-nav__link"
              title={title}
              to={{ pathname: uri(href).path(), query: uri(href).query(true) }}
            >
              {title}
            </Link>
          </li>)
        }
      </ul>
    </nav>
  );
}

NavFilters.propTypes = {
  navFiltersActive: PropTypes.number,
  navFiltersItems: PropTypes.array.isRequired,
};

export default pure(NavFilters);
