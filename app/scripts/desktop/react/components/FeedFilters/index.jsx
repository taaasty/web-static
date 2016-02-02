import React, { PropTypes } from 'react';
import classNames from 'classnames';
import NavFilters from './NavFilters';
import NavViewMode from './NavViewMode';

function FeedFilters(props) {
  const { children, navFilters, navViewMode, viewMode } = props;
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
      {navViewMode && <NavViewMode viewMode={viewMode} />}
    </div>
  );
}

FeedFilters.propTypes = {
  navFilters: PropTypes.object.isRequired,
  navViewMode: PropTypes.bool.isRequired,
  viewMode: PropTypes.oneOf(['tlog', 'feed']).isRequired,
};

export default FeedFilters;
