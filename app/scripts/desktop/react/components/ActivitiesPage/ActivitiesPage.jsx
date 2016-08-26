/*global i18n */
import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import ActivitiesList from './ActivitiesList';
import ActivitiesNav from './ActivitiesNav';

function ActivitiesPage(props) {
  const {
    entries,
    loadMoreEntries,
    hasMore,
    isFetching,
    navFilterActive,
    navFilterItems,
  } = props;

  return (
    <div className="page__inner">
      <Helmet title={i18n.t(navFilterItems[navFilterActive].filterTitle)} />
      <div className="page__paper">
        <div className="page-body">
          <div className="layout-outer">
            <ActivitiesNav
              active={navFilterActive}
              filters={navFilterItems}
            />
            <div className="content-area">
              <div className="content-area__bg" />
              <div className="content-area__inner">
                <ActivitiesList
                  entries={entries}
                  hasMore={hasMore}
                  isFetching={isFetching}
                  loadMoreEntries={loadMoreEntries}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ActivitiesPage.propTypes = {
  entries: PropTypes.object.isRequired,
  hasMore: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  loadMoreEntries: PropTypes.func.isRequired,
  navFilterActive: PropTypes.number.isRequired,
  navFilterItems: PropTypes.array.isRequired,
};

export default ActivitiesPage;
