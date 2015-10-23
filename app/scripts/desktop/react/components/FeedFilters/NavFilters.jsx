import React, { PropTypes } from 'react';
import classNames from 'classnames';

class NavFilters {
  render() {
    const { active, items } = this.props.navFilters;

    return (
      <nav className="filter-nav">
        <ul className="filter-nav__list">
          {items.map(({href, title}, idx) =>
             <li className={classNames('filter-nav__item', { 'state--active': idx === active })}>
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
