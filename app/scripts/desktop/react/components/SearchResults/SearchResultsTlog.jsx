import InfiniteScroll from '../common/infiniteScroll/index';

let SearchResultsTlog = React.createClass({
  propTypes: {
    html: React.PropTypes.string.isRequired,
    loading: React.PropTypes.bool.isRequired,
    canLoad: React.PropTypes.bool.isRequired,
    onLoadNextPage: React.PropTypes.func.isRequired
  },

  render() {
    return (
      <div className="content-area">
        <div className="content-area__bg" />
        <div className="content-area__inner">
          <InfiniteScroll
              loading={this.props.loading}
              canLoad={this.props.canLoad}
              onLoad={this.props.onLoadNextPage}>
            <section
                className="posts"
                dangerouslySetInnerHTML={{__html: this.props.html}} />
          </InfiniteScroll>
        </div>
      </div>
    )
  }
});

export default SearchResultsTlog;