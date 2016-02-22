/*global i18n */
import uri from 'urijs';
import React, { Component, PropTypes } from 'react';
import FeedPageHeader from './FeedPageHeader';

const navFilters = {
  live: [
    { title: 'nav_filters.live.all', href: '/live' },
    { title: 'nav_filters.live.media', href: '/media' },
    { title: 'nav_filters.live.flows', href: '/live/flows' },
    { title: 'nav_filters.live.anonymous', href: '/live/anonymous' },
  ],
  friends: [
    { title: 'nav_filters.friends.all', href: '/friends' },
    { title: 'nav_filters.friends.media', href: '/friends/media' },
  ],
  best: [
    { title: 'nav_filters.best.best', href: '/best?rating=best' },
    { title: 'nav_filters.best.excellent', href: '/best?rating=excellent' },
    { title: 'nav_filters.best.well', href: '/best?rating=well' },
    { title: 'nav_filters.best.good', href: '/best?rating=good' },
  ],
};

const typeMap = Object.keys(navFilters)
        .reduce((acc, section) => (navFilters[section].forEach((l) => (acc[uri(l.href).path()] = section)), acc), {});

class FeedPage extends Component {
  render() {
    const type = typeMap[uri(this.props.location.pathname).path()];

    return (
      <div className="page__inner">
        <div className="page__paper">
          <FeedPageHeader
            
          />
          {type}
        </div>
      </div>
    );
  }
}

FeedPage.propTypes = {
  
};

export default FeedPage;
