import InfiniteScroll from '../common/infiniteScroll/index';

let FeedTlog = React.createClass({
  propTypes: {
    html: React.PropTypes.string.isRequired,
    loading: React.PropTypes.bool.isRequired,
    canLoad: React.PropTypes.bool.isRequired,
    onLoadNextEntries: React.PropTypes.func.isRequired
  },

  render() {
    return (
      <div className="content-area">
        <div className="content-area__bg" />
        <div className="content-area__inner">
          <InfiniteScroll
              loading={this.props.loading}
              canLoad={this.props.canLoad}
              onLoad={this.handleScrollLoad}>
            <section
                ref="container"
                className="posts"
                dangerouslySetInnerHTML={{__html: this.props.html}} />
          </InfiniteScroll>
        </div>
      </div>
    )
  },

  handleScrollLoad() {
    let $container = $(this.refs.container.getDOMNode());
    let lastEntryID = $container.children().last().data('id');

    this.props.onLoadNextEntries(lastEntryID);
  }
});

export default FeedTlog;