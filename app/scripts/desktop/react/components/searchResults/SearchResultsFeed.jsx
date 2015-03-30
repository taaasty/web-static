import InfiniteScroll from '../common/infiniteScroll/index';

let SearchResultsFeed = React.createClass({
  propTypes: {
    html: React.PropTypes.string.isRequired,
    loading: React.PropTypes.bool.isRequired,
    canLoad: React.PropTypes.bool.isRequired,
    onLoadNextPage: React.PropTypes.func.isRequired
  },

  render() {
    return (
      <div className="bricks-wrapper">
        <InfiniteScroll
            loading={this.props.loading}
            canLoad={this.props.canLoad}
            onLoad={this.props.onLoadNextPage}
            onAfterLoad={this.initGridManager}>
          <section
              ref="container"
              className="bricks"
              dangerouslySetInnerHTML={{__html: this.props.html}} />
        </InfiniteScroll>
      </div>
    );
  },

  initGridManager() {
    var $container = $(this.refs.container.getDOMNode());

    $container.shapeshift({
      selector: '.brick',
      colWidth: 302,
      enableDrag: false,
      enableCrossDrop: false,
      gutterX: 20,
      gutterY: 20,
      paddingX: 0,
      paddingY: 0
    });
  }
});

export default SearchResultsFeed;