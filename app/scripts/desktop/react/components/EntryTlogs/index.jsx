import React, { Component, PropTypes } from 'react';
import EntryTlogs from './EntryTlogs';

class EntryTlogsContainer extends Component {
  render() {
    const { currentUser, entities: { comment, entry, entryCollItem, tlog },
            entries: { isFetching, data: { items, hasMore } },
            handleDeleteEntry, hostTlogId, isFeed, loadMoreEntries } = this.props;

    function tlogItem(id) {
      if (!id) {
        return void 0;
      }

      const t = tlog[id];
      const author = tlog[t.author];

      return Object.assign({}, t, { author });
    }

    const entryItems = items.map((entryCollId) => {
      const { commentator, entry: entryId } = entryCollItem[entryCollId];
      const entryItem = entry[entryId];

      return {
        commentator: tlogItem(commentator),
        entry: Object.assign({}, entryItem, {
          author: tlog[entryItem.author],
          commentator: tlogItem(entryItem.commentator),
          tlog: tlogItem(entryItem.tlog),
          comments: entryItem.comments.map((commentId) => {
            const c = comment[commentId];

            return Object.assign({}, c, { user: tlogItem(c.user) });
          }),
        }),
      };
    });

    return (
      <EntryTlogs
        canLoad={!isFetching && !!hasMore}
        currentUser={currentUser}
        entries={entryItems}
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
  currentUser: PropTypes.object.isRequired,
  entities: PropTypes.object.isRequired,
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
  isFeed: PropTypes.bool,
  loadMoreEntries: PropTypes.func,
};

export default EntryTlogsContainer;
