/*global i18n */
import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router';
import { VIEW_STYLE_TLOG, VIEW_STYLE_BRICKS } from '../../constants/ViewStyleConstants';

function NavViewMode({ viewMode }) {
  const feedClasses = classNames({
    'nav-view-mode__item': true,
    'state--active': viewMode === VIEW_STYLE_BRICKS,
  });
  const tlogClasses = classNames({
    'nav-view-mode__item': true,
    'state--active': viewMode === VIEW_STYLE_TLOG,
  });

  return window.SPA
    ? <nav className="nav-view-mode">
        <ul className="nav-view-mode__list">
          <li className={feedClasses}>
            <Link
              className="nav-view-mode__link"
              title={i18n.t('filters.show_feed')}
              to={`?style=${VIEW_STYLE_BRICKS}`}
            >
              <i className="icon icon--tiles" />
            </Link>
          </li>
          <li className={tlogClasses}>
            <Link
              className="nav-view-mode__link"
              title={i18n.t('filters.view_tlog')}
              to={`?style=${VIEW_STYLE_TLOG}`}
            >
              <i className="icon icon--menu" />
            </Link>
          </li>
        </ul>
      </nav>
    : <nav className="nav-view-mode">
        <ul className="nav-view-mode__list">
          <li className={feedClasses}>
            <a
              className="nav-view-mode__link"
              href={`?style=${VIEW_STYLE_BRICKS}`}
              title={i18n.t('filters.show_feed')}
            >
              <i className="icon icon--tiles" />
            </a>
          </li>
          <li className={tlogClasses}>
            <a
              className="nav-view-mode__link"
              href={`?style=${VIEW_STYLE_TLOG}`}
              title={i18n.t('filters.view_tlog')}
            >
              <i className="icon icon--menu" />
            </a>
          </li>
        </ul>
      </nav>;
}

NavViewMode.propTypes = {
  viewMode: PropTypes.oneOf(['tlog', 'feed']).isRequired,
};

export default NavViewMode;
