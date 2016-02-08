import React, { Component, PropTypes } from 'react';
import EntryTlogs from './EntryTlogs';

class EntryTlogsContainer extends Component {
  loadMoreEntries() {
    this.props.TlogEntriesActions.appendTlogEntries();
  }
  deleteEntry(entryId) {
    this.props.TlogEntriesActions.deleteEntry(entryId);
    this.props.CalendarActions.getCalendar(this.props.tlog.data.author.id, true);
  }
  render() {
    const { currentUser, tlog: { data: { author } },
            tlogEntries: { isFetching, data: { items, has_more } } } = this.props;

    return (
      <EntryTlogs
        canLoad={!isFetching && has_more}
        currentUser={currentUser.data}
        entries={items}
        host_tlog_id={author.id}
        loading={isFetching}
        onDelete={this.deleteEntry.bind(this)}
        onLoadMoreEntries={this.loadMoreEntries.bind(this)}
      />
    );
  }
}

EntryTlogsContainer.propTypes = {
  CalendarActions: PropTypes.object.isRequired,
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

export default EntryTlogsContainer;
