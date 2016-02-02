import React, { Component, PropTypes } from 'react';
import EntriesStore from '../../stores/EntriesStore';
import EntriesActions from '../../actions/EntriesActions';
import connectToStores from '../../../../shared/react/components/higherOrder/connectToStores';
import EntryBricks from './EntryBricks';

class EntryBricksContainer extends Component {
  componentDidMount() {
    EntriesActions.init(this.props);
  }
  loadMoreEntries() {
    EntriesActions.loadMoreEntries();
  }
  render() {
    const { children, entries, hasMore, host_tlog_id, isLoading } = this.props;

    return (
      <EntryBricks
        canLoad={!isLoading && hasMore}
        entries={entries}
        host_tlog_id={host_tlog_id}
        loading={isLoading}
        onLoadMoreEntries={this.loadMoreEntries}
      >
        {children}
      </EntryBricks>
    );
  }
}

EntryBricksContainer.propTypes = {
  entries_info: PropTypes.shape({
    items: PropTypes.array.isRequired,
    limit: PropTypes.number.isRequired,
    has_more: PropTypes.bool,
    next_page: PropTypes.number,
    next_since_entry_id: PropTypes.number,
  }).isRequired,
  host_tlog_id: PropTypes.number,
  loadUrl: PropTypes.string,
  nextPageFieldName: PropTypes.oneOf(['next_page', 'next_since_entry_id']).isRequired,
  nextPageParamName: PropTypes.oneOf(['page', 'since_entry_id']).isRequired,
};

export default connectToStores(
  EntryBricksContainer,
  [ EntriesStore ],
  () => ({
    entries: EntriesStore.getEntries(),
    hasMore: EntriesStore.hasMore(),
    isLoading: EntriesStore.isLoading(),
  })
);
