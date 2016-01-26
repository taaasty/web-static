/*global $ */
import React, { Component, PropTypes } from 'react';
import Masonry from 'masonry-layout';
import InfiniteScroll from '../common/InfiniteScroll';

class FeedBricks extends Component {
  componentDidMount() {
    this.initGridManager();
  }
  componentDidUpdate(prevProps) {
    if (this.props.feedHtml !== prevProps.feedHtml) {
      this.msnry.reloadItems();
      this.msnry.layout();
    }
  }
  initGridManager() {
    const container = this.refs.container;
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
  }
  handleScrollLoad() {
    const $container = $(this.refs.container);
    const lastEntryID = $container.children().last().data('id');

    this.props.onLoadNextEntries(lastEntryID);
  }
  render() {
    const { canLoad, html, loading } = this.props;

    return (
      <div className="bricks-wrapper">
        <InfiniteScroll
          canLoad={canLoad}
          loading={loading}
          onAfterLoad={this.initGridManager.bind(this)}
          onLoad={this.handleScrollLoad.bind(this)}
        >
          <section
            className="bricks"
            dangerouslySetInnerHTML={{__html: html || ''}}
            ref="container"
          />
        </InfiniteScroll>
      </div>
    );
  }
}

FeedBricks.propTypes = {
  canLoad: PropTypes.bool.isRequired,
  feedHtml: PropTypes.string,
  html: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  onLoadNextEntries: PropTypes.func.isRequired,
};

export default FeedBricks;
