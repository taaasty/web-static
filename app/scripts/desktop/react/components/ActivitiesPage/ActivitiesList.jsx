import React, { PropTypes } from 'react';
import InfiniteScroll from '../common/InfiniteScroll';

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
      {entries.map((item) => {
        return (
          <div>
            {item}
          </div>
        );
      }).valueSeq()}
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
