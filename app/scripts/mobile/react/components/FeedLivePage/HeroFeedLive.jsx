 /*global i18n */
import React, { Component, PropTypes } from 'react';
import HeroFeed from  '../HeroFeed';

const FEED_TYPE_ANONYMOUS = 'live_anonymous';

class HeroFeedLive extends Component {
  render() {
    const title = i18n.t(`feed.${this.props.feedType === FEED_TYPE_ANONYMOUS ? 'anonymous' : 'live'}`);

    return <HeroFeed title={title} />;
  }
}

HeroFeedLive.propTypes = {
  feedType: PropTypes.string.isRequired,
};

export default HeroFeedLive;  
