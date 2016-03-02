/*global i18n */
import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router';
import { navFilters } from '../../actions/FlowsActions';

function FlowsNav({ active }) {
  return (
    <nav className="filter-nav">
      <ul className="filter-nav__list">
        {navFilters.map((section, idx) => (
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
};

export default FlowsNav;
