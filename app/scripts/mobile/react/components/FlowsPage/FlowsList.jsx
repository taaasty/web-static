import React, { PropTypes } from 'react';

import FlowsNav from './FlowsNav';
import FlowsListItem from './FlowsListItem';
import FeedLoadMore from '../feed/loadMore';

function FlowsList({ flows, hasMore, isFetching, loadMore, sort }) {
  return (
    <div className="flows">
      <FlowsNav sort={sort} />
      {flows.map((flow, idx) => <FlowsListItem flow={flow} key={`flow-${idx}`} />)}
      {hasMore && <FeedLoadMore loading={isFetching} onClick={loadMore} />}
    </div>
  );
}

FlowsList.displayName = 'FlowsList';

FlowsList.propTypes = {
  flows: PropTypes.array.isRequired,
  hasMore: PropTypes.bool,
  isFetching: PropTypes.bool,
  loadMore: PropTypes.func.isRequired,
  sort: PropTypes.string.isRequired,
};

export default FlowsList;
