/*global i18n */
import React, { PropTypes } from 'react';
import HeroFeed from '../HeroFeed';

function HeroFeedBest({ backgroundUrl, entriesCount }) {
  return (
    <HeroFeed
      backgroundUrl={backgroundUrl}
      entriesCount={null}
      title={i18n.t('feed.best')}
    />
  );
}

HeroFeedBest.displayName = 'HeroFeedBest';

HeroFeedBest.propTypes = {
  backgroundUrl: PropTypes.string.isRequired,
  entriesCount: PropTypes.number.isRequired,
};

export default HeroFeedBest;
