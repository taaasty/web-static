import React, { PropTypes } from 'react';
import EntryTlog from '../Entry/EntryTlog/EntryTlog';
import InfiniteScroll from '../common/infiniteScroll/index';

export default class EntryTlogs {
  static propTypes = {
    entries: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    canLoad: PropTypes.bool.isRequired,
    infinite: PropTypes.bool,
    onDelete: PropTypes.func.isRequired,
    onLoadMoreEntries: PropTypes.func.isRequired
  }
  render() {
    let entryList = this.props.entries.map((item) => (
      <EntryTlog
          entry={item.entry}
          commentator={item.commentator}
          moderation={item.moderation}
          onDelete={this.props.onDelete}
          key={item.entry.id} />
    ));

    if (this.props.infinite) {
      return (
        <InfiniteScroll
            loading={this.props.loading}
            canLoad={this.props.canLoad}
            onLoad={this.props.onLoadMoreEntries}>
          <section className="posts">
            {entryList}
          </section>
        </InfiniteScroll>
      );
    } else {
      return (
        <section className="posts">
          {entryList}
        </section>
      );
    }
  }
}