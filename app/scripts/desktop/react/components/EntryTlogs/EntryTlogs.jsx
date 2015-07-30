import React, { PropTypes } from 'react';
import EntryTlog from '../Entry/EntryTlog/EntryTlog';
import InfiniteScroll from '../common/infiniteScroll/index';

export default class EntryTlogs {
  static propTypes = {
    entries: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    canLoad: PropTypes.bool.isRequired,
    onDelete: PropTypes.func.isRequired,
    onLoadMoreEntries: PropTypes.func.isRequired
  }
  render() {
    let entryList = this.props.entries.map((item) => (
      <EntryTlog
        key={item.entry.id}
        entry={item.entry}
        commentator={item.commentator}
        moderation={item.moderation}
        onDelete={this.props.onDelete}
      />
    ));

    return (
      <InfiniteScroll
        loading={this.props.loading}
        canLoad={this.props.canLoad}
        onLoad={this.props.onLoadMoreEntries}
      >
        <section className="posts">{entryList}</section>
      </InfiniteScroll>
    );
  }
}