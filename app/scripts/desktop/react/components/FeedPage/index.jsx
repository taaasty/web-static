/*global i18n */
import React, { Component, PropTypes } from 'react';

const navFilters = {
  live: [
    { title: 'nav_filters.live.all', href: '/live' },
    { title: 'nav_filters.live.media', href: '/media' },
    { title: 'nav_filters.live.flows', href: '/live/flows' },
    { title: 'nav_filters.live.anonymous', href: '/live/anonymous' },
  ],
  friends: [
    { title: 'nav_filters.friends.all', href: '/friends/live' },
    { title: 'nav_filters.friends.media', href: '/friends/media' },
  ],
  best: [
    { title: 'nav_filters.best.best', href: '/best?rating=best' },
    { title: 'nav_filters.best.excellent', href: '/best?rating=excellent' },
    { title: 'nav_filters.best.well', href: '/best?rating=well' },
    { title: 'nav_filters.best.good', href: '/best?rating=good' },
  ],
};

function feedType() {
  
}

class FeedPage extends Component {
  render() {
    return (
      <div>
        
      </div>
    );
  }
}

FeedPage.propTypes = {
  
};

export default FeedPage;
