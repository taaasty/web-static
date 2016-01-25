import Masonry from 'masonry-layout';
import InfiniteScroll from '../common/InfiniteScroll';

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
              dangerouslySetInnerHTML={{__html: this.props.html || ''}} />
        </InfiniteScroll>
      </div>
    );
  },

  initGridManager() {
    let container = this.refs.container.getDOMNode();
    let msnry = new Masonry(container, {
      itemSelector: '.brick',
      transitionDuration: '0.4s',
      isFitWidth: true,
      gutter: 20,
      hiddenStyle: {
        opacity: 0,
        transform: 'opacity(0.001)'
      },
      visibleStyle: {
        opacity: 1,
        transform: 'opacity(1)'
      }
    });
  }
});

export default SearchResultsFeed;
