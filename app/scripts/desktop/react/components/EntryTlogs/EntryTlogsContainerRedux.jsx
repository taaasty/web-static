import React, { Component, PropTypes } from 'react';
import EntryTlogs from './EntryTlogs';

class EntryTlogsContainer extends Component {
  render() {
    const { currentUser, entries: { isFetching, data: { items, has_more } },
            handleDeleteEntry, hostTlogId, loadMoreEntries } = this.props;

    return (
      <EntryTlogs
        canLoad={!isFetching && has_more}
        currentUser={currentUser.data}
        entries={items}
        host_tlog_id={hostTlogId}
        loading={isFetching}
        onDelete={handleDeleteEntry}
        onLoadMoreEntries={loadMoreEntries}
      />
    );
  }
}

EntryTlogsContainer.propTypes = {
  currentUser: PropTypes.object.isRequired,
  entries: PropTypes.shape({
    data: PropTypes.shape({
      items: PropTypes.array.isRequired,
      has_more: PropTypes.bool,
      next_since_entry_id: PropTypes.number,
    }).isRequired,
    isFetching: PropTypes.bool,
  }).isRequired,
  handleDeleteEntry: PropTypes.func,
  hostTlogId: PropTypes.number,
  loadMoreEntries: PropTypes.func,
};

export default EntryTlogsContainer;
