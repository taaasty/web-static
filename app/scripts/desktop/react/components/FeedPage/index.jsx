import React, { Component, PropTypes } from 'react';

const navFilters = {
  live: [
    { title: 'Все', href: '/live' },
    { title: 'Медиа', href: '/media' },
    { title: 'Потоки', href: '/live/flows' },
    { title: 'Анонимки', href: '/live/anonymous' },
  ],
  friends: [
    { title: 'Все', href: '/friends/live' },
    { title: 'Медиа', href: '/friends/media' },
  ],
  best: [
    { title: '+100', href: '/best?rating=best' },
    { title: '+50', href: '/best?rating=excellent' },
    { title: '+20', href: '/best?rating=well' },
    { title: '+10', href: '/best?rating=good' },
  ],
};

function feedType() {
  
}

class FeedPage extends Component {
  render() {
    return <div />;
  }
}

FeedPage.propTypes = {
  
};

export default FeedPage;
