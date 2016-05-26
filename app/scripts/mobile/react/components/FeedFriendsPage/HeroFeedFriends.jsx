/*global i18n */
import React, { PropTypes } from 'react';
import HeroFeed from '../HeroFeed';

function HeroFeedFriends({ backgroundUrl, entriesCount }) {
  return (
    <HeroFeed
      backgroundUrl={backgroundUrl}
      entriesCount={entriesCount}
      title={i18n.t('feed.friends')}
    />
  );
}

HeroFeedFriends.displayName = 'HeroFeedFriends';

HeroFeedFriends.propTypes = {
  backgroundUrl: PropTypes.string.isRequired,
  entriesCount: PropTypes.number.isRequired,
};

export default HeroFeedFriends;
