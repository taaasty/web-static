import React, { Component, PropTypes } from 'react';
import EntryBricks from './EntryBricks';

class EntryBricksContainer extends Component {
  loadMoreEntries() {
    this.props.TlogEntriesActions.appendTlogEntries();
  }
  render() {
    const { tlog: { data: { author } },
            tlogEntries: { isFetching, data: { items, has_more } } } = this.props;

    return (
      <EntryBricks
        canLoad={!isFetching && has_more}
        entries={items}
        host_tlog_id={author.id}
        loading={isFetching}
        onLoadMoreEntries={this.loadMoreEntries.bind(this)}
      >
        {children}
      </EntryBricks>
    );
  }
}

EntryBricksContainer.propTypes = {
  TlogEntriesActions: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  tlog: PropTypes.object.isRequired,
  tlogEntries: PropTypes.shape({
    data: PropTypes.shape({
      items: PropTypes.array.isRequired,
      has_more: PropTypes.bool,
      next_since_entry_id: PropTypes.number,
    }).isRequired,
    isFetching: PropTypes.bool,
  }).isRequired,
};

export default EntryBricksContainer;
