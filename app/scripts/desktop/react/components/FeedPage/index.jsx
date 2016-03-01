/*global i18n */
import React, { Component, PropTypes } from 'react';
import FeedPageHeader from './FeedPageHeader';
import FeedPageBody from './FeedPageBody';
import {
  FEED_TYPE_BEST,
  FEED_TYPE_FRIENDS,
  FEED_ENTRIES_API_TYPE_LIVE,
  feedTitleMap,
  feedBestTitleMap,
  navFilters,
} from '../../constants/FeedConstants';
import { feedDataByUri } from '../../actions/FeedEntriesActions';

class FeedPage extends Component {
  componentWillMount() {
    this.setViewStyle(this.props);
    this.props.FeedEntriesActions.getFeedEntriesIfNeeded(this.props.location);
  }
  componentDidMount() {
    document.body.className = 'layout--feed';
  }
  componentWillReceiveProps(nextProps) {
    this.setViewStyle(nextProps);
    this.props.FeedEntriesActions.getFeedEntriesIfNeeded(nextProps.location);
  }
  setViewStyle({ feedEntries: { viewStyle }, location: { query } }) {
    if (query && query.style && viewStyle !== query.style) {
      this.props.FeedEntriesActions.feedEntriesViewStyle(query.style);
    }
  }
  render() {
    const { FeedEntriesActions, appStats, currentUser, feedEntries, location } = this.props;
    const { apiType, section, type, rating } = feedDataByUri(location);
    const navFilterItems = navFilters[section].map(({ href, filterTitle }) => ({ href, title: i18n.t(filterTitle) }));
    const { idx, title } = type === FEED_TYPE_BEST
            ? feedBestTitleMap[rating]
            : feedTitleMap[location.pathname];
    const { isFetching } = feedEntries;
    const { followings_count } = currentUser.data;
    const posts24h = appStats.data && appStats.data.public_entries_in_day_count;
    const headerText = apiType === FEED_ENTRIES_API_TYPE_LIVE
            ? i18n.t('feed.title.posts_24h', { count: posts24h, context: posts24h ? 'some' : 'none' })
            : type === FEED_TYPE_FRIENDS && followings_count > 0 &&
               i18n.t('feed.title.friend_posts', { count: followings_count });

    return (
      <div className="page__inner">
        <div className="page__paper">
          <FeedPageHeader
            bgImage={currentUser.data && currentUser.data.design.backgroundImageUrl}
            text={headerText}
            title={i18n.t(title)}
          />
          <FeedPageBody
            FeedEntriesActions={FeedEntriesActions}
            currentUser={currentUser}
            feedEntries={feedEntries}
            feedType={type}
            location={location}
            navFilters={{ active: idx, items: navFilterItems }}
            navViewMode
          />
        </div>
      </div>
    );
  }
}

FeedPage.displayName = 'FeedPage';

FeedPage.defaultProps = {
  currentUser: {},
};

FeedPage.propTypes = {
  FeedEntriesActions: PropTypes.object.isRequired,
  appStats: PropTypes.object.isRequired,
  currentUser: PropTypes.object,
  feedEntries: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default FeedPage;
