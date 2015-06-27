import React, { Component, PropTypes } from 'react';
import EntryActionCreators from '../../actions/Entry';
import EntryTlogs from './EntryTlogs';

export default class EntryTlogsContainer extends Component {
  static propTypes = {
    entries_info: PropTypes.shape({
      items: PropTypes.array.isRequired,
      limit: PropTypes.number.isRequired,
      has_more: PropTypes.bool.isRequired,
      next_since_entry_id: PropTypes.number
    }).isRequired,
    loadUrl: PropTypes.string.isRequired
  }
  state = {
    entries: this.props.entries_info.items,
    hasMore: this.props.entries_info.has_more,
    sinceEntryID: this.props.entries_info.next_since_entry_id,
    loading: false
  }
  render() {
    return (
      <EntryTlogs
          entries={this.state.entries}
          loading={this.state.loading}
          canLoad={!this.state.loading && this.state.hasMore}
          onDelete={::this.delete}
          onLoadMoreEntries={::this.loadMoreEntries} />
    );
  }
  loadMoreEntries() {
    this.setState({loading: true});

    let { loadUrl, entries_info: { limit } } = this.props;
    let { sinceEntryID } = this.state;

    EntryActionCreators.load(loadUrl, sinceEntryID, limit)
      .then((entriesInfo) => {
        // Обрабатываем случай, когда передан левый урл. Если в ответе нет нужных
        // нам полей, просто прекращаем дальнейшую загрузку
        if (entriesInfo.has_more != null && entriesInfo.next_since_entry_id != null) {
          this.setState({
            entries: this.state.entries.concat(entriesInfo.items),
            hasMore: entriesInfo.has_more,
            sinceEntryID: entriesInfo.next_since_entry_id
          });
        } else {
          this.setState({hasMore: false});
        }
      })
      .fail(() => {
        this.setState({hasMore: false})
      })
      .always(() => {
        this.setState({loading: false});
      });
  }
  delete(entryID) {
    const newEntries = this.state.entries.filter((entry) => entry.entry.id !== entryID);
    this.setState({ entries: newEntries });
  }
}