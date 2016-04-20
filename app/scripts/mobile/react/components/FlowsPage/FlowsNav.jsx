/*global i18n */
import React, { PropTypes } from 'react';
import classNames from 'classnames';

const authNavs = [ 'popular', 'newest', 'my' ];
const unauthNavs = [ 'popular', 'newest' ];

function FlowsNav({ isLogged, sort }) {
  const navs = isLogged ? authNavs : unauthNavs;

  return (
    <div className="tabs">
      <ul className="tabs__list">
        {navs.map((nav) => {
           const isActive = nav === sort;
           const text = i18n.t(`flows.nav.${nav}`);

           return (
             <li className={classNames('tabs__item', { '__active': isActive })} key={`nav-${nav}`}>
               {isActive
                ?  (
                  <span className="tabs__link" title={text}>
                    {text}
                  </span>
                )
                : (
                  <a
                    className="tabs__link"
                    href={Routes.flows_path(nav)}
                    title={text}
                  >
                    {text}
                  </a>
                )
               }
             </li>
           );
         })
        }
      </ul>
    </div>
  );
}

FlowsNav.displayName = 'FlowsNav';

FlowsNav.propTypes = {
  isLogged: PropTypes.bool.isRequired,
  sort: PropTypes.string.isRequired,
};

export default FlowsNav;
