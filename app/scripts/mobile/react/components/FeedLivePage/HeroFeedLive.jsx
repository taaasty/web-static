 /*global i18n */
import React, { Component, PropTypes } from 'react';
import HeroFeed from  '../hero/feed';
import Routes from '../../../../shared/routes/routes';

const FEED_TYPE_ANONYMOUS = 'live_anonymous';

class HeroFeedLive extends Component {
  renderWriteButton() {
    const { currentUser: { slug }, feedType } = this.props;

    function redirect() {
      const url = feedType === FEED_TYPE_ANONYMOUS
        ? Routes.new_anonymous_entry_url(slug)
        : Routes.new_entry_url(slug);

      window.location.href = url;
    }

    return (
      <button
        className="button button--extra-small button--green"
        onClick={redirect}
      >
        {i18n.t('buttons.hero_live_create_entry')}
      </button>
    );
  }
  render() {
    return (
      <HeroFeed {...this.props} title={i18n.t('feed.live')}>
        <div className="hero__actions hero__actions--visible">
          {this.props.currentUser && this.renderWriteButton()}
        </div>
      </HeroFeed>
    );
  }
}

HeroFeedLive.propTypes = {
  backgroundUrl: PropTypes.string.isRequired,
  currentUser: PropTypes.object,
  entriesCount: PropTypes.number.isRequired,
  feedType: PropTypes.string.isRequired,
};

export default HeroFeedLive;  
