/*global i18n */
import uri from 'urijs';
import React, { Component, PropTypes } from 'react';
import FeedPageHeader from './FeedPageHeader';

const navFilters = {
  live: [
    { title: 'feed.title.live.all', filterTitle: 'nav_filters.live.all', href: '/live' },
    { title: 'feed.title.live.media', filterTitle: 'nav_filters.live.media', href: '/media' },
    { title: 'feed.title.live.flows', filterTitle: 'nav_filters.live.flows', href: '/live/flows' },
    { title: 'feed.title.live.anonymous', filterTitle: 'nav_filters.live.anonymous', href: '/live/anonymous' },
  ],
  friends: [
    { title: 'feed.title.friends.all', filterTitle: 'nav_filters.friends.all', href: '/friends' },
    { title: 'feed.title.friends.media', filterTitle: 'nav_filters.friends.media', href: '/friends/media' },
  ],
  best: [
    { title: 'feed.title.best.best', filterTitle: 'nav_filters.best.best', href: '/best?rating=best' },
    { title: 'feed.title.best.excellent', filterTitle: 'nav_filters.best.excellent', href: '/best?rating=excellent' },
    { title: 'feed.title.best.well', filterTitle: 'nav_filters.best.well', href: '/best?rating=well' },
    { title: 'feed.title.best.good', filterTitle: 'nav_filters.best.good', href: '/best?rating=good' },
  ],
};

const typeMap = Object.keys(navFilters)
        .reduce((acc, section) => (navFilters[section].forEach((l) => acc[uri(l.href).path()] = section), acc), {});
const titleMap = Object.keys(navFilters)
        .reduce((acc, section) => (navFilters[section].forEach((l) => acc[l.href] = l.title), acc), {});
const bestTitleMap = navFilters.best.reduce((acc, l) => (acc[uri(l.href).query(true).rating] = l.title, acc), {});

class FeedPage extends Component {
  render() {
    const { currentUser } = this.props;
    const currentPath = uri(this.props.location.pathname).path();
    const type = typeMap[currentPath];
    const title = type === 'best'
            ? bestTitleMap[currentPath]
            : titleMap[currentPath];

    return (
      <div className="page__inner">
        <div className="page__paper">
          <FeedPageHeader
            bgImage={currentUser.data && currentUser.data.design.backgroundImageUrl}
            title={i18n.t(title)}
          />
          {type}
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
