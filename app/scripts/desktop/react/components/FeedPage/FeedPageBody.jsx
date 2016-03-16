/*global i18n */
import React, { Component, PropTypes } from 'react';
import EntryBricksContainer from '../EntryBricks';
import EntryTlogsContainer from '../EntryTlogs';
import {
  FEED_TYPE_ANONYMOUS,
  FEED_TYPE_LIVE,
  FEED_TYPE_FRIENDS,
  FEED_TYPE_BEST,
  FEED_TYPE_LIVE_FLOW,
} from '../../constants/FeedConstants';
import { VIEW_STYLE_BRICKS } from '../../constants/ViewStyleConstants';

class FeedPageBody extends Component {
  renderBricks() {
    const { appendFeedEntries, children, feedEntries } = this.props;
    return (
      <EntryBricksContainer
        entries={feedEntries}
        isFeed
        loadMoreEntries={appendFeedEntries}
      >
        {children}
      </EntryBricksContainer>
    );
  }
  renderTlogs() {
    const { appendFeedEntries, children, currentUser, feedEntries } = this.props;

    return (
      <div>
        {children}
        <div className="content-area">
          <div className="content-area__bg" />
          <div className="content-area__inner">
            <EntryTlogsContainer
              currentUser={currentUser}
              entries={feedEntries}
              isFeed
              loadMoreEntries={appendFeedEntries}
            />
          </div>
        </div>
      </div>
    );
  }
  renderMsg(msg) {
    return (
      <div>
        {this.props.children}
        <div className="content-area">
          <div className="content-area__bg" />
          <div className="content-area__inner">
            <div className="posts">
              <article className="post post--text">
                <div className="post__content">
                  {msg}
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    );
  }
  render() {
    const { data: { items }, query, isFetching, viewStyle } = this.props.feedEntries;

    return (
      <div className="page-body">
        <div className="layout-outer">
          {!isFetching && items.length === 0
             ? this.renderMsg(query ? i18n.t('feed.query_empty', { query }) : i18n.t('feed.empty'))
             : viewStyle === VIEW_STYLE_BRICKS
               ? this.renderBricks()
               : this.renderTlogs()
          }
        </div>
      </div>
    );
  }
}

FeedPageBody.propTypes = {
  appendFeedEntries: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]),
  currentUser: PropTypes.object.isRequired,
  feedEntries: PropTypes.object,
  feedType: PropTypes.oneOf([
    FEED_TYPE_ANONYMOUS,
    FEED_TYPE_LIVE,
    FEED_TYPE_FRIENDS,
    FEED_TYPE_BEST,
    FEED_TYPE_LIVE_FLOW,
  ]).isRequired,
  location: PropTypes.object,
};

FeedPageBody.defaultProps = {
  currentUser: { data: { author: {} } },
  feedEntries: { data: { items: [] } },
  location: {},
};

export default FeedPageBody;
