import FeedActionCreators from '../../actions/Feed';
import FeedBricks from './FeedBricks';

let AnonymousFeedBricks = React.createClass({
  propTypes: {
    loadLimit: React.PropTypes.number,
    entries: React.PropTypes.array
  },

  getDefaultProps() {
    return {
      entries: [],
      loadLimit: 50
    };
  },

  getInitialState() {
    return {
      entries: this.props.entries,
      loading: false,
      everythingLoaded: false
    };
  },

  render() {
    return (
      <FeedBricks
          entries={this.state.entries}
          loading={this.state.loading}
          canLoad={!this.state.loading && !this.state.everythingLoaded}
          onLoadMoreEntries={this.loadMoreEntries} />
    );
  },

  loadMoreEntries() {
    let sinceEntryID;

    if (this.state.entries.length) {
      sinceEntryID = this.state.entries[this.state.entries.length - 1].id;
    }

    this.setState({loading: true});

    FeedActionCreators.loadAnonymousEntries(sinceEntryID, this.props.loadLimit)
      .then((response) => {
        if (this.isMounted()) {
          this.setState({
            entries: this.state.entries.concat(response.entries),
            everythingLoaded: response.entries.length == 0
          });
        }
      })
      .always(() => {
        if (this.isMounted()) this.setState({loading: false});
      });
  }
});

export default AnonymousFeedBricks;