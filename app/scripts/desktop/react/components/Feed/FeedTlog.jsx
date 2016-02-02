/*global $ */
import React, { Component, PropTypes } from 'react';
import InfiniteScroll from '../common/InfiniteScroll';

class FeedTlog extends Component {
  handleScrollLoad() {
    const $container = $(this.refs.container);
    const lastEntryID = $container.children().last().data('id');

    this.props.onLoadNextEntries(lastEntryID);
  }
  render() {
    const { html, canLoad, loading } = this.props;

    return (
      <div className="content-area">
        <div className="content-area__bg" />
        <div className="content-area__inner">
          <InfiniteScroll
            canLoad={canLoad}
            loading={loading}
            onLoad={this.handleScrollLoad.bind(this)}
          >
            <section
              className="posts"
              dangerouslySetInnerHTML={{__html: html || ''}}
              ref="container"
            />
          </InfiniteScroll>
        </div>
      </div>
    );
  }
}


FeedTlog.propTypes = {
  html: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  canLoad: PropTypes.bool.isRequired,
  onLoadNextEntries: PropTypes.func.isRequired,
};

export default FeedTlog;
