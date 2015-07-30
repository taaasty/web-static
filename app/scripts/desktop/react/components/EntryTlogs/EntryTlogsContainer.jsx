import React, { Component, PropTypes } from 'react';
import EntryActionCreators from '../../actions/Entry';
import EntryTlogs from './EntryTlogs';

export default class EntryTlogsContainer extends Component {
  static propTypes = {
    entries_info: PropTypes.shape({
      items: PropTypes.array.isRequired,
      limit: PropTypes.number.isRequired,
      has_more: PropTypes.bool,
      next_page: PropTypes.number,
      next_since_entry_id: PropTypes.number
    }).isRequired,
    loadUrl: PropTypes.string.isRequired,
    nextPageFieldName: PropTypes.oneOf(['next_page', 'next_since_entry_id']).isRequired,
    nextPageParamName: PropTypes.oneOf(['page', 'since_entry_id']).isRequired
  }
  state = {
    entries: this.props.entries_info.items,
    hasMore: this.props.entries_info.has_more,
    nextPage: this.props.entries_info[this.props.nextPageFieldName],
    isLoading: false
  }
  render() {
    return (
      <EntryTlogs
        entries={this.state.entries}
        loading={this.state.isLoading}
        canLoad={!this.state.isLoading && this.state.hasMore}
        onDelete={this.deleteEntry.bind(this)}
        onLoadMoreEntries={this.loadMoreEntries.bind(this)}
      />
    );
  }
  loadMoreEntries() {
    const data = {
      [this.props.nextPageParamName]: this.state.nextPage,
      limit: this.props.entries_info.limit
    };

    this.setState({ isLoading: true });
    EntryActionCreators.load(this.props.loadUrl, data)
      .then((entriesInfo) => {
        // Обрабатываем случай, когда передан левый урл. Если в ответе нет нужных
        // нам полей, просто прекращаем дальнейшую загрузку
        if (entriesInfo.has_more != null && entriesInfo[this.props.nextPageFieldName] != null) {
          this.setState({
            entries: this.state.entries.concat(entriesInfo.items),
            hasMore: entriesInfo.has_more,
            nextPage: entriesInfo[this.props.nextPageFieldName]
          });
        } else {
          this.setState({ hasMore: false });
        }
      })
      .fail(() => this.setState({ hasMore: false }))
      .always(() => this.setState({ isLoading: false }))
  }
  deleteEntry(entryID) {
    const newEntries = this.state.entries.filter((entry) => entry.entry.id !== entryID);
    this.setState({ entries: newEntries });
  }
}