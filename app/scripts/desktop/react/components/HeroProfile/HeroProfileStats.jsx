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
    stats: PropTypes.object.isRequired,
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
    return this.props.user.isPrivacy;
  },

  handleFollowersClick($el) {
    render((
      <HeroProfileStatsPopup
        title={i18n.t('followers')}
        toggle={$el}
      >
        <HeroProfileStatsFollowersPopup tlogId={this.props.user.id} />
      </HeroProfileStatsPopup>
    ), this.container);
  },
  
  handleFollowingsClick($el) {
    render((
      <HeroProfileStatsPopup
        title={i18n.t('followings')}
        toggle={$el}
      >
        <HeroProfileStatsFollowingsPopup tlogId={this.props.user.id} />
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
          userID={this.props.user.id}
          userSlug={this.props.user.slug}
        />
      </HeroProfileStatsPopup>
    ), this.container);
  },

  renderFollowersCount() {
    const { followersCount } = this.props.stats;

    return (
      <HeroProfileStatsItem
        count={followersCount}
        key="followers"
        onClick={this.handleFollowersClick}
        title={i18n.t('stats_followers_count', { count: followersCount })}
      />
    );
  },

  renderFollowingsCount() {
    const { followingsCount } = this.props.stats;

    return (
      <HeroProfileStatsItem
        count={followingsCount}
        key="followings"
        onClick={this.handleFollowingsClick}
        title={i18n.t('stats_followings_count', { count: followingsCount })}
      />
    );
  },

  renderFavoritesCount() {
    const url = this._isPrivate() ? '#' : Routes.tlog_favorite_entries_path(this.props.user.slug);

    return (
      <HeroProfileStatsItem
        count={this.props.stats.favoritesCount}
        href={url}
        key="favorites"
        title={i18n.t('stats_favorites_count')}
      />
    );
  },

  renderEntriesCount() {
    const { entriesCount } = this.props.stats;
    const url = this._isPrivate() ? '#' : this.props.user.tlogUrl;

    return (
      <HeroProfileStatsItem
        count={entriesCount}
        href={url}
        key="entries"
        title={i18n.t('stats_entries_count', { count: entriesCount })}
      />
    );
  },

  renderCommentsCount() {
    const { commentsCount } = this.props.stats;

    return (
      <HeroProfileStatsItem
        count={commentsCount}
        key="comments"
        title={i18n.t('stats_comments_count', { counts: commentsCount })}
      />
    );
  },

  renderDaysCount() {
    const { daysCount } = this.props.stats;

    return (
      <HeroProfileStatsItem
        count={daysCount}
        key="days"
        title={i18n.t('stats_days_count', { count: daysCount })}
      />
    );
  },

  renderTagsCount() {
    const { tagsCount } = this.props.stats;

    return (
      <HeroProfileStatsItem
        count={tagsCount}
        key="tags"
        onClick={this.handleTagsClick}
        title={i18n.t('stats_tags_count', { count: tagsCount })}
      />
    );
  },

  render() {
    const { commentsCount, daysCount, entriesCount, favoritesCount,
            followersCount, followingsCount, tagsCount } = this.props.stats;

    return (
      <div className="hero__stats">
        <div className="hero__stats-list">
          {!!followersCount && this.renderFollowersCount()}
          {!!followingsCount && this.renderFollowingsCount()}
          {!!favoritesCount && this.renderFavoritesCount()}
          {!!entriesCount && this.renderEntriesCount()}
          {!!commentsCount && this.renderCommentsCount()}
          {!!daysCount && this.renderDaysCount()}
          {!!tagsCount && this.renderTagsCount()}
        </div>
      </div>
    );
  },
});
  
export default HeroProfileStats;
