/*global i18n */
import uri from 'urijs';
import React, { Component, PropTypes } from 'react';
import FeedPageHeader from './FeedPageHeader';
import FeedPageBody from './FeedPageBody';
import {
  FEED_TYPE_ANONYMOUS,
  FEED_TYPE_LIVE,
  FEED_TYPE_FRIENDS,
  FEED_TYPE_BEST,
  FEED_TYPE_LIVE_FLOW,
  FEED_ENTRIES_API_TYPE_LIVE,
  FEED_ENTRIES_API_TYPE_MEDIA,
  FEED_ENTRIES_API_TYPE_FLOWS,
  FEED_ENTRIES_API_TYPE_ANONYMOUS,
  FEED_ENTRIES_API_TYPE_BEST,
  FEED_ENTRIES_API_TYPE_FRIENDS,
  FEED_ENTRIES_API_TYPE_FRIENDS_MEDIA,
} from '../../constants/FeedConstants';

const navFilters = {
  live: [
    {
      title: 'feed.title.live.all',
      filterTitle: 'nav_filters.live.all',
      href: '/live',
      type: FEED_TYPE_LIVE,
      apiType: FEED_ENTRIES_API_TYPE_LIVE,
    },
    {
      title: 'feed.title.live.media',
      filterTitle: 'nav_filters.live.media',
      href: '/media',
      type: FEED_TYPE_LIVE,
      apiType: FEED_ENTRIES_API_TYPE_MEDIA,
    },
    {
      title: 'feed.title.live.flows',
      filterTitle: 'nav_filters.live.flows',
      href: '/live/flows',
      type: FEED_TYPE_LIVE_FLOW,
      apiType: FEED_ENTRIES_API_TYPE_FLOWS,
    },
    {
      title: 'feed.title.live.anonymous',
      filterTitle: 'nav_filters.live.anonymous',
      href: '/live/anonymous',
      type: FEED_TYPE_ANONYMOUS,
      apiType: FEED_ENTRIES_API_TYPE_ANONYMOUS,
    },
  ],
  friends: [
    {
      title: 'feed.title.friends.all',
      filterTitle: 'nav_filters.friends.all',
      href: '/friends',
      type: FEED_TYPE_FRIENDS,
      apiType: FEED_ENTRIES_API_TYPE_FRIENDS,
    },
    {
      title: 'feed.title.friends.media',
      filterTitle: 'nav_filters.friends.media',
      href: '/friends/media',
      type: FEED_TYPE_FRIENDS,
      apiType: FEED_ENTRIES_API_TYPE_FRIENDS_MEDIA,
    },
  ],
  best: [
    {
      title: 'feed.title.best.best',
      filterTitle: 'nav_filters.best.best',
      href: '/best?rating=best',
      type: FEED_TYPE_BEST,
      apiType: FEED_ENTRIES_API_TYPE_BEST,
    },
    {
      title: 'feed.title.best.excellent',
      filterTitle: 'nav_filters.best.excellent',
      href: '/best?rating=excellent',
      type: FEED_TYPE_BEST,
      apiType: FEED_ENTRIES_API_TYPE_BEST,
    },
    {
      title: 'feed.title.best.well',
      filterTitle: 'nav_filters.best.well',
      href: '/best?rating=well',
      type: FEED_TYPE_BEST,
      apiType: FEED_ENTRIES_API_TYPE_BEST,
    },
    {
      title: 'feed.title.best.good',
      filterTitle: 'nav_filters.best.good',
      href: '/best?rating=good',
      type: FEED_TYPE_BEST,
      apiType: FEED_ENTRIES_API_TYPE_BEST,
    },
  ],
};

export const feedTypeMap = Object.keys(navFilters)
        .reduce((acc, section) => (
          navFilters[section].forEach(({ href, type, apiType }) => acc[uri(href).path()] = { section, type, apiType }), acc
        ), {});
const feedTitleMap = Object.keys(navFilters)
        .reduce((acc, section) => (navFilters[section].forEach(({ href, title }, idx) => acc[href] = { title, idx }), acc), {});
const feedBestTitleMap = navFilters.best
        .reduce((acc, { href, title }, idx) => (acc[uri(href).query(true).rating] = { title, idx }, acc), {});

class FeedPage extends Component {
  componentWillMount() {
    this.setViewStyle(this.props);
  }
  componentDidMount() {
    document.body.className = 'layout--feed';
  }
  componentWillReceiveProps(nextProps) {
    this.setViewStyle(nextProps);
  }
  setViewStyle({ feedEntries: { viewStyle }, location: { query } }) {
    if (query && query.style && viewStyle !== query.style) {
      this.props.FeedEntriesActions.feedEntriesViewStyle(query.style);
    }
  }
  render() {
    const { FeedEntriesActions, appStats, currentUser, feedEntries, location } = this.props;
    const { pathname, query } = location;
    const rating = query.rating || 'excellent';
    const { apiType, section, type } = feedTypeMap[pathname];
    const navFilterItems = navFilters[section].map(({ href, filterTitle }) => ({ href, title: i18n.t(filterTitle) }));
    const { idx, title } = type === FEED_TYPE_BEST
            ? feedBestTitleMap[rating]
            : feedTitleMap[pathname];
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
