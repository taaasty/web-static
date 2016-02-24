/*global i18n */
import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router';
import { VIEW_STYLE_TLOG, VIEW_STYLE_BRICKS } from '../../constants/ViewStyleConstants';

function NavViewMode({ location, viewMode }) {
  const feedClasses = classNames({
    'nav-view-mode__item': true,
    'state--active': viewMode === VIEW_STYLE_BRICKS,
  });
  const tlogClasses = classNames({
    'nav-view-mode__item': true,
    'state--active': viewMode === VIEW_STYLE_TLOG,
  });

  return (
    <nav className="nav-view-mode">
      <ul className="nav-view-mode__list">
        <li className={feedClasses}>
          <Link
            className="nav-view-mode__link"
            title={i18n.t('filters.show_feed')}
            to={{ pathname: location.pathname, query: { style: VIEW_STYLE_BRICKS } }}
          >
            <i className="icon icon--tiles" />
          </Link>
        </li>
        <li className={tlogClasses}>
          <Link
            className="nav-view-mode__link"
            title={i18n.t('filters.view_tlog')}
            to={{ pathname: location.pathname, query: { style: VIEW_STYLE_TLOG } }}
          >
            <i className="icon icon--menu" />
          </Link>
        </li>
      </ul>
    </nav>
  );
}

NavViewMode.propTypes = {
  location: PropTypes.object.isRequired,
  viewMode: PropTypes.oneOf([ 'tlog', 'feed' ]).isRequired,
};

export default NavViewMode;
