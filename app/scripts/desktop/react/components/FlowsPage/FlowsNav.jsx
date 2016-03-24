/*global i18n */
import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router';

function FlowsNav({ active, filters }) {
  return (
    <nav className="filter-nav">
      <ul className="filter-nav__list">
        {filters.map((section, idx) => (
          <li className={classNames('filter-nav__item', { 'state--active': active === idx })} key={`nav-${idx}`}>
            <Link
              className="filter-nav__link"
              title={i18n.t(`nav_filters.flows.${section}`)}
              to={{ pathname: '/flows', query: { flows_filter: section } }}
            >
              {i18n.t(`nav_filters.flows.${section}`)}
            </Link>
          </li>
          ))
        }
      </ul>
    </nav>
  );
}

FlowsNav.displayName = 'FlowsNav';

FlowsNav.propTypes = {
  active: PropTypes.number.isRequired,
  filters: PropTypes.bool.isRequired,
};

export default FlowsNav;
