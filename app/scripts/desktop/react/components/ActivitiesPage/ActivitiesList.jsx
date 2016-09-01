import React, { PropTypes } from 'react';
import InfiniteScroll from '../common/InfiniteScroll';
import ActivityItem from './ActivityItem';

function ActivitiesList(props) {
  const {
    entries,
    hasMore,
    isFetching,
    loadMoreEntries,
  } = props;

  return (
    <InfiniteScroll
      canLoad={hasMore}
      loading={isFetching}
      onLoad={loadMoreEntries}
    >
      {entries.count() > 0
        ? (
        entries.map((item, key) => (
          <ActivityItem
            item={item}
            key={`activity-item-${key}`}
          />
        )).valueSeq()
        )
        : (
          <noscript />
        )
      }
    </InfiniteScroll>
  );
}

ActivitiesList.propTypes = {
  entries: PropTypes.object.isRequired,
  hasMore: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  loadMoreEntries: PropTypes.func.isRequired,
};

export default ActivitiesList;
