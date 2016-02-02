import React, { PropTypes } from 'react';
import classNames from 'classnames';

function NavFilters({ navFilters: { active, items } }) {
  return (
    <nav className="filter-nav">
      <ul className="filter-nav__list">
        {items.map(({ href, title }, idx) =>
           <li className={classNames('filter-nav__item', { 'state--active': idx === active })} key={idx}>
             <a
               className="filter-nav__link"
               href={href}
               title={title}
             >
               {title}
             </a>
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
