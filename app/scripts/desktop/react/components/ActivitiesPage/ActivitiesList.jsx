import React, { PropTypes } from 'react';
import InfiniteScroll from '../common/InfiniteScroll';
import ActivityItem from './ActivityItem';

function ActivitiesList(props) {
  const {
    entries,
    hasMore,
    isFetching,
    loadMoreEntries,
    users,
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
            user={users.get(key)}
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
  users: PropTypes.object.isRequired,
};

export default ActivitiesList;
