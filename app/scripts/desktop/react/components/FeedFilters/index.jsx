import React, { PropTypes } from 'react';
import classNames from 'classnames';
import NavFilters from './NavFilters';
import NavViewMode from './NavViewMode';
import { VIEW_STYLE_TLOG, VIEW_STYLE_BRICKS } from '../../constants/ViewStyleConstants';
import { onlyUpdateForKeys } from 'recompose';

function FeedFilters(props) {
  const {
    children,
    location,
    navFiltersActive,
    navFiltersItems,
    navViewMode,
    viewMode,
  } = props;
  const justify = !!(navFiltersItems.length && navViewMode);
  const navClasses = classNames({
    'navs-line': true,
    'navs-centered': !justify,
    'navs-justify': justify,
  });

  return (
    <div className={navClasses}>
      {navFiltersItems.length > 0 && (
        <NavFilters
          navFiltersActive={navFiltersActive}
          navFiltersItems={navFiltersItems}
        />
      )}
      {' '}
      {justify && <div>{children}</div>}
      {navViewMode && <NavViewMode location={location} viewMode={viewMode} />}
    </div>
  );
}

FeedFilters.propTypes = {
  location: PropTypes.object,
  navFiltersActive: PropTypes.number,
  navFiltersItems: PropTypes.array.isRequired,
  navViewMode: PropTypes.bool.isRequired,
  viewMode: PropTypes.oneOf([
    VIEW_STYLE_TLOG,
    VIEW_STYLE_BRICKS,
  ]).isRequired,
};

FeedFilters.defaultProps = {
  navFiltersItems: [],
  navViewMode: false,
};

export default onlyUpdateForKeys([
  'location',
  'navFiltersActive',
  'navFiltersItems',
  'navViewMode',
  'viewMode',
  'children',
])(FeedFilters);
