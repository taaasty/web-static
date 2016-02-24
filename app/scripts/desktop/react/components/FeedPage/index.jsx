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
} from '../../constants/FeedConstants';

const navFilters = {
  live: [
    {
      title: 'feed.title.live.all',
      filterTitle: 'nav_filters.live.all',
      href: '/live',
      type: FEED_TYPE_LIVE,
    },
    {
      title: 'feed.title.live.media',
      filterTitle: 'nav_filters.live.media',
      href: '/media',
      type: FEED_TYPE_LIVE,
    },
    {
      title: 'feed.title.live.flows',
      filterTitle: 'nav_filters.live.flows',
      href: '/live/flows',
      type: FEED_TYPE_LIVE_FLOW,
    },
    {
      title: 'feed.title.live.anonymous',
      filterTitle: 'nav_filters.live.anonymous',
      href: '/live/anonymous',
      type: FEED_TYPE_ANONYMOUS,
    },
  ],
  friends: [
    {
      title: 'feed.title.friends.all',
      filterTitle: 'nav_filters.friends.all',
      href: '/friends',
      type: FEED_TYPE_FRIENDS,
    },
    {
      title: 'feed.title.friends.media',
      filterTitle: 'nav_filters.friends.media',
      href: '/friends/media',
      type: FEED_TYPE_FRIENDS,
    },
  ],
  best: [
    {
      title: 'feed.title.best.best',
      filterTitle: 'nav_filters.best.best',
      href: '/best?rating=best',
      type: FEED_TYPE_BEST,
    },
    {
      title: 'feed.title.best.excellent',
      filterTitle: 'nav_filters.best.excellent',
      href: '/best?rating=excellent',
      type: FEED_TYPE_BEST,
    },
    {
      title: 'feed.title.best.well',
      filterTitle: 'nav_filters.best.well',
      href: '/best?rating=well',
      type: FEED_TYPE_BEST,
    },
    {
      title: 'feed.title.best.good',
      filterTitle: 'nav_filters.best.good',
      href: '/best?rating=good',
      type: FEED_TYPE_BEST,
    },
  ],
};

const typeMap = Object.keys(navFilters)
        .reduce((acc, section) => (
          navFilters[section].forEach(({ href, type }) => acc[uri(href).path()] = { section, type }), acc
        ), {});
const titleMap = Object.keys(navFilters)
        .reduce((acc, section) => (navFilters[section].forEach(({ href, title }, idx) => acc[href] = { title, idx }), acc), {});
const bestTitleMap = navFilters.best
        .reduce((acc, { href, title }, idx) => (acc[uri(href).query(true).rating] = { title, idx }, acc), {});



class FeedPage extends Component {
  componentWillMount() {
    
  }
  componentWillReceiveProps(nextProps) {
    
  }
  render() {
    const { currentUser, location: { pathname } } = this.props;
    const currentPath = uri(pathname).path();
    const currentRating = uri(pathname).query(true).rating;
    const { section, type } = typeMap[currentPath];
    const navFilterItems = navFilters[section].map(({ href, title }) => ({ href, title: i18n.t(title) }));
    const { idx, title } = type === FEED_TYPE_BEST
            ? bestTitleMap[currentRating]
            : titleMap[currentPath];

    return (
      <div className="page__inner">
        <div className="page__paper">
          <FeedPageHeader
            bgImage={currentUser.data && currentUser.data.design.backgroundImageUrl}
            title={i18n.t(title)}
          />
          <FeedPageBody
            entries_info={{}}
            feedType={type}
            navFilters={{ active: idx, items: navFilterItems }}
            navViewMode
            viewMode={'tlog'}
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
  currentUser: PropTypes.object,
  location: PropTypes.object.isRequired,
};

export default FeedPage;
