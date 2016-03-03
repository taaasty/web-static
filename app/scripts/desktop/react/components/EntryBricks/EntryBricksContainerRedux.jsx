import React, { Component, PropTypes } from 'react';
import EntryBricks from './EntryBricks';

class EntryBricksContainer extends Component {
  render() {
    const { children, entries: { isFetching, data: { items, has_more } },
            hostTlogId, isFeed, loadMoreEntries } = this.props;

    return (
      <EntryBricks
        canLoad={!isFetching && !!has_more}
        entries={items}
        host_tlog_id={hostTlogId}
        isFeed={isFeed}
        loading={isFetching}
        onLoadMoreEntries={loadMoreEntries}
      >
        {children}
      </EntryBricks>
    );
  }
}

EntryBricksContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]),
  entries: PropTypes.shape({
    data: PropTypes.shape({
      items: PropTypes.array.isRequired,
      has_more: PropTypes.bool,
      next_since_entry_id: PropTypes.number,
    }).isRequired,
    isFetching: PropTypes.bool,
  }).isRequired,
  hostTlogId: PropTypes.number,
  isFeed: PropTypes.bool,
  loadMoreEntries: PropTypes.func.isRequired,
};

export default EntryBricksContainer;
