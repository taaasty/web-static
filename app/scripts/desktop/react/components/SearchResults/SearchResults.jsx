import SearchActions from '../../actions/search';
import SearchResultsTlog from './SearchResultsTlog';
import SearchResultsFeed from './SearchResultsFeed';
import URI from 'urijs';

let SearchResults = React.createClass({
  propTypes: {
    q: React.PropTypes.string.isRequired,
    style: React.PropTypes.string.isRequired,
    searchUrl: React.PropTypes.string
  },

  getDefaultProps() {
    return {
      searchUrl: window.location.href
      // searchUrl: 'http://taaasty.com/live' 
    };
  },

  getInitialState() {
    return {
      html: '',
      page: 1,
      loading: false,
      everythingLoaded: false
    }
  },

  componentDidMount() {
    this.loadPage(this.state.page);
  },

  render() {
    switch(this.props.style) {
      case 'tlog':
        return (
          <SearchResultsTlog
              html={ this.state.html }
              loading={ this.state.loading }
              canLoad={ !this.state.loading && !this.state.everythingLoaded }
              onLoadNextPage={ this.loadNextPage } />
        );
        break;
      case 'feed':
        return (
          <SearchResultsFeed
              html={ this.state.html }
              loading={ this.state.loading }
              canLoad={ !this.state.loading && !this.state.everythingLoaded }
              onLoadNextPage={ this.loadNextPage } />
        );
        break;
      default:
        return null;
    }
  },

  loadPage(page) {
    var { q, searchUrl, style } = this.props;

    if (this.state.loading) { return; }

    this.setState({loading: true});

    var searchUrlWithParams = URI(searchUrl).setQuery({
      q: q,
      page: page,
      style: style
    });

    SearchActions.loadNextPage(searchUrlWithParams)
      .then((html) => {
        html = html.trim()

        if (html === '' && this.state.html === '') {
          this.setState({ html: i18n.t('search_results_empty') });
        }

        if (html === '') {
          this.setState({everythingLoaded: true});
          return;
        }

        var newHtml = this.state.html ? this.state.html + html : html;
        this.setState({
          html: newHtml,
          page: page
        });

        // Mount new components from html
        $(document).trigger('page:change');
      })
      .fail(() => this.setState({everythingLoaded: true}))
      .always(() => this.setState({loading: false}));
  },
  
  loadNextPage() {
    var nextPage = this.state.page + 1;
    this.loadPage(nextPage);
  }
})

export default SearchResults;
