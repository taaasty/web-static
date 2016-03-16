import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router';
import uri from 'urijs';

function NavFilters({ navFilters: { active, items } }) {
  return (
    <nav className="filter-nav">
      <ul className="filter-nav__list">
        {items.map(({ href, title }, idx) =>
           <li className={classNames('filter-nav__item', { 'state--active': idx === active })} key={idx}>
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
  navFilters: PropTypes.shape({
    active: PropTypes.number,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        href: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default NavFilters;
