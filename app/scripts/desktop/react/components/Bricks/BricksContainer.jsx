import EntryActionCreators from '../../actions/Entry';
import Bricks from './Bricks';

let BricksContainer = React.createClass({
  propTypes: {
    entries_info: React.PropTypes.shape({
      items: React.PropTypes.array.isRequired,
      has_more: React.PropTypes.bool.isRequired,
      next_since_entry_id: React.PropTypes.number.isRequired
    }).isRequired,
    url: React.PropTypes.string.isRequired,
    limit: React.PropTypes.number
  },

  getDefaultProps() {
    return {
      limit: 30
    };
  },

  getInitialState() {
    return {
      entries: this.props.entries_info.items,
      hasMore: this.props.entries_info.has_more,
      sinceEntryID: this.props.entries_info.next_since_entry_id,
      loading: false
    };
  },

  render() {
    return (
      <Bricks
          entries={this.state.entries}
          loading={this.state.loading}
          canLoad={!this.state.loading && this.state.hasMore}
          onLoadMoreEntries={this.loadMoreEntries} />
    );
  },

  loadMoreEntries() {
    this.setState({loading: true});

    let { url, limit } = this.props;
    let { sinceEntryID } = this.state;

    EntryActionCreators.load(url, sinceEntryID, limit)
      .then((entriesInfo) => {
        if (this.isMounted()) {
          this.setState({
            entries: this.state.entries.concat(entriesInfo.items),
            hasMore: entriesInfo.has_more,
            sinceEntryID: entriesInfo.next_since_entry_id
          });
        }
      })
      .always(() => {
        if (this.isMounted()) this.setState({loading: false});
      });
  }
});

export default BricksContainer;