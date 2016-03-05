/*global i18n */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import FeedHeader from '../common/FeedHeader';
import FeedPageBody from './FeedPageBody';
import FeedFilters from '../FeedFilters';
import UnreadLoadButton from '../common/UnreadLoadButton';
import PreviousEntriesButton from '../common/PreviousEntriesButton';
import {
  FEED_ENTRIES_API_TYPE_LIVE,
  FEED_TYPE_ANONYMOUS,
  FEED_TYPE_LIVE,
  FEED_TYPE_FRIENDS,
  FEED_TYPE_BEST,
  FEED_TYPE_LIVE_FLOW,
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
import {
  feedAnonymousReset,
  feedBestReset,
  feedFriendsReset,
  feedLiveFlowReset,  
  feedLiveReset,
} from '../../actions/FeedStatusActions';

const PREPEND_LOAD_LIMIT = 30;
const typeMap = {
  [FEED_TYPE_ANONYMOUS]: { counter: 'unreadAnonymousCount', reset: 'feedAnonymousReset', href: Routes.live_anonymous_feed_path() },
  [FEED_TYPE_BEST]: { counter: 'unreadBestCount', reset: 'feedBestReset', href: Routes.best_feed_path() },
  [FEED_TYPE_FRIENDS]: { counter: 'unreadFriendsCount', reset: 'feedFriendsReset', href: Routes.friends_feed_path() },
  [FEED_TYPE_LIVE_FLOW]: { counter: 'unreadLiveFlowCount', reset: 'feedLiveFlowReset', href: Routes.live_flows_feed_path() },
  [FEED_TYPE_LIVE]: { counter: 'unreadLiveCount', reset: 'feedLiveReset', href: Routes.live_feed_path() },
};

class FeedPage extends Component {
  componentWillMount() {
    const { location } = this.props;
    const type = typeMap[this.feedType(location)];

    this.setViewStyle(this.props);
    this.props.getFeedEntriesIfNeeded(location);

    if (type) {
      this.props[type.reset].call(void 0);
    }
  }
  componentDidMount() {
    document.body.className = 'layout--feed';
  }
  componentWillReceiveProps(nextProps) {
    this.setViewStyle(nextProps);
    this.props.getFeedEntriesIfNeeded(nextProps.location);

    if (this.feedType(this.props.location) !== this.feedType(nextProps.location)) {
      const type = typeMap[this.feedType(nextProps.location)]; 

      if (type) {
        this.props[type.reset].call(void 0);
      }
    }
  }
  feedType(location) {
    return (feedDataByUri(location) || {}).type;
  }
  setViewStyle({ feedEntries: { viewStyle }, location: { query } }) {
    if (query && query.style && viewStyle !== query.style) {
      this.props.feedEntriesViewStyle(query.style);
    }
  }
  handleClickUnreadButton(count) {
    const { getFeedEntriesIfNeeded, prependFeedEntries, location } = this.props;
    const type = typeMap[this.feedType(location)];

    if (count > 0) {
      const promise = (count < PREPEND_LOAD_LIMIT)
        ? prependFeedEntries()
        : getFeedEntriesIfNeeded(this.props.location, true);
      (promise && type && promise.then(this.props[type.reset]));
    } else {
      return null;
    }
  }
  render() {
    const { appStats, currentUser, feedEntries, feedStatus, location } = this.props;
    const { isFetching, viewStyle } = feedEntries;
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
    const { counter, href } = typeMap[type];
    const count = feedStatus[counter];

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
            location={location}
          >
            <FeedFilters
              location={location}
              navFilters={{ active: idx, items: navFilterItems }}
              navViewMode
              viewMode={viewStyle}
            >
              {location.query && location.query.since_entry_id
               ? <PreviousEntriesButton href={href} />
               : <UnreadLoadButton
                   count={count}
                   href={href}
                   isLoading={isFetching}
                   onClick={this.handleClickUnreadButton.bind(this, count)}
                 />
              }
            </FeedFilters>
          </FeedPageBody>
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
  feedAnonymousReset: PropTypes.func.isRequired,
  feedBestReset: PropTypes.func.isRequired,
  feedEntries: PropTypes.object.isRequired,
  feedEntriesViewStyle: PropTypes.func.isRequired,
  feedFriendsReset: PropTypes.func.isRequired,
  feedLiveFlowReset: PropTypes.func.isRequired,
  feedLiveReset: PropTypes.func.isRequired,
  feedStatus: PropTypes.object.isRequired,
  getFeedEntriesIfNeeded: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  prependFeedEntries: PropTypes.func.isRequired,
};

export default connect(
  (state) => ({
    appStats: state.appStats.data,
    currentUser: state.currentUser,
    feedEntries: state.feedEntries,
    feedStatus: state.feedStatus,
  }),
  {
    appendFeedEntries,
    feedAnonymousReset,
    feedBestReset,
    feedEntriesViewStyle,
    feedFriendsReset,
    feedLiveFlowReset,
    feedLiveReset,
    getFeedEntriesIfNeeded,
    prependFeedEntries,
  }
)(FeedPage);
