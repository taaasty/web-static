import React, { PropTypes } from 'react';
import EntryTlog from '../Entry/EntryTlog/EntryTlog';
import InfiniteScroll from '../common/infiniteScroll/index';

export default class EntryTlogs {
  static propTypes = {
    entries: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    canLoad: PropTypes.bool.isRequired,
    onDelete: PropTypes.func.isRequired,
    onLoadMoreEntries: PropTypes.func.isRequired,
  }
  render() {
    const { canLoad, entries, loading, onDelete, onLoadMoreEntries } = this.props;

    let entryList = entries.map((item) => (
      <EntryTlog
        host_tlog_id={item.host_tlog_id}
        key={item.entry.id}
        entry={item.entry}
        commentator={item.commentator}
        moderation={item.moderation}
        onDelete={onDelete}
      />
    ));

    return (
      <InfiniteScroll
        loading={loading}
        canLoad={canLoad}
        onLoad={onLoadMoreEntries}
      >
        <section className="posts">{entryList}</section>
      </InfiniteScroll>
    );
  }
}
