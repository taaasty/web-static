/*global $, i18n, ReactGrammarMixin */
import React, { createClass, PropTypes } from 'react';
import { render } from 'react-dom';
import Routes from '../../../../shared/routes/routes';
import HeroProfileStatsItem from './HeroProfileStatsItem';
import HeroProfileStatsPopup from './HeroProfileStatsPopup';
import HeroProfileStatsFollowersPopup from './HeroProfileStatsFollowersPopup';
import HeroProfileStatsFollowingsPopup from './HeroProfileStatsFollowingsPopup';
import HeroProfileStatsTagsPopup from './HeroProfileStatsTagsPopup';

const HeroProfileStats = createClass({
  propTypes: {
    user: PropTypes.object.isRequired,
  },
  mixins: [ ReactGrammarMixin ],

  componentDidMount() {
    this.container = document.querySelectorAll('[popup-hero-stats-container]')[0];

    if (!this.container) {
      this.container = $('<\div>', {'popup-hero-stats-container': ''}).appendTo('body').get(0);
    }
  },
  
  _isPrivate() {
    return this.props.user.get('isPrivacy');
  },

  handleFollowersClick($el) {
    render((
      <HeroProfileStatsPopup
        title={i18n.t('followers')}
        toggle={$el}
      >
        <HeroProfileStatsFollowersPopup tlogId={this.props.user.get('id')} />
      </HeroProfileStatsPopup>
    ), this.container);
  },
  
  handleFollowingsClick($el) {
    render((
      <HeroProfileStatsPopup
        title={i18n.t('followings')}
        toggle={$el}
      >
        <HeroProfileStatsFollowingsPopup tlogId={this.props.user.get('id')} />
      </HeroProfileStatsPopup>
    ), this.container);
  },

  handleTagsClick($el) {
    render((
      <HeroProfileStatsPopup
        title={i18n.t('tags')}
        toggle={$el}
      >
        <HeroProfileStatsTagsPopup
          userID={this.props.user.get('id')}
          userSlug={this.props.user.get('slug')}
        />
      </HeroProfileStatsPopup>
    ), this.container);
  },

  renderFollowersCount() {
    const followersCount = this.props.user.getIn([ 'stats', 'followersCount' ]);

    return (!!followersCount &&
      <HeroProfileStatsItem
        count={followersCount}
        key="followers"
        onClick={this.handleFollowersClick}
        title={i18n.t('stats_followers_count', { count: followersCount })}
      />
    );
  },

  renderFollowingsCount() {
    const followingsCount = this.props.user.getIn([ 'stats', 'followingsCount' ]);

    return (!!followingsCount &&
      <HeroProfileStatsItem
        count={followingsCount}
        key="followings"
        onClick={this.handleFollowingsClick}
        title={i18n.t('stats_followings_count', { count: followingsCount })}
      />
    );
  },

  renderFavoritesCount() {
    const favoritesCount = this.props.user.getIn([ 'stats', 'favoritesCount' ]);
    const url = this._isPrivate() ? '#' : Routes.tlog_favorite_entries_path(this.props.user.get('slug'));

    return (!!favoritesCount &&
      <HeroProfileStatsItem
        count={favoritesCount}
        href={url}
        key="favorites"
        title={i18n.t('stats_favorites_count')}
      />
    );
  },

  renderEntriesCount() {
    const entriesCount = this.props.user.getIn([ 'stats', 'entriesCount' ]);
    const url = this._isPrivate() ? '#' : this.props.user.get('tlogUrl');

    return (!!entriesCount &&
      <HeroProfileStatsItem
        count={entriesCount}
        href={url}
        key="entries"
        title={i18n.t('stats_entries_count', { count: entriesCount })}
      />
    );
  },

  renderCommentsCount() {
    const commentsCount = this.props.user.getIn([ 'stats', 'commentsCount' ]);

    return (!!commentsCount &&
      <HeroProfileStatsItem
        count={commentsCount}
        key="comments"
        title={i18n.t('stats_comments_count', { counts: commentsCount })}
      />
    );
  },

  renderDaysCount() {
    const daysCount = this.props.user.getIn([ 'stats', 'daysCount' ]);

    return (!!daysCount &&
      <HeroProfileStatsItem
        count={daysCount}
        key="days"
        title={i18n.t('stats_days_count', { count: daysCount })}
      />
    );
  },

  renderTagsCount() {
    const tagsCount = this.props.user.getIn([ 'stats', 'tagsCount' ]);

    return (!!tagsCount &&
      <HeroProfileStatsItem
        count={tagsCount}
        key="tags"
        onClick={this.handleTagsClick}
        title={i18n.t('stats_tags_count', { count: tagsCount })}
      />
    );
  },

  render() {
    return (
      <div className="hero__stats">
        <div className="hero__stats-list">
          {this.renderFollowersCount()}
          {this.renderFollowingsCount()}
          {this.renderFavoritesCount()}
          {this.renderEntriesCount()}
          {this.renderCommentsCount()}
          {this.renderDaysCount()}
          {this.renderTagsCount()}
        </div>
      </div>
    );
  },
});
  
export default HeroProfileStats;
