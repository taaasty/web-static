import React, { Component, PropTypes } from 'react';
import Masonry from 'masonry-layout';
import InfiniteScroll from '../common/InfiniteScroll';

class SearchResultsFeed extends Component {
  initGridManager() {
    new Masonry(this.refs.container, {
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
  render() {
    const { canLoad, html, loading, onLoadNextPage } = this.props;

    return (
      <div className="bricks-wrapper">
        <InfiniteScroll
          canLoad={canLoad}
          loading={loading}
          onAfterLoad={this.initGridManager.bind(this)}
          onLoad={onLoadNextPage}
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

SearchResultsFeed.propTypes = {
  canLoad: PropTypes.bool.isRequired,
  html: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  onLoadNextPage: PropTypes.func.isRequired,
};

export default SearchResultsFeed;
