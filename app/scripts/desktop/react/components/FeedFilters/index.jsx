import React, { PropTypes } from 'react';
import classNames from 'classnames';
import NavFilters from './NavFilters';
import NavViewMode from './NavViewMode';
import { VIEW_STYLE_TLOG, VIEW_STYLE_BRICKS } from '../../constants/ViewStyleConstants';

function FeedFilters(props) {
  const { children, location, navFilters, navViewMode, viewMode } = props;
  const justify = !!(navFilters.items.length && navViewMode);
  const navClasses = classNames({
    'navs-line': true,
    'navs-centered': !justify,
    'navs-justify': justify,
  });

  return (
    <div className={navClasses}>
      {navFilters.items.length > 0 && <NavFilters navFilters={navFilters} />}
      {' '}
      {justify && <div>{children}</div>}
      {navViewMode && <NavViewMode location={location} viewMode={viewMode} />}
    </div>
  );
}

FeedFilters.propTypes = {
  location: PropTypes.object,
  navFilters: PropTypes.object.isRequired,
  navViewMode: PropTypes.bool.isRequired,
  viewMode: PropTypes.oneOf([
    VIEW_STYLE_TLOG,
    VIEW_STYLE_BRICKS,
  ]).isRequired,
};

FeedFilters.defaultProps = {
  navFilters: {
    items: [],
  },
  navViewMode: false,
};

export default FeedFilters;
