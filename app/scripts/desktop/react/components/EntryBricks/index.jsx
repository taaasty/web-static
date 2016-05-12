import React, { Component, PropTypes } from 'react';
import EntryBricks from './EntryBricks';

class EntryBricksContainer extends Component {
  render() {
    const { children, entries: { isFetching, data: { items, hasMore } },
            hostTlogId, loadMoreEntries } = this.props;

    return (
      <EntryBricks
        canLoad={!isFetching && !!hasMore}
        entries={items}
        hostTlogId={hostTlogId}
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
      hasMore: PropTypes.bool,
    }).isRequired,
    isFetching: PropTypes.bool,
  }).isRequired,
  hostTlogId: PropTypes.number,
  loadMoreEntries: PropTypes.func.isRequired,
};

export default EntryBricksContainer;
