/*global i18n */
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';

function PeopleNav({ active, sorts }) {
  return (
    <nav className="filter-nav">
      <ul className="filter-nav__list">
        {sorts.map((sort, idx) => (
           <li
             className={classNames('filter-nav__item', { 'state--active': idx === active })}
             key={`nav-people-${idx}`}
           >
             <Link
               className="filter-nav__link"
               title={i18n.t(`people.${sort}.nav`)}
               to={sort === 'posts' ? '/people' : `/people/${sort}`}
             >
               {i18n.t(`people.${sort}.nav`)}
             </Link>
           </li>
         ))}
      </ul>
    </nav>
  );
}

PeopleNav.displayName = 'PeopleNav';

PeopleNav.propTypes = {
  active: PropTypes.number.isRequired,
  sorts: PropTypes.array.isRequired,
};

export default PeopleNav;
