import React, { createClass, PropTypes } from 'react';
import InfiniteScroll from '../common/InfiniteScroll';

let SearchResultsTlog = createClass({
  propTypes: {
    canLoad: PropTypes.bool.isRequired,
    html: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    onLoadNextPage: PropTypes.func.isRequired,
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
                dangerouslySetInnerHTML={{__html: this.props.html || ''}} />
          </InfiniteScroll>
        </div>
      </div>
    )
  }
});

export default SearchResultsTlog;
