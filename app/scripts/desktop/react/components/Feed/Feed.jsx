import EntryActionCreators from '../../actions/Entry';
import FeedBricks from './FeedBricks';
import FeedTlog from './FeedTlog';
import URI from 'urijs';

let Feed = React.createClass({
  propTypes: {
    feedUrl: React.PropTypes.string,
    style: React.PropTypes.string.isRequired,
  },

  getDefaultProps() {
    return {
      feedUrl: window.location.href
      // feedUrl: 'http://taaasty.com/best'
    };
  },

  getInitialState() {
    return {
      html: '',
      loading: false,
      everythingLoaded: false
    };
  },

  render() {
    switch(this.props.style) {
      case 'tlog':
        return (
          <FeedTlog
              html={this.state.html}
              loading={this.state.loading}
              canLoad={!this.state.loading && !this.state.everythingLoaded}
              onLoadNextEntries={this.loadNextEntries} />
        );
        break;
      case 'feed':
        return (
          <FeedBricks
              html={this.state.html}
              loading={this.state.loading}
              canLoad={!this.state.loading && !this.state.everythingLoaded}
              onLoadNextEntries={this.loadNextEntries} />
        );
        break;
      default:
        return null;
    }
  },

  loadEntries(entryID) {
    let { feedUrl, style } = this.props;
    let feedUrlWithParams = URI(feedUrl).setQuery({style, since_entry_id: entryID});

    if (this.state.loading) { return; }
    this.setState({loading: true});

    EntryActionCreators.loadHtml(feedUrlWithParams)
      .then((html) => {
        html = html.trim();

        if (html === '') {
          this.setState({everythingLoaded: true});

          if (this.state.html === '') {
            this.setState({ html: i18n.t('search_results_empty') });
          }
          
          return;
        }

        let newHtml = this.state.html ? this.state.html + html : html;
        this.setState({html: newHtml});

        // Mount new components from html
        $(document).trigger('page:change');
      })
      .fail(() => this.setState({everythingLoaded: true}))
      .always(() => this.setState({loading: false}));
  },

  loadNextEntries(lastEntryID) {
    this.loadEntries(lastEntryID);
  }

});

export default Feed;
