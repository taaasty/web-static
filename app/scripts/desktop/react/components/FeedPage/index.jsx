/*global i18n */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import FeedHeader from '../common/FeedHeader';
import FeedPageBody from './FeedPageBody';
import {
  FEED_TYPE_BEST,
  FEED_TYPE_FRIENDS,
  FEED_ENTRIES_API_TYPE_LIVE,
  feedTitleMap,
  feedBestTitleMap,
  navFilters,
} from '../../constants/FeedConstants';
import {
  appendFeedEntries,
  feedDataByUri,
  feedEntriesViewStyle,
  getFeedEntriesIfNeeded,
  prependFeedEntries,
} from '../../actions/FeedEntriesActions';

class FeedPage extends Component {
  componentWillMount() {
    this.setViewStyle(this.props);
    this.props.getFeedEntriesIfNeeded(this.props.location);
  }
  componentDidMount() {
    document.body.className = 'layout--feed';
  }
  componentWillReceiveProps(nextProps) {
    this.setViewStyle(nextProps);
    this.props.getFeedEntriesIfNeeded(nextProps.location);
  }
  setViewStyle({ feedEntries: { viewStyle }, location: { query } }) {
    if (query && query.style && viewStyle !== query.style) {
      this.props.feedEntriesViewStyle(query.style);
    }
  }
  render() {
    const { appendFeedEntries, appStats, currentUser, feedEntries,
            getFeedEntriesIfNeeded, location, prependFeedEntries } = this.props;
    const { apiType, section, type, rating } = feedDataByUri(location);
    const navFilterItems = navFilters[section].map(({ href, filterTitle }) => ({ href, title: i18n.t(filterTitle) }));
    const { idx, title } = type === FEED_TYPE_BEST
            ? feedBestTitleMap[rating]
            : feedTitleMap[location.pathname];
    const { followings_count } = currentUser.data;
    const posts24h = appStats && appStats.public_entries_in_day_count;
    const headerText = apiType === FEED_ENTRIES_API_TYPE_LIVE
            ? i18n.t('feed.title.posts_24h', { count: posts24h, context: posts24h ? 'some' : 'none' })
            : (type === FEED_TYPE_FRIENDS && followings_count > 0)
              ? i18n.t('feed.title.friend_posts', { count: followings_count })
              : '';

    return (
      <div className="page__inner">
        <div className="page__paper">
          <FeedHeader
            bgImage={currentUser.data.design && currentUser.data.design.backgroundImageUrl}
            text={headerText}
            title={i18n.t(title)}
          />
          <FeedPageBody
            appendFeedEntries={appendFeedEntries}
            currentUser={currentUser}
            feedEntries={feedEntries}
            feedType={type}
            getFeedEntriesIfNeeded={getFeedEntriesIfNeeded}
            location={location}
            navFilters={{ active: idx, items: navFilterItems }}
            navViewMode
            prependFeedEntries={prependFeedEntries}
          />
        </div>
      </div>
    );
  }
}

FeedPage.displayName = 'FeedPage';

FeedPage.defaultProps = {
  currentUser: { data: {} },
};

FeedPage.propTypes = {
  appStats: PropTypes.object.isRequired,
  appendFeedEntries: PropTypes.func.isRequired,
  currentUser: PropTypes.object,
  feedEntries: PropTypes.object.isRequired,
  feedEntriesViewStyle: PropTypes.func.isRequired,
  getFeedEntriesIfNeeded: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  prependFeedEntries: PropTypes.func.isRequired,
};

export default connect(
  (state) => ({
    appStats: state.appStats.data,
    currentUser: state.currentUser,
    feedEntries: state.feedEntries,
  }),
  { appendFeedEntries, feedEntriesViewStyle, getFeedEntriesIfNeeded, prependFeedEntries }
)(FeedPage);
