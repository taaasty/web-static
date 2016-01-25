import React, { createClass, PropTypes } from 'react';
import Masonry from 'masonry-layout';
import InfiniteScroll from '../common/InfiniteScroll';

let FeedBricks = createClass({
  propTypes: {
    canLoad: PropTypes.bool.isRequired,
    html: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    onLoadNextEntries: PropTypes.func.isRequired,
  },

  componentDidMount() {
    this.initGridManager();
  },

  componentDidUpdate(prevProps) {
    if (this.props.feedHtml !== prevProps.feedHtml) {
      this.msnry.reloadItems()
      this.msnry.layout();
    }
  },

  render() {
    return (
      <div className="bricks-wrapper">
        <InfiniteScroll
            loading={this.props.loading}
            canLoad={this.props.canLoad}
            onLoad={this.handleScrollLoad}
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
    let container = this.refs.container;
    this.msnry = new Masonry(container, {
      itemSelector: '.brick',
      transitionDuration: '0.4s',
      isFitWidth: true,
      gutter: 20,
      hiddenStyle: {
        opacity: 0,
        transform: 'opacity(0.001)',
      },
      visibleStyle: {
        opacity: 1,
        transform: 'opacity(1)',
      },
    });
  },

  handleScrollLoad() {
    let $container = $(this.refs.container);
    let lastEntryID = $container.children().last().data('id');

    this.props.onLoadNextEntries(lastEntryID);
  },
});

export default FeedBricks;
