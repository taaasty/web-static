import React, { Component, PropTypes } from 'react';
import EntryTlogs from './EntryTlogs';

class EntryTlogsContainer extends Component {
  render() {
    const { entries: { isFetching, data: { items, hasMore } },
            handleDeleteEntry, hostTlogId, isFeed, loadMoreEntries } = this.props;

    return (
      <EntryTlogs
        canLoad={!isFetching && !!hasMore}
        entries={items}
        hostTlogId={hostTlogId}
        isFeed={isFeed}
        loading={isFetching}
        onDelete={handleDeleteEntry}
        onLoadMoreEntries={loadMoreEntries}
      />
    );
  }
}

EntryTlogsContainer.propTypes = {
  entries: PropTypes.shape({
    data: PropTypes.shape({
      items: PropTypes.array.isRequired,
      hasMore: PropTypes.bool,
    }).isRequired,
    isFetching: PropTypes.bool,
  }).isRequired,
  handleDeleteEntry: PropTypes.func,
  hostTlogId: PropTypes.number,
  isFeed: PropTypes.bool,
  loadMoreEntries: PropTypes.func,
};

export default EntryTlogsContainer;
