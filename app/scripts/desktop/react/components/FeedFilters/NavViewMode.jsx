/*global i18n */
import React, { PropTypes } from 'react';
import classNames from 'classnames';

class NavViewMode {
  render() {
    const { viewMode } = this.props;
    const feedClasses = classNames({
      'nav-view-mode__item': true,
      'state--active': viewMode === 'feed',
    });
    const tlogClasses = classNames({
      'nav-view-mode__item': true,
      'state--active': viewMode === 'tlog',
    });

    return (
      <nav className="nav-view-mode">
        <ul className="nav-view-mode__list">
          <li className={feedClasses}>
            <a
              className="nav-view-mode__link"
              href={'?style=feed'}
              title={i18n.t('filters.show_feed')}
            >
              <i className="icon icon--tiles" />
            </a>
          </li>
          <li className={tlogClasses}>
            <a
              className="nav-view-mode__link"
              href={'?style=tlog'}
              title={i18n.t('filters.view_tlog')}
            >
              <i className="icon icon--menu" />
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}

NavViewMode.propTypes = {
  viewMode: PropTypes.oneOf(['tlog', 'feed']).isRequired,
};

export default NavViewMode;
